import { Component, OnInit, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IDictionary, IStringToAny } from 'src/app/core/interfaces/dictionary.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StoresService } from '../stores.service';
import { StoreModel } from '../../../core/models/store.model';
import { OperatorModel } from 'src/app/core/models/operator.model';

@Component({
  selector: 'app-store-list-cmp',
  templateUrl: './list.component.html'
})
export class StoreListComponent implements OnInit {

  Stores: StoreModel[] = [];
  Operators = {} as IStringToAny;
  Expanded = {} as IStringToAny;
  QueryString = "";
  ShowModalStore = false;
  ShowModalOperator = false;
  DeleteResult = '';
  OperatorDelete = new OperatorModel();
  StoreDelete = new StoreModel();
  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private service: StoresService) {
    this.service.onStoresChange$.subscribe((res) => {
      if (res) {
        this.UpdateStores();
      }
    })
  }

  ngOnInit() {
    this.service.RefreshStores((res: StoreModel[]) => {
      for (const item of res) {
        this.RefreshOperatorsByStoreId(item.id);
      }
    });
  }

  RefreshOperatorsByStoreId(Id) {
    this.Operators[Id] = [];
    this.service.GetOperators(Id,
      (res) => {
        this.Operators[Id] = res;
      },
      (err) => {
      })
  }

  UpdateStores(q?: string) {
    const stores: StoreModel[] = this.service.GetStores();
    const _q = q ? q.toLowerCase() : "";
    this.Stores = q ? stores.filter((obj) => obj.name.toLowerCase().indexOf(_q) > -1) : stores;
    for (let item of this.Stores) {
      this.Expanded[item.id] = false;
    }
  }

  GetStoreAddress(Item: StoreModel) {
    let arr = [];
    if (Item.country) {
      arr.push(Item.country)
    }
    if (Item.city) {
      arr.push(Item.city);
    }
    if (Item.street) {
      arr.push(Item.street);
    }
    if (Item.house) {
      arr.push(Item.house);
    }
    return arr.join(", ");
  }

  DeleteStore(Item) {
    this.ShowModalStore = false;
    this.service.DeleteStore(Item.id,
      (res) => {
        this.service.RefreshStores();
        this.DeleteResult = "Магазин «" + this.StoreDelete.name + "» успешно удален!";
      },
      (err) => {
        this.DeleteResult = "Не получилось удалить магазин «" + this.StoreDelete.name + "»!";
      })
  }

  ShowMore(Item: StoreModel) {
    this.Expanded[Item.id] = true;
  }

  CheckExpanded() {
    let count = 0;
    for (const i in this.Expanded) {
      if (this.Expanded[i]) {
        count += 1;
      }
    }

    return count !== 0;
  }
  OnClickOutsideStore(Item: StoreModel) {
    if (this.Expanded[Item.id]) {
      this.Expanded[Item.id] = false;
    }
  }

  DeleteOperator(Item: OperatorModel) {
    this.ShowModalOperator = false;
    this.service.PutOperator(Item.id, { store_id: 0 },
      (res) => {
        this.RefreshOperatorsByStoreId(Item.store_id);
        this.DeleteResult = "Кассир «" +
          this.OperatorDelete.first_name + " " +
          (this.OperatorDelete.second_name ? this.OperatorDelete.second_name + " " : "") +
          this.OperatorDelete.last_name + "» успешно удален!"
      },
      (err) => {
        this.DeleteResult = "Не получилось удалить кассира «" +
          this.OperatorDelete.first_name + " " +
          (this.OperatorDelete.second_name ? this.OperatorDelete.second_name + " " : "") +
          this.OperatorDelete.last_name + "»!";
      }
    )
  }

  DeleteStoreQA(item: StoreModel) {
    this.ShowModalStore = true;
    this.StoreDelete = item;
  }

  DeleteOperatorQA(item: OperatorModel) {
    this.ShowModalOperator = true;
    this.OperatorDelete = item;
  }

}
