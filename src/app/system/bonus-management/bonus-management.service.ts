import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ClientModel } from 'src/app/core/models/client.model';


@Injectable()
export class BonusManagementService {

  public Client = new ClientModel();

  constructor(private http: HttpService, private auth: AuthService) {
  }

  GetClients(success?: (data) => void, fail?: (err) => void) {
    this.auth.onLoading.next(true);
    this.http.CommonRequest(
      () => this.http.GetData('/clients', ''),
      (res: ClientModel[]) => {
        const clients = this._parseClients(res);
        if (success && typeof success == 'function') {
          this.auth.onLoading.next(false);
          success(clients);
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

  AddPoints(data, success?: () => void, fail?: (err) => void) {
    this.auth.onLoading.next(true);
    this.http.CommonRequest(
      () => this.http.PostData(`/clients/${data.clientId}/points`, { points: data.points }),
      (res) => {
        if (success && typeof success == 'function') {
          this.auth.onLoading.next(false);
          success();
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

  RemovePoints(data, success?: () => void, fail?: (err) => void) {
    this.auth.onLoading.next(true);
    this.http.CommonRequest(
      () => this.http.DeleteDataWithBody(`/clients/${data.clientId}/points`, { points: data.points }),
      () => {
        if (success && typeof success == 'function') {
          this.auth.onLoading.next(false);
          success();
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

  _parseClients(data) {
    if (Array.isArray(data)) {
      return data.map(c => ({ ...c, ...c.client[0] }));
    }

    return []
  }
}
