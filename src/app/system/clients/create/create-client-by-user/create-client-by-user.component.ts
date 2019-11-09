import { Router } from '@angular/router';
import { ValidatorService } from './../../../../core/services/validator.service';
import { ClientsService } from './../../clients.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IMyDpOptions } from 'mydatepicker';
import { PromotionsService } from 'src/app/system/promotions/promotions.service';

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
    // 'loyalty_program_id': new FormControl('', [
    //   // Validators.required
    // ]),
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

  PromotionsProgramm = [];

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

  Recommendation = {
    isTrue: false,
    phone: ''
  };

  isShowSuccessModal = false;

  OrderPrice = 0;

  constructor(
    private _location: Location,
    private router: Router,
    private service: ClientsService,
    private loyalityService: PromotionsService) { }

  ngOnInit() {
    this.loyalityService.RefreshPromotions(
      (data) => {
        this.PromotionsProgramm = data;
      }
    );
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

      data['birth_day'] = data['birth_day']['formatted'];

      if (this.Recommendation.isTrue && this.Recommendation.phone) {
        data['recommendator_phone'] = this.Recommendation.phone;
      }

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
    if (this.SelectedLoyality) {
      this.service.CreateOrderForPromotion(
        user_id,
        +this.SelectedLoyality.id,
        +this.OrderPrice,
        0,
        (res) => {
          this.isShowSuccessModal = true;
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.service.CreateOrderForLoyalty(
        user_id,
        +this.OrderPrice,
        0,
        (res) => {
          this.isShowSuccessModal = true;
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }



  OnSelected(item)
  {
    this.SelectedLoyality = item;
    // this.Form.controls.loyalty_program_id.setValue(this.SelectedLoyality.id);
    this.ShowSelect = false;
  }

  onCloseSuccessModal() {
    this.isShowSuccessModal = false;
    this.router.navigate(['/system', 'my_clients', 'start']);
  }

}
