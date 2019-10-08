import { Component, OnInit, HostListener } from '@angular/core';
import {Location} from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IDictionary, IStringToAny } from 'src/app/core/interfaces/dictionary.interface';
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
Operators = {} as IStringToAny;
Expanded = {} as IStringToAny;
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
      this.service.RefreshStores((res: StoreModel[]) => {
        for(const item of res)
        {
          this.Operators[item.id] = [];
          this.service.GetOperators(item.id,
            (res) => {
              this.Operators[item.id] = res;
            },
            (err) => {
                console.log(err);
            })
        }
      });
  }

  UpdateStores(q?:string)
  {
    const stores: StoreModel[] = this.service.GetStores();

    this.Stores = q ? stores.filter((obj) => obj.name.indexOf(q) > -1) : stores;
    for(let item of this.Stores)
    {
      this.Expanded[item.id] = false;
    }
  }

  GetStoreAddress(Item: StoreModel)
  {
    let arr = [];
    if(Item.country)
    {
        arr.push(Item.country)
    }
    if(Item.city)
    {
        arr.push(Item.city);
    }
    if(Item.street)
    {
        arr.push(Item.street);
    }
    if(Item.house)
    {
        arr.push(Item.house);
    }
    return arr.join(", ");
  }

  DeleteStore(Item)
  {
      this.service.DeleteStore(Item.id, 
          (res) => {
              this.service.RefreshStores();
          },
          (err) => {

          })
  }

  ShowMore(Item:StoreModel)
  {
    this.Expanded[Item.id] = true;
  }

  CheckExpanded(){
    let count = 0;
    for(const i in this.Expanded)
    {
      if(this.Expanded[i])
      {
        count += 1;
      }
    }

    return count !== 0;
  }
  OnClickOutsideStore(Item:StoreModel)
  {
    if(this.Expanded[Item.id])
    {
      this.Expanded[Item.id] = false;
    }
  }
  
}
