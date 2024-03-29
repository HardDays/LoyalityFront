import { Router } from '@angular/router';
import { ValidatorService } from './../../../../core/services/validator.service';
import { ClientsService } from './../../clients.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IMyDpOptions } from 'mydatepicker';
import { PromotionsService } from 'src/app/system/promotions/promotions.service';

@Component({
  selector: 'app-create-client-profile',
  templateUrl: './create-client-profile.component.html',
  styleUrls: ['./create-client-profile.component.scss']
})
export class CreateClientProfileComponent implements OnInit {

  Form: FormGroup = new FormGroup({
    'phone': new FormControl('',
      [
        Validators.required,
      ],
      [
        this.service.createValidatorPhone()
      ]),
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
      Validators.minLength(6),
      Validators.maxLength(30)
    ]),
    'email': new FormControl('', [
      // Validators.required,
      Validators.email
    ]),
    'card_number': new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]),
    // 'loyalty_program_id': new FormControl('', [
    //   // Validators.required
    // ]),
    'gender': new FormControl('female', [
      Validators.required
    ]),
    'birth_day': new FormControl('', [
      Validators.required
    ])
  });

  get phone() {
    return this.Form.get('phone');
  }
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

  currentDate:Date = new Date();
  currentYear = this.currentDate.getFullYear() - 18;
  currentDay: any = this.currentDate.getDate();
  currentMonth: any = this.currentDate.getMonth() + 1;


  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
    showClearDateBtn: false,
    showTodayBtn: false,
    dayLabels: { su: 'Вс', mo: 'Пн', tu: 'Вт', we: 'Ср', th: 'Чт', fr: 'Пт', sa: 'Сб' },
    monthLabels: { 1: 'Янв', 2: 'Фев', 3: 'Мар', 4: 'Апр', 5: 'Май', 6: 'Июн', 7: 'Июл', 8: 'Авг', 9: 'Сен', 10: 'Окт', 11: 'Ноя', 12: 'Дек' },
    editableDateField: false,
    openSelectorOnInputClick: true,
    disableSince: {year: this.currentYear, month: this.currentMonth, day: this.currentDay}
  };

  MaskBirthDay = ValidatorService.MaskBirthDay();

  Recommendation = {
    isTrue: false,
    phone: '',
    isPhoneCurrect: false
  };

  isShowSuccessModal = false;


  Phone = '';
  ErrorText = '';

  MaskPhoneRU = ValidatorService.MaskPhoneRUwithout7();

  ModalErrorLoyalty = false;
  SaveError = '';

  IsLoading = false;

  constructor(
    private _location: Location,
    private router: Router,
    private service: ClientsService) { }

  ngOnInit() {
    let date = new Date();
    date.setDate(date.getDate() - 1);
    this.birth_day.setValue({date: {
          year: date.getFullYear() - 18,
          month: date.getMonth() + 1,
          day: date.getDate()
        }
    });
  }

  GoBack() {
    // this._location.back();
    this.router.navigate(['/system', 'my_clients']);
  }

  Save() {
    console.log("asdas", this.Form.getRawValue())

    this.IsLoading = true;

    for (const i in this.Form.controls) {
      this.Form.controls[i].markAsDirty();
      this.Form.controls[i].markAsTouched();
    }

    const valid = this.Form.valid;

    if (valid) {
      const data = this.Form.getRawValue();
      // data['phone'] = this.service.Client.phone;

      data['birth_day'] = data['birth_day']['formatted'];

      if (this.Recommendation.isTrue && this.Recommendation.isPhoneCurrect && this.Recommendation.phone) {
        data['recommendator_phone'] = this.Recommendation.phone;
      }
      console.log(`Recomendation = `, this.Recommendation);
      console.log(`data = `, data);

      this.service.CreateClient(data, (res) => {
        console.log(`Success!`, res);
        this.service.Client = { ...res, ...res.client[0] };
        this.IsLoading = false;
        this.isShowSuccessModal = true;

        // this.router.navigate(['/system', 'my_clients', 'create', 'confirm']);
      },
        (err) => {
          this.IsLoading = false;
          const error = err.json();
          if (error['loyalty_program'] && error['loyalty_program'].findIndex(x => x === 'must exist') > -1) {
            this.ModalErrorLoyalty = true;
          }
          if (error['email'] && error['email'].findIndex(x => x === 'ALREADY_TAKEN') > -1) {
            // this.SaveError = 'Email занят!';
            this.email.setErrors({ 'incorrect': true });
          }
          else if (error['phone'] && error['phone'].findIndex(x => x === 'INVALID') > -1) {
            // this.SaveError = 'Номер телефона невалидный!';
            this.phone.setErrors({ 'incorrect': true });
          }
        });
    } else {
      this.IsLoading = false;
    }
    // this.service.Client.phone = '79992132131';
    // this.isShowSuccessModal = true;
    // this.router.navigate(['/system', 'my_clients', 'create', 'confirm']);
  }



  onCloseSuccessModal() {
    this.isShowSuccessModal = false;
    // this.router.navigate(['/system', 'my_clients', 'start']);
    this.router.navigate(['/system', 'my_clients', 'create', 'confirm']);
  }

  NavigateToCreateUser() {
    this.router.navigate(['/system', 'my_clients']);
  }

  ShowErrorPhoneNumber(err?: string) {
    if (err) {
      this.ErrorText = err;
    } else {
      this.ErrorText = 'Возникла ошибка!';
    }
  }

  changeRecommendationPhone(phone: string) {
    this.Recommendation.isPhoneCurrect = false;
    if (phone.indexOf('_') > -1) {
      return;
    }
    this.service.searchPhone(phone)
      .subscribe(
        (res) => {
          if (res.json()['status'] === true) {
            this.Recommendation.isPhoneCurrect = true;
          }
        }
      );
  }

}
