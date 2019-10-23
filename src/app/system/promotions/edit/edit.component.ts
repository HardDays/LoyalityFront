import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';
import { IDictionary } from 'src/app/core/interfaces/dictionary.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StoreModel } from 'src/app/core/models/store.model';
import { PromotionsService } from '../promotions.service';
import { IMyDpOptions, IMyDate } from 'mydatepicker';

@Component({
  selector: 'app-orimotion-edit-cmp',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class PromotionEditComponent implements OnInit {

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

    FormLevel = new FormGroup({
        "level_type": new FormControl('one_buy'),
        "write_off_money": new FormControl(1),
        "min_price": new FormControl(1),
        "write_off_points": new FormControl(1),
        "accrual_rule": new FormControl('no_accrual'),
        "accrual_percent": new FormControl(null, [
            // this.accrual_percent()
        ]),
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
        "accrual_on_register": new FormControl(false),
        "accrual_on_first_buy": new FormControl(false),
        "accrual_on_birthday": new FormControl(false),
        "register_points": new FormControl(null),
        "first_buy_points": new FormControl(null),
        "birthday_points": new FormControl(null)
    });

    // accrual_percent()
    // {
    //     return (control: AbstractControl): {[key: string]: any} | null => {
    //         if(this.FormLevel && this.FormLevel.controls)
    //         {
    //             if(this.FormLevel.controls["accrual_rule"].value == "accrual_percent")
    //             {
    //                 const value = Number.parseInt(this.FormLevel.controls["accrual_percent"].value);
    //                 console.log(value);
    //                 return value && value >= 1 && value <= 100 ? null : {'wrong': {value: control.value}};
    //             }
    //         }
            
    //         return null;
    //     };
    // }

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
        ])//,
        // "loyalty_levels": new FormArray([
        //     this.FormLevel
        // ])
    });


  constructor(private _location: Location, private auth: AuthService, private router: Router, private route: ActivatedRoute,
    private service: PromotionsService)
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
          this.service.GetPromotion(this.Id,
            (res) => {
                this.Form.patchValue(res);
                this.Form.controls.begin_date.setValue({
                    date:this.GetDisableUntilData(new Date(res.begin_date))
                });
                this.Form.controls.end_date.setValue({
                    date:this.GetDisableUntilData(new Date(res.end_date))
                });

                if(res.loyalty_levels && res.loyalty_levels.length > 0)
                {
                    const level = res.loyalty_levels[0];
                    this.FormLevel.patchValue(level);
                    
                }
                console.log(this.Form.getRawValue());
            },
            (err) => {
                this.router.navigate(["/system", "my_promotions"]);
            })
      }
    // const vals = this.service.Get(this.Id);

    // if(!vals || !vals.id || vals.id != this.Id)
    // {
    //   this.service.GetOperator(this.Id, 
    //     (res) => {
    //       this.InitAll(res);
    //     },
    //     err => {
    //       console.log(err);
    //     });
    // }else{
    //   this.InitAll(vals);
    // }
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
    for(const i in this.Form.controls)
    {
        this.Form.controls[i].markAsDirty();
        this.Form.controls[i].markAsTouched();
    }
    for(const i in this.FormLevel.controls)
    {
        this.FormLevel.controls[i].markAsDirty();
        this.FormLevel.controls[i].markAsTouched();
    }
    // this.Form.updateValueAndValidity();
    // this.FormLevel.updateValueAndValidity();
    console.log(this.FormLevel);
    // const valid = this.Form.valid;
    if(this.Form.valid && this.FormLevel.valid)
    {
      let data = this.Form.getRawValue();
        data.begin_date = this.IDateToISO(data.begin_date.date);
        data.end_date = this.IDateToISO(data.end_date.date);

        const level = this.FormLevel.getRawValue();
        data.loyalty_levels = [];
        let ldata = {};
        for(const i in level)
        {
            // if(level[i] !== null)
            // {
                ldata[i] = level[i];
            // }
        }
        data.loyalty_levels.push(ldata);
      const error = (err) => { console.log(err)};
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
    //   this.service.PutPromotion(this.Id, data,(res) => {
    //     this.GoBack();
    //   },
    //   (err) => {
    //     console.log(err);
    //   })
    }
  }

  NavigateToPromotions()
  {
    this.router.navigate(["/system", "my_promotions"]);
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


}
