import { AuthService } from './../../../core/services/auth.service';
import { IMyDpOptions } from 'mydatepicker';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ClientProfileService } from './../client-profile.service';
import { ClientModel } from './../../../core/models/client.model';
import { Component, OnInit } from '@angular/core';
import { ValidatorService } from 'src/app/core/services/validator.service';

enum Mode {
  view = 'view',
  edit = 'edit'
}

@Component({
  selector: 'app-client-data',
  templateUrl: './client-data.component.html',
  styleUrls: ['./client-data.component.scss']
})
export class ClientDataComponent implements OnInit {

  Modes = Mode;
  CurrentMode = this.Modes.view;

  Profile: ClientModel = new ClientModel();

  Form: FormGroup = new FormGroup({
    'first_name': new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]),
    'last_name': new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]),
    'second_name': new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(30)
    ]),
    'card_number': new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(30)
    ]),
    'gender': new FormControl('female',[
      Validators.required
    ]),
    'email': new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    'birth_day': new FormControl('', [
      Validators.required
    ])
  });

  get first_name() {
    return this.Form.get('first_name');
  }
  get last_name() {
    return this.Form.get('last_name');
  }
  get second_name() {
    return this.Form.get('second_name');
  }
  get card_number() {
    return this.Form.get('card_number');
  }
  get gender() {
    return this.Form.get('gender');
  }
  get birth_day() {
    return this.Form.get('birth_day');
  }
  get email() {
    return this.Form.get('email');
  }

  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
    showClearDateBtn: false,
    showTodayBtn: false,
    dayLabels: {su: 'Вс', mo: 'Пн', tu: 'Вт', we: 'Ср', th: 'Чт', fr: 'Пт', sa: 'Сб'},
    monthLabels: { 1: 'Янв', 2: 'Фев', 3: 'Мар', 4: 'Апр', 5: 'Май', 6: 'Июн', 7: 'Июл', 8: 'Авг', 9: 'Сен', 10: 'Окт', 11: 'Ноя', 12: 'Дек' },
    editableDateField: false,
    openSelectorOnInputClick: true
  };

  MaskBirthDay = ValidatorService.MaskBirthDay();

  constructor(private profileService: ClientProfileService, private authService: AuthService) { }

  ngOnInit() {
    this.authService.onAuthChange$.subscribe(
      (res) => {
        if (res) {
          this.profileService.ClientProfile = new ClientModel();
          this.GetProfile();
        }
      }
    );
    this.GetProfile();
  }

  changeMode() {
    if (this.CurrentMode === this.Modes.edit) {
      this.CurrentMode = this.Modes.view;
    } else if (this.CurrentMode === this.Modes.view) {
      this.Form.patchValue(this.Profile);
      this.Form.controls.birth_day.setValue({
        date: this.GetDisableUntilData(new Date(this.Profile.birth_day))
      });
      this.CurrentMode = this.Modes.edit;
    }
  }

  GetProfile() {
    if (!this.profileService.ClientProfile.id) {
      this.profileService.GetClientProfile(
        (res) => {
          this.profileService.ClientProfile = res;
          this.Profile = this.profileService.ClientProfile;
        }
      );
    } else {
      this.Profile = this.profileService.ClientProfile;
    }

  }

  SaveProfile() {
    for(const i in this.Form.controls)
    {
        this.Form.controls[i].markAsDirty();
        this.Form.controls[i].markAsTouched();
    }
    const valid = this.Form.valid;
    if (valid) {
      const data = this.Form.getRawValue();
      const date = data['birth_day']['date'];
      data['birth_day'] = date['year']+'-'+date['month']+'-'+date['day'];

      let profile = this.Profile;
      for(let item in data) {
        profile[item] = data[item];
      }

      this.profileService.UpdateClientProfile(profile, (res) => {
        this.profileService.ClientProfile = res;
        this.changeMode();
      },
      (err) => {
        console.log(err);
      });
    }
  }

  GetDisableUntilData(date: Date)
  {
      const str = date.toISOString();
      const arr = str.split("T")[0].split("-");
      return {
        year: Number.parseInt(arr[0]),
        month: Number.parseInt(arr[1]),
        day: Number.parseInt(arr[2])
      };
  }


}
