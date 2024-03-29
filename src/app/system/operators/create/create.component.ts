import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { IDictionary } from '../../../core/interfaces/dictionary.interface';
import { Router } from '@angular/router';
import { OperatorsService } from '../operators.service';
import { StoreModel } from '../../../core/models/store.model';
import { ValidatorService } from 'src/app/core/services/validator.service';

@Component({
  selector: 'app-store-create-cmp',
  templateUrl: './create.component.html'
})
export class OperatorCreateComponent implements OnInit {
  SaveSuccess = false;
  Mode = 'create';
  isLoading = false;
  Stores: StoreModel[] = [];
  SelectedStore: StoreModel = null;
  NoStore: StoreModel = new StoreModel();

  ShowSelect = false;
  Form: FormGroup = new FormGroup({
    "first_name": new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
      ValidatorService.StringNotEmpty
    ]),
    "last_name": new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
      ValidatorService.StringNotEmpty
    ]),
    "second_name": new FormControl('', [
      Validators.maxLength(30)
    ]),
    "store_id": new FormControl('', [
      // Validators.required
    ]),
    "email": new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    "phone": new FormControl('', [
      Validators.required,
      this.ValidatePhone()
    ]),
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
  get store_id() {
    return this.Form.get('store_id');
  }
  get email() {
    return this.Form.get('email');
  }

  get phone() {
    return this.Form.get('phone');
  }

  constructor(private _location: Location, private auth: AuthService, private router: Router,
    private service: OperatorsService) {
    this.NoStore.name = "Нет магазина";
    this.SelectedStore = this.NoStore;
    this.service.onStoresChange$.subscribe((val) => {
      this.Stores = this.service.GetStores();
    });
  }

  ngOnInit() {
    this.service.RefreshStores();
    // this.Stores = this.service.GetStores();
  }

  GoBack() {
    this._location.back();
  }

  Save() {
    
    this.Form.controls.first_name.setValue(this.Form.controls.first_name.value.trim());
    this.Form.controls.last_name.setValue(this.Form.controls.last_name.value.trim());
    this.Form.controls.second_name.setValue(this.Form.controls.second_name.value.trim());
    for (const i in this.Form.controls) {
      this.Form.controls[i].markAsDirty();
      this.Form.controls[i].markAsTouched();
      this.Form.controls[i].updateValueAndValidity();
    }
    const valid = this.Form.valid;

    if (valid) {
      this.auth.onLoading.next(true);
      const data = this.Form.getRawValue();
      this.service.CreateOperator(data, (res) => {
        this.auth.onLoading.next(false);
        this.SaveSuccess = true;
      },
        (err) => {
          if (err.status == 422) {
            const body = JSON.parse(err._body);
            for (const i in body) {
              if (this.Form.get(i)) {
                let err = {};
                err[body[i][0]] = true;

                this.Form.get(i).setErrors(err);
              }
            }
          }
          this.auth.onLoading.next(false);
        })
    }
  }
  SuccessClicked() {
    this.SaveSuccess = false;
    this.router.navigate(["/system", "my_cashiers"])
  }


  OnSelected(item: StoreModel) {
    this.SelectedStore = item;
    this.Form.controls.store_id.setValue(this.SelectedStore.id);
    this.ShowSelect = false;
  }

  HideSelect($event) {
    if (this.ShowSelect)
      this.ShowSelect = false;
  }

  ValidatePhone() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (this.Form && this.Form.controls) {
        const values = this.Form.getRawValue();
        if (values.phone) {
          const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

          return regex.test(values.phone) ? null : { 'incorrect_value': { value: control.value } };
        }
      }
      return null;
    };
  }
}
