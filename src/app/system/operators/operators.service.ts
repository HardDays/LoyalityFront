
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { StoreModel } from '../../core/models/store.model';
import { OperatorModel } from 'src/app/core/models/operator.model';


@Injectable()
export class OperatorsService {

  Operators: OperatorModel[] = [];
  public onOperatorsChange$: Subject<boolean> = new Subject<boolean>();

  Stores: StoreModel[] = [];
  public onStoresChange$: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpService, private auth: AuthService) {
    this.RefreshStores();
  }

  RefreshOperators(success?: (data) => void, fail?: (err) => void) {
    this.auth.onLoading.next(true);
    this.http.CommonRequest(
      () => this.http.GetData('/operators', `company_id=${this.auth.LoginData.company_id}`),
      (res: OperatorModel[]) => {
        this.Operators = res;
        this.onOperatorsChange$.next(true);
        if (success && typeof success == "function") {
          success(res);
        }
        this.auth.onLoading.next(false);
      },
      (err) => {
        this.onOperatorsChange$.next(false);
        this.auth.ErrorHandler(err, fail);
        this.auth.onLoading.next(false);
      }
    );
  }

  GetOperators(): OperatorModel[] {
    return JSON.parse(JSON.stringify(this.Operators));
  }
  DeleteOperator(Id, success?: (data) => void, fail?: (err) => void) {
    this.http.CommonRequest(
      () => this.http.DeleteData('/operators/' + Id),
      success,
      err => this.auth.ErrorHandler(err, fail)
    );
  }

  CreateOperator(Obj, success?: (data) => void, fail?: (err) => void) {
    this.http.CommonRequest(
      () => this.http.PostData('/operators', Obj),
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

  RefreshStores(success?: (data) => void, fail?: (err) => void) {
    this.http.CommonRequest(
      () => this.http.GetData('/stores', `company_id=${this.auth.LoginData.company_id}`),
      (res: StoreModel[]) => {
        this.Stores = res;
        this.onStoresChange$.next(true);
        if (success && typeof success == "function") {
          success(res);
        }
      },
      (err) => {
        this.onStoresChange$.next(false);
        this.auth.ErrorHandler(err, fail)
      }
    );
  }

  GetStores() {
    return JSON.parse(JSON.stringify(this.Stores));
  }

  GetOperator(Id, success?: (data) => void, fail?: (err) => void) {
    this.http.CommonRequest(
      () => this.http.GetData('/operators/' + Id, ''),
      success,
      err => this.auth.ErrorHandler(err, fail)
    );
  }

  GetOperatorById(Id): OperatorModel {
    const operator = this.Operators.find((obj) => obj.id == Id);

    return operator ? JSON.parse(JSON.stringify(operator)) : null;
  }

  GetStoreById(Id): StoreModel {
    const store = this.Stores.find((obj) => obj.id == Id);

    return store ? JSON.parse(JSON.stringify(store)) : null;
  }

  GetStore(Id, success?: (data) => void, fail?: (err) => void) {
    this.http.CommonRequest(
      () => this.http.GetData('/stores/' + Id),
      success,
      err => this.auth.ErrorHandler(err, fail)
    );
  }
}
