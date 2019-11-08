import { Component, OnInit, HostListener } from '@angular/core';
import {Location} from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IDictionary, IStringToAny } from 'src/app/core/interfaces/dictionary.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StoreModel } from '../../../core/models/store.model';
import { OperatorsService } from '../operators.service';
import { OperatorModel } from '../../../core/models/operator.model';

@Component({
  selector: 'app-operators-list-cmp',
  templateUrl: './list.component.html'
})
export class OperatorsListComponent implements OnInit {

Operators: OperatorModel[] = [];
QueryString = "";
  constructor(
      private auth: AuthService, 
      private router: Router, 
      private route: ActivatedRoute,
      private service: OperatorsService)
  {
    this.service.onOperatorsChange$.subscribe((res) => {
        if(res)
        {
            this.UpdateOperators();
        }
    })
  }

  ngOnInit()
  {
    this.service.RefreshOperators();
  }

  UpdateOperators(q?:string)
  {
    const operators: OperatorModel[] = this.service.GetOperators();
    const _q = q ? q.toLowerCase() : "";
    this.Operators = q ? operators.filter((obj) => (obj.first_name + " " + (obj.second_name ? obj.second_name + " " : "") + obj.last_name).toLowerCase().indexOf(_q) > -1) : operators;
  }

  DeleteOperator(Item)
  {
    console.log(Item);
      this.service.DeleteOperator(Item.id, 
          (res) => {
            console.log(res);
              this.service.RefreshOperators();
          },
          (err) => {
            console.log(err);
          })
  }
}
