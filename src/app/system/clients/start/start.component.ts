import { Component, OnInit, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IDictionary, IStringToAny } from 'src/app/core/interfaces/dictionary.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientsService } from '../clients.service';
import { StoreModel } from '../../../core/models/store.model';
import { OperatorModel } from 'src/app/core/models/operator.model';

@Component({
  selector: 'app-clients-start-cmp',
  templateUrl: './start.component.html'
})
export class ClientsStartComponent implements OnInit {

  HasStore = false;

  IsDeletedUser = false;

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
    if (!this.auth.LoginData.id) {
      this.auth.Logout();
      return;
    }
    if (this.auth.LoginData['store_id']) {
      this.HasStore = true;
    }

    console.log(this.auth.LoginData);
    this.CheckOperatorType();
  }

  CheckOperatorType() {
    if (this.auth.LoginData && this.auth.LoginData.user_types && this.auth.LoginData.user_types.findIndex(x => x === 'operator') === -1) {
      this.IsDeletedUser = true;
    }
  }











}
