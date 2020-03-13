
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { StoreModel } from '../../core/models/store.model';
import { OperatorModel } from 'src/app/core/models/operator.model';


@Injectable()
export class StoresService {

  Stores: StoreModel[] = [];
  public onStoresChange$: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpService, private auth: AuthService) {

  }

  RefreshStores(success?: (data) => void, fail?: (err) => void) {
    this.auth.onLoading.next(true);
    this.http.CommonRequest(
      () => this.http.GetData('/stores', ''),
      (res: StoreModel[]) => {
        this.Stores = res;
        this.onStoresChange$.next(true);
        if (success && typeof success == "function") {
          success(res);
        }
        this.auth.onLoading.next(false);

      },
      (err) => {
        this.onStoresChange$.next(false);
        this.auth.ErrorHandler(err, fail);
        this.auth.onLoading.next(false);
      }
    );
  }

  GetStores() {
    return JSON.parse(JSON.stringify(this.Stores));
  }

  GetStoreById(Id): StoreModel {
    const store = this.Stores.find((obj) => obj.id == Id);

    return store ? JSON.parse(JSON.stringify(store)) : null;
  }

  GetOperators(StoreId, success?: (data) => void, fail?: (err) => void) {
    this.http.CommonRequest(
      () => this.http.GetData(`/operators`, `store_id=${StoreId}`),
      (res: OperatorModel[]) => {
        const operators = res.map(op => ({ ...op, ...op.operator[0] }))
        if (success && typeof success == "function") {
          success(operators);
        }
        this.auth.onLoading.next(false);
      },
      err => this.auth.ErrorHandler(err, fail)
    );
  }

  CreateStore(Obj, success?: (data) => void, fail?: (err) => void) {
    this.http.CommonRequest(
      () => this.http.PostData('/stores', Obj),
      success,
      err => this.auth.ErrorHandler(err, fail)
    );
  }

  PutStore(Id, Obj, success?: (data) => void, fail?: (err) => void) {
    this.http.CommonRequest(
      () => this.http.PutData('/stores/' + Id, Obj),
      success,
      err => this.auth.ErrorHandler(err, fail)
    );
  }

  GetStore(Id, success?: (data) => void, fail?: (err) => void) {
    this.http.CommonRequest(
      () => this.http.GetData('/stores/' + Id),
      success,
      err => this.auth.ErrorHandler(err, fail)
    );
  }

  DeleteStore(Id, success?: (data) => void, fail?: (err) => void) {
    this.http.CommonRequest(
      () => this.http.DeleteData('/stores/' + Id),
      success,
      err => this.auth.ErrorHandler(err, fail)
    );
  }
  DeleteOperator(Id, success?: (data) => void, fail?: (err) => void) {
    this.http.CommonRequest(
      () => this.http.DeleteData('/operators/' + Id),
      success,
      err => this.auth.ErrorHandler(err, fail)
    );
  }

  PutOperator(Id, Obj, success?: (data) => void, fail?: (err) => void) {
    this.http.CommonRequest(
      () => this.http.PutData('/operators/' + Id, Obj),
      success,
      err => this.auth.ErrorHandler(err, fail)
    );
  }
}
