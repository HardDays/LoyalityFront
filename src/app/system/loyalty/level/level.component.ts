import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';
import { IDictionary } from 'src/app/core/interfaces/dictionary.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IMyDpOptions, IMyDate } from 'mydatepicker';
import { PromotionModel } from 'src/app/core/models/promotion.model';
import { LoyaltyService } from '../loyalty.service';
import { LoyaltyLevelModel } from '../../../core/models/loyalty.model';

@Component({
  selector: 'app-loyalty-level-cmp',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css']
})
export class LoyaltyLevelComponent implements OnInit {

  isLoading = false;
  Id = '';

  ShowSelect = false;
  LevelSaved = false;
  GetDataError = false;

  Form: FormGroup = new FormGroup({
    "name": new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]),
    "min_price": new FormControl("", [
      Validators.required,
      Validators.min(0),
      Validators.max(100000000)
    ]),

    "accrual_rule": new FormControl("no_accrual", [
      Validators.required
    ]),
    "accrual_percent": new FormControl(null),
    "accrual_points": new FormControl(null),
    "accrual_money": new FormControl(null),

    "write_off_rule": new FormControl("no_write_off"),
    "write_off_rule_percent": new FormControl(null),
    "write_off_rule_points": new FormControl(null),

    "burning_rule": new FormControl("no_burning"),
    "burning_days": new FormControl(null),

    "activation_rule": new FormControl("activation_moment"),
    "activation_days": new FormControl(null),

    "accordance_rule": new FormControl("no_accordance"),
    "accordance_percent": new FormControl(null),
    "accordance_points": new FormControl(null),

    "accrual_on_points": new FormControl(false)
  });


  constructor(private _location: Location, private auth: AuthService, private router: Router, private route: ActivatedRoute,
    private service: LoyaltyService) {
    this.route.params.subscribe(params => {
      if (params && params['id']) {
        this.Id = params['id'];
        this.UpdateVals();
      }
    });
  }

  ngOnInit() {
  }

  UpdateVals() {
    if (this.Id != 'new') {
      this.service.GetLevel(this.Id,
        (res: LoyaltyLevelModel) => {
          let data = res;

          if (data.min_price)
            data.min_price /= 100;

          if (data.accrual_points)
            data.accrual_points /= 100;

          if (data.accrual_money)
            data.accrual_money /= 100;

          if (data.write_off_rule_points)
            data.write_off_rule_points /= 100;

          if (data.accordance_points)
            data.accordance_points /= 100;

          this.Form.patchValue(data);
        },
        (err) => {
          this.GetDataError = true;
        })
    }
  }

  InitAll(Val) {
    if (Val) {
      for (const i in this.Form.controls) {
        if (Val[i]) {
          this.Form.controls[i].setValue(Val[i]);
        }
      }
    }
  }



  GoBack() {
    this.LevelSaved = false;
    this._location.back();
  }

  Save() {
    const validate = this.ValidateForm();
    if (validate && this.Form.valid) {
      let data = this.Form.getRawValue();

      if (data.min_price)
        data.min_price *= 100;

      if (data.accrual_rule != "accrual_percent") {
        data.accrual_percent = null;
      }

      if (data.accrual_rule != "accrual_convert") {
        data.accrual_points = null;
        data.accrual_money = null;
      }
      else {
        data.accrual_points *= 100;
        data.accrual_money *= 100;
      }

      if (data.write_off_rule != "write_off_convert") {
        data.write_off_rule_percent = null;
        data.write_off_rule_points = null;
      }
      else {
        data.write_off_rule_points *= 100;
      }

      if (data.burning_rule != "burning_days") {
        data.burning_days = null;
      }

      if (data.activation_rule != "activation_days") {
        data.activation_days = null;
      }

      if (data.accordance_rule != "accordance_convert") {
        data.accordance_percent = null;
        data.accordance_points = null;
      }
      else {
        data.accordance_points *= 100;
      }


      const error = (err) => {
        const body = err.body;
        for (var i in body) {
          this.Form.controls[i].setErrors({
            "wrong": true
          });
        }
        window.scrollTo(0, 0);
      };
      const success = (res) => {
        console.log(res);
        this.LevelSaved = true;
      };
      if (this.Id == 'new') {
        this.service.CreateLevel(data, success, error);
      }
      else {
        this.service.PutLevel(this.Id, data, success, error);
      }
    }
    else {
      return;
    }
  }

  NavigateToPromotions() {
    this.router.navigate(["/system", "my_loyalty_program", "list"]);
  }


  ValidateForm() {
    // return true;
    const remove_error = (property_name) => {
      if (this.Form.controls[property_name].hasError('wrong')) {

        this.Form.controls[property_name].setErrors({
          'wrong': null
        });
        this.Form.controls[property_name].updateValueAndValidity();
      }
    }

    for (const i in this.Form.controls) {
      this.Form.controls[i].markAsDirty();
      this.Form.controls[i].markAsTouched();
      remove_error(i);
      this.Form.controls[i].updateValueAndValidity();
    }

    let hasError = false;
    const data = this.Form.getRawValue();


    let scrollTo = 0;

    const ferror = (property_name, min, max) => {
      if (!data[property_name] || data[property_name] < min || data[property_name] > max) {
        this.Form.controls[property_name].setErrors({
          'wrong': true
        });
        hasError = true;
      }
    }


    if (data.accrual_rule == "accrual_percent") {
      ferror("accrual_percent", 0, 100);
    }
    else if (data.accrual_rule == "accrual_convert") {
      ferror("accrual_points", 0, 100000000);
      ferror("accrual_money", 0, 100000000);
    }

    if (data.write_off_rule == "write_off_convert") {
      ferror("write_off_rule_percent", 0, 100);
      ferror("write_off_rule_points", 0, 100000000);
    }

    if (data.burning_rule == "burning_days") {
      ferror("burning_days", 1, 365);
    }

    if (data.activation_rule == "activation_days") {
      ferror("activation_days", 1, 365);
    }

    if (data.accordance_rule == "accordance_convert") {
      ferror("accordance_percent", 0, 100);
      ferror("accordance_points", 0, 100000000);
    }

    this.Form.updateValueAndValidity();
    if (hasError)
      window.scrollTo(0, scrollTo);

    return !hasError;
  }


}
