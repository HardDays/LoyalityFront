import { ValidatorService } from './../../../../core/services/validator.service';
import { ClientsService } from './../../clients.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IMyDpOptions } from 'mydatepicker';

@Component({
  selector: 'app-create-client-by-user',
  templateUrl: './create-client-by-user.component.html',
  styleUrls: ['./create-client-by-user.component.scss']
})
export class CreateClientByUserComponent implements OnInit {

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
    'birth_day': new FormControl('',[
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

  SelectedLoyality = null;
  ShowSelect = false;

  LoalityProgramm = [
    {id: 1, name: 'Первая акция'},
    {id: 2, name: 'Вторая акция'},
    {id: 3, name: 'Третья акция'}
  ];

  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd.mm.yyyy',
    showClearDateBtn: false,
  };

  MaskBirthDay = ValidatorService.MaskBirthDay();

  Recommendation = {
    isTrue: false,
    phone: ''
  };

  isShowSuccessModal = false;

  OrderPrice = 0;

  constructor(private _location: Location, private service: ClientsService) { }

  ngOnInit() {
  }

  GoBack() {
      this._location.back();
  }

  Save() {
    console.log(`Save Form`);

    for(const i in this.Form.controls)
    {
        this.Form.controls[i].markAsDirty();
        this.Form.controls[i].markAsTouched();
    }
    const valid = this.Form.valid;

    if (valid) {
      const data = this.Form.getRawValue();
      data['phone'] = this.service.Client.phone;
      this.service.CreateClient(data, (res) => {
        console.log(`Success!`, res);
        if (this.OrderPrice) {
          this.CreateOrder(res['id']);
        } else {
          this.isShowSuccessModal = true;
        }
      },
      (err) => {
        console.log(err);
      });
    }
  }

  CreateOrder(user_id: number) {
    this.service.CreateOrder(
      {
        user_id,
        price: this.OrderPrice,
        use_points: false
      }, (res) => {
      console.log(`Success 2!`, res);
      this.isShowSuccessModal = true;
    },
    (err) => {
      console.log(err);
    });
  }



  OnSelected(item)
  {
    this.SelectedLoyality = item;
    this.Form.controls.loyalty_program_id.setValue(this.SelectedLoyality.id);
    this.ShowSelect = false;
  }

}
