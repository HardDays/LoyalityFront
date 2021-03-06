import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { SocialMediaService } from "../social-media.service"
import { AuthService } from 'src/app/core/services/auth.service';

const generateCallbackAPiVkLink = (companyId, callbackCode) => `https://fathomless-earth-40434.herokuapp.com/test/api/v1/vk/callback/${companyId}/${callbackCode}`
const formNumberValues = ["group_join_points", "wall_repost_points", "wall_like_points", "wall_reply_points"]
@Component({
  selector: 'app-social-media-vk',
  templateUrl: './social-media-vk.component.html',
  styleUrls: []
})
export class SocialMediaVkComponent implements OnInit {

  GroupIsCreated: boolean = false;
  ModalIsShown: boolean = false;
  CallbackAPILink: string = "";
  FormData: any = {
    confirmation_code: "",
    group_id: "",
    checked_values: [],
    group_join_points: 0,
    wall_repost_points: 0,
    wall_like_points: 0,
    wall_reply_points: 0
  };

  CreateGroupForm: FormGroup = new FormGroup({
    "confirmation_code": new FormControl(this.FormData.confirmation_code, Validators.required),
    "group_id": new FormControl(this.FormData.group_id, Validators.required),
    "checked_values": new FormArray(this.FormData.checked_values),
    "group_join_points": new FormControl(this.FormData.group_join_points, Validators.pattern('[0-9\.\,]*')),
    "wall_repost_points": new FormControl(this.FormData.wall_repost_points, Validators.pattern('[0-9\.\,]*')),
    "wall_like_points": new FormControl(this.FormData.wall_like_points, Validators.pattern('[0-9\.\,]*')),
    "wall_reply_points": new FormControl(this.FormData.wall_reply_points, Validators.pattern('[0-9\.\,]*'))
  })

  constructor(private _location: Location, private router: Router, private auth: AuthService, private socialMedialService: SocialMediaService, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.socialMedialService.GetVKGroupInfo(
      (data) => {
        const FormCheckedValues = []
        const SavedFormData = formNumberValues.reduce(
          (acc, key) => {
            const num = +data[key];
            acc[key] = num > 0 ? num / 100 : 0;
            if (acc[key] > 0) FormCheckedValues.push(key);
            return acc;
          },
          {
            confirmation_code: data.confirmation_code,
            group_id: data.group_id
          });

        this.CreateGroupForm.patchValue(SavedFormData);

        const formArray = this.CreateGroupForm.get('checked_values') as FormArray;
        FormCheckedValues.forEach(k => formArray.push(new FormControl(k)));

        this.GroupIsCreated = true;
        this.CallbackAPILink = generateCallbackAPiVkLink(this.auth.LoginData.company_id, data.callback_code);
        this._subscribeToRulesValueChanges();
      })
  }

  _subscribeToRulesValueChanges() {
    this
      .CreateGroupForm
      .controls['checked_values']
      .valueChanges
      .subscribe((values: string[]) => {
        formNumberValues.filter(key => !values.includes(key)).forEach(v => {
          this.CreateGroupForm.controls[v].setValue(0);
        })
      });
  }

  GoBack() {
    this._location.back();
  }

  CopyLink(event) {
    event.preventDefault();
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.innerText = this.CallbackAPILink;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

    this.toastr.info('Успешно скопировано', '', {
      timeOut: 1500,
      toastClass: 'custom-toast-info',
      positionClass: 'toast-top-full-width'
    });
  }

  get confirmation_code() { return this.CreateGroupForm.get('confirmation_code'); }
  get group_id() { return this.CreateGroupForm.get('group_id'); }
  get group_join_points() { return this.CreateGroupForm.get('group_join_points'); }
  get checked_values() { return this.CreateGroupForm.get('checked_values'); }
  get wall_repost_points() { return this.CreateGroupForm.get('wall_repost_points'); }
  get wall_like_points() { return this.CreateGroupForm.get('wall_like_points'); }
  get wall_reply_points() { return this.CreateGroupForm.get('wall_reply_points'); }

  onCheckChange(event) {
    const formArray = this.CreateGroupForm.get('checked_values') as FormArray;
    if (event.target.checked) {
      formArray.push(new FormControl(event.target.value));
    }
    else {
      const indexToRemove = formArray.controls.findIndex(ctrl => ctrl.value == event.target.value);
      formArray.removeAt(indexToRemove);
    }
  }

  Create() {
    this.CreateGroupForm.updateValueAndValidity();
    if (this.CreateGroupForm.valid) {
      const data = this.CreateGroupForm.getRawValue();
      this.socialMedialService.UpdateVkGroup(
        this.GroupIsCreated,
        {
          group_id: data.group_id,
          confirmation_code: data.confirmation_code,
          group_join_points: Number(data.group_join_points) * 100,
          wall_repost_points: Number(data.wall_repost_points) * 100,
          wall_like_points: Number(data.wall_like_points) * 100,
          wall_reply_points: Number(data.wall_reply_points) * 100,
        },
        () => {
          this.ModalIsShown = true;
        },
        (err) => {
          console.error(err);
        }
      )
    }
    else {
      for (const i in this.CreateGroupForm.controls) {
        this.CreateGroupForm.get(i).markAsDirty();
      }
    }
  }

  onCloseModal() {
    this.ModalIsShown = false;
    window.location.reload();
  }
}
