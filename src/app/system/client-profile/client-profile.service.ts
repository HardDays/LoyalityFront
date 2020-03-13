
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { StoreModel } from '../../core/models/store.model';
import { ClientModel } from 'src/app/core/models/client.model';


@Injectable()
export class ClientProfileService {

  public ClientProfile = new ClientModel();
  public onClientProfileChange$: Subject<boolean> = new Subject<boolean>();

  public ClientBonuses = [];
  public ClientLoyalty = [];


  constructor(private http: HttpService, private auth: AuthService) {
  }

  GetClientProfile(success?: (data) => void, fail?: (err) => void) {
    this.auth.onLoading.next(true);
    this.http.CommonRequest(
      () => this.http.GetData('/clients/profile'),
      (res) => {
        const profile = { ...res, ...res.client[0] }
        if (success && typeof success == 'function') {
          this.auth.onLoading.next(false);
          success(profile);
        }
      },
      (err) => {
        if (fail && typeof fail == 'function') {
          this.auth.onLoading.next(false);
          fail(err);
        }
      }
    );
  }

  UpdateClientProfile(Obj, success?: (data) => void, fail?: (err) => void) {
    if (Obj && Obj['phone']) {
      Obj['phone'] = (Obj['phone']).replace(/ /g, '').replace(/\(/g, '').replace(/\)/g, '').replace(/\+/g, '');
    }
    this.http.CommonRequest(
      () => this.http.PutData('/clients/profile', Obj),
      success,
      fail
    );
  }

  GetClientOrders(success?: (data) => void, fail?: (err) => void) {
    this.http.CommonRequest(
      () => this.http.GetData('/clients/profile/orders'),
      success,
      fail
    );
  }
}
