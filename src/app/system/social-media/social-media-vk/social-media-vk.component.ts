import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { SocialMediaService } from "../social-media.service"
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-social-media-vk',
  templateUrl: './social-media-vk.component.html',
  styleUrls: []
})
export class SocialMediaVkComponent implements OnInit {

  ModalIsShown: boolean = false;

  FormData: any = {
    confirmation_code: "",
    group_id: ""
  };

  CreateGroupForm: FormGroup = new FormGroup({
    "confirmation_code": new FormControl(this.FormData.confirmation_code, [
      Validators.required,
    ]),
    "group_id": new FormControl(this.FormData.group_id, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)
    ])
  })

  constructor(private _location: Location, private router: Router, private socialMedialService: SocialMediaService) {
  }

  ngOnInit() {
  }

  GoBack() {
    this._location.back();
  }

  CopyLink() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.innerText = 'https://vk.com/f639grp';
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  get confirmation_code() {
    return this.CreateGroupForm.get('confirmation_code');
  }

  get group_id() {
    return this.CreateGroupForm.get('group_id');
  }

  Create() {
    this.CreateGroupForm.updateValueAndValidity();
    if (this.CreateGroupForm.valid) {
      const data = this.CreateGroupForm.getRawValue();
      this.socialMedialService.CreateVkGroup(
        data,
        (res) => {
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
  }

}
