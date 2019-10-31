import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientsService } from './../../clients.service';
import { Component, OnInit } from '@angular/core';
import { ClientModel } from 'src/app/core/models/client.model';
import { IMyDpOptions } from 'mydatepicker';
import { ValidatorService } from 'src/app/core/services/validator.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {

  Client = new ClientModel();



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
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]),
    'email': new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    'card_number': new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(30)
    ]),
    'loyalty_program_id': new FormControl('', [
      // Validators.required
    ]),
    'gender': new FormControl('female',[
      Validators.required
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
  get email() {
    return this.Form.get('email');
  }
  get card_number() {
    return this.Form.get('card_number');
  }
  get loyalty_program_id() {
    return this.Form.get('loyalty_program_id');
  }
  get gender() {
    return this.Form.get('gender');
  }
  get birth_day() {
    return this.Form.get('birth_day');
  }

  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd.mm.yyyy',
    showClearDateBtn: false,
    showTodayBtn: false,
    dayLabels: {su: 'Вс', mo: 'Пн', tu: 'Вт', we: 'Ср', th: 'Чт', fr: 'Пт', sa: 'Сб'},
    monthLabels: { 1: 'Янв', 2: 'Фев', 3: 'Мар', 4: 'Апр', 5: 'Май', 6: 'Июн', 7: 'Июл', 8: 'Авг', 9: 'Сен', 10: 'Окт', 11: 'Ноя', 12: 'Дек' },
    editableDateField: false,
    openSelectorOnInputClick: true
  };

  MaskBirthDay = ValidatorService.MaskBirthDay();


  constructor(protected clientsService: ClientsService, private _location: Location) { }

  ngOnInit() {
    this.Client = this.clientsService.Client;
    this.Form.patchValue(this.Client);
    this.Form.controls.birth_day.setValue({
      date: this.GetDisableUntilData(new Date(this.Client.birth_day))
    });
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

  Save() {
    for(const i in this.Form.controls)
    {
        this.Form.controls[i].markAsDirty();
        this.Form.controls[i].markAsTouched();
    }
    const valid = this.Form.valid;

    if (valid) {
      const data = this.Form.getRawValue();
      data['phone'] = this.clientsService.Client.phone;
      data['id'] = this.clientsService.Client.id;
      data['birth_day'] = data['birth_day']['formatted'];

      this.clientsService.UpdateClient(data, (res) => {
        this.clientsService.Client = res;
        this._location.back();
      },
      (err) => {
        console.log(err);
      });
    }
  }

}
