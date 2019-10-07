import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { IDictionary } from '../../../core/interfaces/dictionary.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store-create-cmp',
  templateUrl: './../edit/edit.component.html'
})
export class StoreCreateComponent implements OnInit {

  Mode = 'create';
  Errors: IDictionary = {} as IDictionary;
  ErrorMsgs: IDictionary = {} as IDictionary;
  isLoading = false;

  constructor(private _location: Location, private auth: AuthService, private router: Router)
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
    if(!this.Validate())
    {
      return;
    }

    this.isLoading = true;

  }

  Validate()
  {
    return true;
  }

  ParseErrors()
  {
    this.ErrorMsgs = {} as IDictionary;
  }
}
