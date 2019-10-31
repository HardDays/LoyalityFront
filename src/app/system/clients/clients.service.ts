
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

    constructor(private http: HttpService, private auth: AuthService) {
    }

    CreateClient(Obj, success?: (data) => void, fail?: (err) => void) {
      if (Obj && Obj['phone']) {
        Obj['phone'] = (Obj['phone']).replace(/ /g, '').replace(/\(/g, '').replace(/\)/g, '');
      }
      this.http.CommonRequest(
          () => this.http.PostData('/clients', Obj),
          success,
          fail
      );
    }

    GetClient(params, success?: (data) => void, fail?: (err) => void)
    {
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
                if (res.length === 1) {
                  this.Client = res[0];
                } else {
                  this.Client = new ClientModel();
                }
                if(success && typeof success == "function")
                {
                    success(res);
                }
            },
            (err) => {
                if(fail && typeof fail == "function")
                {
                    fail(err);
                }
            }
        );
    }

    CreateOrder(Obj, success?: (data) => void, fail?: (err) => void) {
      this.http.CommonRequest(
          () => this.http.PostData('/orders', Obj),
          success,
          fail
      );
    }
}
