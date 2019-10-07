import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IDictionary } from 'src/app/core/interfaces/dictionary.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-store-edit-cmp',
  templateUrl: './edit.component.html'
})
export class StoreEditComponent implements OnInit {

  Mode = 'edit';
  Errors: IDictionary = {} as IDictionary;
  ErrorMsgs: IDictionary = {} as IDictionary;

  isLoading = false;
  constructor(private _location: Location, private auth: AuthService, private router: Router, private route: ActivatedRoute)
  {

  }

  ngOnInit()
  {
  }




}
