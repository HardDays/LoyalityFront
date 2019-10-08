import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IDictionary } from 'src/app/core/interfaces/dictionary.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StoresService } from '../stores.service';
import { StoreModel } from '../../../core/models/store.model';

@Component({
  selector: 'app-store-list-cmp',
  templateUrl: './list.component.html'
})
export class StoreListComponent implements OnInit {

Stores: StoreModel[] = [];
QueryString = "";
  constructor(
      private auth: AuthService, 
      private router: Router, 
      private route: ActivatedRoute,
      private service: StoresService)
  {
    this.service.onStoresChange$.subscribe((res) => {
        if(res)
        {
            this.UpdateStores();
        }
    })
  }

  ngOnInit()
  {
      this.service.RefreshStores();
  }

  UpdateStores(q?:string)
  {
    // console.log(q);
    const stores: StoreModel[] = this.service.GetStores();

    this.Stores = q ? stores.filter((obj) => obj.name.indexOf(q) > -1) : stores;
  }
}
