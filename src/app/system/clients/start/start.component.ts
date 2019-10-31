import { Component, OnInit, HostListener } from '@angular/core';
import {Location} from '@angular/common';
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

  constructor(private auth: AuthService){
  }

  ngOnInit(){
  }

  // RefreshOperatorsByStoreId(Id)
  // {
  //   this.Operators[Id] = [];
  //   this.service.GetOperators(Id,
  //     (res) => {
  //       this.Operators[Id] = res;
  //     },
  //     (err) => {
  //     })
  // }














}
