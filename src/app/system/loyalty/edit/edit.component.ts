import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';
import { IDictionary } from 'src/app/core/interfaces/dictionary.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IMyDpOptions, IMyDate } from 'mydatepicker';
import { PromotionModel } from 'src/app/core/models/promotion.model';
import { LoyaltyService } from '../loyalty.service';
import { LoyaltyModel } from '../../../core/models/loyalty.model';

@Component({
  selector: 'app-loyalty-edit-cmp',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class LoyaltyEditComponent implements OnInit {

    isLoading = false;
    Id = '';

    ShowSelect = false;
    Loyalty = new LoyaltyModel();
    ProgramSaved = false;

    Form: FormGroup = new FormGroup({
      "name": new FormControl('',[
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30)
      ]),
      "sum_type": new FormControl('one_buy',[
          Validators.required
      ]),

      "accrual_on_register": new FormControl(false),
      "register_points": new FormControl(null),

      "accrual_on_first_buy": new FormControl(false),
      "first_buy_points": new FormControl(null),

      "write_off_limited": new FormControl(false),
      "write_off_min_price": new FormControl(null),

      "accrual_on_recommend": new FormControl(false),
      "recommend_recommendator_points": new FormControl(null),
      "recommend_registered_points": new FormControl(null),

      "rounding_rule": new FormControl('no_rounding'),

      "sms_on_register": new FormControl(false),
      "sms_on_points": new FormControl(false),
      "sms_on_write_off": new FormControl(false),

      "sms_on_burning": new FormControl(false),
      "sms_burning_days": new FormControl(null),

      "sms_on_birthday": new FormControl(false)
    });


  constructor(private _location: Location, private auth: AuthService, private router: Router, private route: ActivatedRoute,
    private service: LoyaltyService)
  {
    this.service.onLoyaltyChange$.subscribe((res) => {
        if(res)
        {
            this.UpdateData();
        }
    })
  }

  ngOnInit()
  {
    this.service.RefreshLoyalty();
  }

  UpdateData()
  {
    const loyalty = this.service.GetLoyalty();
    if(loyalty)
    {
        this.Loyalty = loyalty;
    }
    this.UpdateVals();
  }

  UpdateVals()
  {
    if(this.Loyalty.accrual_on_register && this.Loyalty.register_points)
    {
        this.Loyalty.register_points = Math.round(this.Loyalty.register_points / 100);
    }
    else{
        this.Loyalty.register_points = null;
    }

    if(this.Loyalty.accrual_on_first_buy && this.Loyalty.first_buy_points)
    {
        this.Loyalty.first_buy_points = Math.round(this.Loyalty.first_buy_points / 100);
    }
    else{
        this.Loyalty.first_buy_points = null;
    }

    if(this.Loyalty.write_off_limited && this.Loyalty.write_off_min_price)
    {
        this.Loyalty.write_off_min_price = Math.round(this.Loyalty.write_off_min_price / 100);
    }
    else{
        this.Loyalty.write_off_min_price = null;
    }

    if(this.Loyalty.accrual_on_recommend)
    {
        if(this.Loyalty.recommend_recommendator_points)
            this.Loyalty.recommend_recommendator_points = Math.round(this.Loyalty.recommend_recommendator_points / 100);

        if(this.Loyalty.recommend_registered_points)
            this.Loyalty.recommend_registered_points = Math.round(this.Loyalty.recommend_registered_points / 100);
    }
    else{
        this.Loyalty.recommend_recommendator_points = null;
        this.Loyalty.recommend_registered_points = null;
    }

    this.Form.patchValue(this.Loyalty);
  }

  GoBack()
  {
      this._location.back();
  }

  Save()
  {
    const validate = this.ValidateForm();
    if(validate && this.Form.valid)
    {
        let data = this.Form.getRawValue();

        if(data.accrual_on_register)
        {
            data.register_points *= 100;
        }

        if(data.accrual_on_first_buy)
        {
            data.first_buy_points *= 100;
        }

        if(data.write_off_limited)
        {
            data.write_off_min_price *= 100;
        }

        if(data.accrual_on_recommend)
        {
            data.recommend_recommendator_points *= 100;
            data.recommend_registered_points *= 100;
        }
        this.service.SaveLoyalty(data, 
        (res) => {
            this.ProgramSaved = true;
        },
        (err) => { 
            const body = err.body;
            for(var i in body)
            {
                this.Form.controls[i].setErrors({
                    "wrong": true
                });
            }
            window.scrollTo(0,0);
        });
    }
    else
    {
      return;
    }
  }

  ValidateForm()
  {
    // return true;
    const remove_error = (property_name) => {
      if(this.Form.controls[property_name].hasError('wrong'))
      {
        
        this.Form.controls[property_name].setErrors({
          'wrong': null
        });
        this.Form.controls[property_name].updateValueAndValidity();
      }
    }

    for(const i in this.Form.controls)
    {
        this.Form.controls[i].markAsDirty();
        this.Form.controls[i].markAsTouched();
        remove_error(i);
        this.Form.controls[i].updateValueAndValidity();
    }

    let hasError = false;
    const data = this.Form.getRawValue();

    let scrollTo = 0;

    const ferror = (property_name, min, max) => {
      if(!data[property_name] || data[property_name] < min || data[property_name] > max)
      {
        this.Form.controls[property_name].setErrors({
          'wrong': true
        });
        hasError = true;
      }
    }

    if(data.accrual_on_register)
    {
        ferror("register_points", 1, 100000000);
    }

    if(data.accrual_on_first_buy)
    {
        ferror("first_buy_points", 1, 100000000);
    }

    if(data.write_off_limited)
    {
        ferror("write_off_min_price", 1, 100000000);
    }

    if(data.accrual_on_recommend)
    {
        ferror("recommend_recommendator_points", 1, 100000000);
        ferror("recommend_registered_points", 1, 100000000);
    }

    if(data.sms_on_burning)
    {
        ferror("sms_burning_days", 1, 365);
    }

    this.Form.updateValueAndValidity();
    if(hasError)
      window.scrollTo(0,scrollTo);

    return !hasError;
  }


}
