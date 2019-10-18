
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

    CreateOrder(Obj, success?: (data) => void, fail?: (err) => void) {
      this.http.CommonRequest(
          () => this.http.PostData('/orders', Obj),
          success,
          fail
      );
    }
}
