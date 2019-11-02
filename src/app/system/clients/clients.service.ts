
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { StoreModel } from '../../core/models/store.model';
import { ClientModel } from 'src/app/core/models/client.model';


@Injectable()
export class ClientsService {

    public Client = new ClientModel();
    public onClientChange$: Subject<boolean> = new Subject<boolean>();

    public newOrder = {
      promotion_id: 0,
      price: 0,
      write_off: 0
    };

    constructor(private http: HttpService, private auth: AuthService) {
    }

    CreateClient(Obj, success?: (data) => void, fail?: (err) => void) {
      if (Obj && Obj['phone']) {
        Obj['phone'] = (Obj['phone']).replace(/ /g, '').replace(/\(/g, '').replace(/\)/g, '').replace(/\+/g, '');
      }
      this.http.CommonRequest(
          () => this.http.PostData('/clients', Obj),
          success,
          fail
      );
    }

    UpdateClient(Obj, success?: (data) => void, fail?: (err) => void) {
      if (Obj && Obj['phone']) {
        Obj['phone'] = (Obj['phone']).replace(/ /g, '').replace(/\(/g, '').replace(/\)/g, '').replace(/\+/g, '');
      }
      this.http.CommonRequest(
          () => this.http.PutData('/clients/' + Obj['id'], Obj),
          success,
          fail
      );
    }

    CheckClientByPhone(phone: string, success?: (data) => void, fail?: (err) => void) {
      phone = phone.replace(/ /g, '').replace(/\(/g, '').replace(/\)/g, '').replace(/\+/g, '').replace(/_/g, '');
      this.http.CommonRequest(
        () => this.http.GetData('/clients', 'phone=' + phone),
        (res: ClientModel[]) => {
          console.log(res);
            if (success && typeof success == 'function') {
                const countUsers = res.length;
                success(countUsers > 0 ? true : false);
            }
        },
        (err) => {
            if (fail && typeof fail == 'function') {
                fail(err);
            }
        }
      );
    }

    GetClient(params, success?: (data) => void, fail?: (err) => void) {
        let searchString = '';
        if (params['name']) {
          searchString += 'name=' + params['name'];
        }
        if (params['phone']) {
          if (searchString) {
            searchString += '&';
          }
          searchString = 'phone=' + params['phone'];
        }
        this.http.CommonRequest(
            () => this.http.GetData('/clients', searchString),
            (res: ClientModel[]) => {
                // if (res.length === 1) {
                //   this.Client = res[0];
                // } else {
                //   this.Client = new ClientModel();
                // }
                if (success && typeof success == 'function') {
                    success(res);
                }
            },
            (err) => {
                if (fail && typeof fail == 'function') {
                    fail(err);
                }
            }
        );
    }

    CreateOrderForLoyalty(user_id: number, price: number, write_off_points = 0,
      success?: (data) => void, fail?: (err) => void)
    {
      price = price * 100;
      const params = {user_id, price, write_off_points};
      if (write_off_points === 0) {
        delete params['write_off_points'];
      }
      this.http.CommonRequest(
          () => this.http.PostData('/orders/program', params),
          success,
          fail
      );
    }

    CreateOrderForPromotion(user_id: number, promotion_id: number, price: number, write_off_points = 0,
      success?: (data) => void, fail?: (err) => void)
    {
      price = price * 100;
      const params = {user_id, promotion_id, price, write_off_points};
      if (write_off_points === 0) {
        delete params['write_off_points'];
      }
      this.http.CommonRequest(
          () => this.http.PostData('/orders/promotion', params),
          success,
          fail
      );
    }
}
