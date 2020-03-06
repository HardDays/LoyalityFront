import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IDictionary } from 'src/app/core/interfaces/dictionary.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OperatorsService } from '../operators.service';
import { StoreModel } from 'src/app/core/models/store.model';

@Component({
  selector: 'app-operator-edit-cmp',
  templateUrl: './edit.component.html'
})
export class OperatorEditComponent implements OnInit {

  isLoading = false;
  Stores: StoreModel[] = [];
  SelectedStore: StoreModel = null;
  Id = 0;

  NoStore: StoreModel = new StoreModel();

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
      // Validators.required
    ]),
    "email": new FormControl('',[
      Validators.required,
      Validators.email
    ])
  });
  SaveSuccess: boolean = false;
  GetDataError = false;

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

  constructor(private _location: Location, private auth: AuthService, private router: Router, private route: ActivatedRoute,
    private service: OperatorsService)
  {
    // console.log("EDIT COMPONENT");
    this.NoStore.name = "Нет магазина";
    this.route.params.subscribe(params=> {
      if(params && params['id'])
      {
        this.Id = params['id'];
        this.UpdateVals();
      }
    });
    this.service.onStoresChange$.subscribe((val) => {
      this.Stores = this.service.GetStores();
      this.InitStore();
    });
  }

  ngOnInit()
  {
    this.service.RefreshStores();
    this.Stores = this.service.GetStores();
    this.InitStore();
  }

  UpdateVals()
  {
    // const vals = this.service.GetOperatorById(this.Id);

    // if(!vals || !vals.id || vals.id != this.Id)
    // {
      this.service.GetOperator(this.Id,
        (res) => {
          this.InitAll(res);
        },
        err => {
          if(err.status == 404)
          {
            this.GetDataError = true;
          }
          else{
            this.GoBack();
          }
          // console.log(err);
          // this.router.navigate(["/system"]);
        });
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

      this.InitStore();
    }
  }

  InitStore()
  {
    this.SelectedStore = this.Stores.find(obj => obj.id == this.Form.controls.store_id.value);

    if(!this.SelectedStore)
      this.SelectedStore = this.NoStore;

    // this.Form.controls.store_id.setValue(this.SelectedStore ? this.SelectedStore.id : 0);
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
        this.Form.controls[i].updateValueAndValidity();
    }
    const valid = this.Form.valid;

    if(valid)
    {
      this.auth.onLoading.next(true);
      const data = this.Form.getRawValue();
      this.service.PutOperator(this.Id, data,(res) => {
        this.auth.onLoading.next(false);
        this.SaveSuccess = true;
        // this.router.navigate(["/system","my_cashiers"])
      },
      (err) => {
        if(err.status == 422)
        {
          const body = JSON.parse(err._body);
          for(const i in body)
          {
            if(this.Form.get(i))
            {
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

  SuccessClicked()
  {
    this.SaveSuccess = false;
    this.GoBack();
    // this.router.navigate(["/system","my_cashiers"])
  }

  ErrorClicked()
  {
    this.GetDataError = false;
    this.GoBack();
  }

  OnSelected(item:StoreModel)
  {
    this.SelectedStore = item;
    this.Form.controls.store_id.setValue(this.SelectedStore.id);
    this.ShowSelect = false;
  }

  HideSelect($event)
  {
    if(this.ShowSelect)
      this.ShowSelect = false;
  }

}
