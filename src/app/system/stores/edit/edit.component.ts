import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IDictionary } from 'src/app/core/interfaces/dictionary.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StoresService } from '../stores.service';

@Component({
  selector: 'app-store-edit-cmp',
  templateUrl: './edit.component.html'
})
export class StoreEditComponent implements OnInit {

  Mode = 'edit';
  Id = 0;
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
  constructor(private _location: Location, private auth: AuthService, private router: Router, private route: ActivatedRoute,
    private service: StoresService)
  {
    this.route.params.subscribe(params=> {
      if(params && params['id'])
      {
        this.Id = params['id'];
      }
    });
  }

  ngOnInit()
  {
    this.UpdateVals();
  }

  GoBack()
  {
      this._location.back();
  }

  UpdateVals()
  {
    const vals = this.service.GetStoreById(this.Id);

    if(!vals || !vals.id || vals.id != this.Id)
    {
      this.service.GetStore(this.Id, 
        (res) => {
          this.InitAll(res);
        },
        err => {
          console.log(err);
        });
    }else{
      this.InitAll(vals);
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

  Save()
  {
    const valid = this.Form.valid;

    if(valid)
    {
      const data = this.Form.getRawValue();
      this.service.PutStore(this.Id, data,(res) => {
        this.router.navigate(["/system","my_stores"])
      },
      (err) => {
        console.log(err);
      })
    }


  }


}
