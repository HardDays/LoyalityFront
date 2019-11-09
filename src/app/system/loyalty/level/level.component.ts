import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';
import { IDictionary } from 'src/app/core/interfaces/dictionary.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IMyDpOptions, IMyDate } from 'mydatepicker';
import { PromotionModel } from 'src/app/core/models/promotion.model';
import { LoyaltyService } from '../loyalty.service';

@Component({
  selector: 'app-loyalty-level-cmp',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css']
})
export class LoyaltyLevelComponent implements OnInit {

    isLoading = false;
    Id = '';

    ShowSelect = false;
    myDatePickerOptions: IMyDpOptions = {
      // other options...
      dateFormat: 'dd.mm.yyyy',
      dayLabels: {
          su: 'Вс', mo: 'Пн', tu: 'Вт', we: 'Ср', th: 'Чт', fr: 'Пт', sa: 'Сб'
      },
      monthLabels:{
          1: 'Янв', 2: 'Фев', 3: 'Мар', 4: 'Апр', 5: 'Май', 6: 'Июн', 7: 'Июл', 8: 'Авг', 9: 'Сен', 10: 'Окт', 11: 'Ноя', 12: 'Дек'
      },
      showTodayBtn: false,
      disableUntil: this.GetDisableUntilData(new Date()),
      showClearDateBtn: false,
      height: '28px',
      openSelectorOnInputClick: true
    };

    Form: FormGroup = new FormGroup({
      "name": new FormControl('',[
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30)
      ]),
      "begin_date": new FormControl('',[
          Validators.required
      ]),
      "end_date": new FormControl('',[
          Validators.required
      ]),
      "accrual_rule": new FormControl('no_accrual'),
      "accrual_percent": new FormControl(null),
      "accrual_money": new FormControl(null),
      "accrual_points": new FormControl(null),

      "burning_rule": new FormControl('no_burning'),
      "burning_days": new FormControl(null),

      "activation_rule": new FormControl('activation_moment'),
      "activation_days": new FormControl(null),

      "write_off_rule": new FormControl('no_write_off'),
      "write_off_rule_percent": new FormControl(null),
      "write_off_rule_points": new FormControl(null),

      "accordance_rule": new FormControl('no_accordance'),
      "accordance_percent": new FormControl(null),
      "accordance_points": new FormControl(null),

      "rounding_rule": new FormControl('no_rounding'),

      "accrual_on_points": new FormControl(false),
      "write_off_limited": new FormControl(false),
      "write_off_min_price": new FormControl(null)
    });


  constructor(private _location: Location, private auth: AuthService, private router: Router, private route: ActivatedRoute,
    private service: LoyaltyService)
  {
    this.route.params.subscribe(params=> {
      if(params && params['id'])
      {
        this.Id = params['id'];
        this.UpdateVals();
      }
    });
  }

  ngOnInit()
  {
  }

  UpdateVals()
  {
      if(this.Id != 'new')
      {
          this.service.GetLevel(this.Id,
            (res: PromotionModel) => {
                let data = res;

                if(data.accrual_money)
                  data.accrual_money = Math.round(data.accrual_money / 100);

                if(data.accrual_points)
                  data.accrual_points = Math.round(data.accrual_points / 100);

                if(data.write_off_rule_points)
                  data.write_off_rule_points = Math.round(data.write_off_rule_points / 100);
          

                if(data.accordance_points)
                  data.accordance_points = Math.round(data.accordance_points / 100);
          
                if(data.write_off_min_price)
                  data.write_off_min_price = Math.round(data.write_off_min_price / 100);

                this.Form.patchValue(data);
                this.Form.controls.begin_date.setValue({
                    date:this.GetDisableUntilData(new Date(res.begin_date))
                });
                this.Form.controls.end_date.setValue({
                    date:this.GetDisableUntilData(new Date(res.end_date))
                });
            },
            (err) => {
                this.router.navigate(["/system", "my_promotions"]);
            })
      }
  }

  InitAll(Val)
  {
    if(Val)
    {
      for(const i in this.Form.controls)
      {
        if(Val[i])
        {
          this.Form.controls[i].setValue(Val[i]);
        }
      }
    }
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
      data.begin_date = this.IDateToISO(data.begin_date.date);
      data.end_date = this.IDateToISO(data.end_date.date);

      if(data.accrual_money)
        data.accrual_money = data.accrual_money * 100;

      if(data.accrual_points)
        data.accrual_points = data.accrual_points * 100;

      if(data.write_off_rule_points)
        data.write_off_rule_points = data.write_off_rule_points * 100;

      if(data.accordance_points)
        data.accordance_points = data.accordance_points * 100;

      if(data.write_off_min_price)
        data.write_off_min_price = data.write_off_min_price * 100;


      const error = (err) => { 
        const body = err.body;
        for(var i in body)
        {
          this.Form.controls[i].setErrors({
            "wrong": true
          });
        }
        window.scrollTo(0,0);
      };
      if(this.Id == 'new')
      {
        this.service.CreatePromotion(data, (res) => {
          this.NavigateToPromotions();
        }, error);
      }
      else{
        this.service.PutPromotion(this.Id, data, (res) => {
          this.NavigateToPromotions();
        }, error);
      }
    }
    else
    {
      return;
    }
  }

  NavigateToPromotions()
  {
    this.router.navigate(["/system", "my_promotions", "list"]);
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

  IDateToISO(obj)
  {
      return obj.year + "-" + obj.month + "-" + obj.day;
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


    
    if(!data.begin_date.date || !data.end_date.date)
    {
      this.Form.controls.end_date.setErrors({
        'wrong': true
      });
      hasError = true;
      
    }
    else{
      const date1 = new Date(this.IDateToISO(data.begin_date.date));
      const date2 = new Date(this.IDateToISO(data.end_date.date));
      if(date1.getTime() > date2.getTime() )
      {
        this.Form.controls.end_date.setErrors({
          'wrong': true
        });
        hasError = true;
      }
      
    }
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

    if(data.accrual_rule == "accrual_percent")
    {
      ferror("accrual_percent", 1, 100);
    }
    else if (data.accrual_rule == "accrual_convert")
    {
      ferror("accrual_points", 1, 10000000000);
      ferror("accrual_money", 1, 10000000000);
    }

    if(data.burning_rule == "burning_days")
    {
      ferror("burning_days", 1, 365);
    }

    if(data.activation_rule == "activation_days")
    {
      ferror("activation_days", 1, 365);
    }

    if(data.write_off_rule == "write_off_convert")
    {
      ferror("write_off_rule_percent", 1, 100);
      ferror("write_off_rule_points", 1, 10000000000);
    }

    if(data.accordance_rule == "accordance_convert")
    {
      ferror("accordance_percent", 1, 100);
      ferror("accordance_points", 1, 10000000000);
    }

    if(data.write_off_limited)
    {
      ferror("write_off_min_price", 1, Number.POSITIVE_INFINITY);
    }

    this.Form.updateValueAndValidity();
    if(hasError)
      window.scrollTo(0,scrollTo);

    return !hasError;
  }


}
