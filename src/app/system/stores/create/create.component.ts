import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { IDictionary } from '../../../core/interfaces/dictionary.interface';
import { Router } from '@angular/router';
import { StoresService } from '../stores.service';

@Component({
  selector: 'app-store-create-cmp',
  templateUrl: './../edit/edit.component.html'
})
export class StoreCreateComponent implements OnInit {

  Mode = 'create';
  isLoading = false;

  Form: FormGroup = new FormGroup({
    "name": new FormControl('',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]),
    "country": new FormControl('',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]),
    "city": new FormControl('',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]),
    "street": new FormControl('',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]),
    "house": new FormControl('',[
      Validators.required,
      Validators.min(1),
      Validators.max(9999)
    ])
  });

  get name()
  {
    return this.Form.get('name');
  }
  get country()
  {
    return this.Form.get('country');
  }
  get city()
  {
    return this.Form.get('city');
  }
  get street()
  {
    return this.Form.get('street');
  }
  get house()
  {
    return this.Form.get('house');
  }

  constructor(private _location: Location, private auth: AuthService, private router: Router,
    private service: StoresService)
  {
  }

  ngOnInit()
  {
  }

  GoBack()
  {
      this._location.back();
  }

  Save()
  {
    this.Form.updateValueAndValidity();
    for(const i in this.Form.controls)
    {
      this.Form.get(i).updateValueAndValidity();
      this.Form.get(i).markAsDirty();
      this.Form.get(i).markAsTouched();
    }

    const valid = this.Form.valid;

    if(valid)
    {
      const data = this.Form.getRawValue();
      this.service.CreateStore(data,(res) => {
        this.router.navigate(["/system","my_stores"])
      },
      (err) => {
      })
    }


  }
}
