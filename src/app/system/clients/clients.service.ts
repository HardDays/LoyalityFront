import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { StoreModel } from '../../core/models/store.model';
import { ClientModel } from 'src/app/core/models/client.model';
import { AbstractControl, AsyncValidatorFn, FormControl } from '@angular/forms';
import {switchMap, map} from 'rxjs/operators';
// import 'rxjs/add/operator/map';

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
      if (Obj && Obj['recommendator_phone']) {
        Obj['recommendator_phone'] = (Obj['recommendator_phone']).replace(/ /g, '').replace(/\(/g, '').replace(/\)/g, '').replace(/\+/g, '');
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

    CheckClientPhone(phone: string, success?: (data) => void, fail?: (err) => void) {
      phone = phone.replace(/ /g, '').replace(/\(/g, '').replace(/\)/g, '').replace(/\+/g, '').replace(/_/g, '');
      this.http.CommonRequest(
        () => this.http.GetData('/clients/phone', 'phone=' + phone),
        (res) => {
            if (success && typeof success == 'function') {
                success(res['status']);
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
        const arrParams = [];
        for (const key of Object.keys(params)) {
          if (params[key]) {
            searchString += arrParams.push(key + '=' + params[key]);
          }
        }
        searchString = arrParams.join('&');
        console.log(params, searchString);
        this.http.CommonRequest(
            () => this.http.GetData('/clients', searchString),
            (res: ClientModel[]) => {
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
      success?: (data) => void, fail?: (err) => void) {
      price = price * 100;
      write_off_points = write_off_points * 100;
      const params = {user_id, price, write_off_points};
      if (write_off_points === 0) {
        delete params['write_off_points'];
      }
      this.http.CommonRequest(
          () => this.http.PostData('/orders/loyalty_program', params),
          success,
          fail
      );
    }

    CreateOrderForPromotion(user_id: number, promotion_id: number, price: number, write_off_points = 0,
      success?: (data) => void, fail?: (err) => void) {
      price = price * 100;
      write_off_points = write_off_points * 100;
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

    GetLoyaltyPoints(user_id: number, price: number, success?: (data) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.GetData('/orders/loyalty_program/points', `user_id=${user_id}&price=${price*100}`),
            success,
            fail
        );
    }

    GetPromotionPoints(user_id: number, price: number, promotion_id: number, success?: (data) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.GetData('/orders/promotion/points', `promotion_id=${promotion_id}&user_id=${user_id}&price=${price*100}`),
            success,
            fail
        );
    }


    searchPhone(phone: string) {
      phone = phone.replace(/ /g, '').replace(/\(/g, '').replace(/\)/g, '').replace(/\+/g, '').replace(/_/g, '');
      return this.http.GetData('/clients/phone', 'phone=' + phone);
    }

    createValidatorPhone() {
      return (control: AbstractControl) => {
        if (control.value.indexOf('_') < 16 && control.value.indexOf('_') > -1) {
          return new Promise((resolve, reject)=>{
            resolve(
             { 'incorrect': true }
            )
          })
        }
        else {
          return this.searchPhone(control.value).pipe(map(res => {
            if (control.value.indexOf('_') > -1) {
                return { 'incorrect': true };
              }
            return res.json()['status'] ? { 'used': true } : null ;
          }));
        }
      }
    }

}
