import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { IDictionary } from '../../../core/interfaces/dictionary.interface';
import { Router } from '@angular/router';
import { OperatorsService } from '../operators.service';
import { StoreModel } from '../../../core/models/store.model';

@Component({
  selector: 'app-store-create-cmp',
  templateUrl: './create.component.html'
})
export class OperatorCreateComponent implements OnInit {

  Mode = 'create';
  isLoading = false;
    Stores: StoreModel[] = []; 
    SelectedStore: StoreModel = null;

    ShowSelect = false;
  Form: FormGroup = new FormGroup({
    "first_name": new FormControl('',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]),
    "last_name": new FormControl('',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]),
    "second_name": new FormControl('',[
      Validators.maxLength(30)
    ]),
    "store_id": new FormControl('',[
      Validators.required
    ]),
    "email": new FormControl('',[
      Validators.required,
      Validators.email
    ])
  });

  get first_name()
  {
    return this.Form.get('first_name');
  }
  get last_name()
  {
    return this.Form.get('last_name');
  }
  get second_name()
  {
    return this.Form.get('second_name');
  }
  get store_id()
  {
    return this.Form.get('store_id');
  }
  get email()
  {
    return this.Form.get('email');
  }

  constructor(private _location: Location, private auth: AuthService, private router: Router,
    private service: OperatorsService)
  {
      this.service.onStoresChange$.subscribe((val) => {
        this.Stores = this.service.GetStores();
      });
  }

  ngOnInit()
  {
    this.Stores = this.service.GetStores();
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
    const valid = this.Form.valid;

    if(valid)
    {
      const data = this.Form.getRawValue();
      this.service.CreateOperator(data,(res) => {
        this.router.navigate(["/system","my_cashiers"])
      },
      (err) => {
      })
    }
  }

  OnSelected(item:StoreModel)
  {
    this.SelectedStore = item;
    this.Form.controls.store_id.setValue(this.SelectedStore.id);
    this.ShowSelect = false;
  }
}
