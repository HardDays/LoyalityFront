import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ClientModel } from 'src/app/core/models/client.model';


@Injectable()
export class BonusManagementService
{

  public Client = new ClientModel();

  constructor(private http: HttpService, private auth: AuthService)
  {
  }

  GetClients(success?: (data) => void, fail?: (err) => void)
  {
    this.auth.onLoading.next(true);
    console.log(this.auth.LoginData)
    this.http.CommonRequest(
      () => this.http.GetData('/clients'),
      (res: ClientModel[]) =>
      {
        if (success && typeof success == 'function')
        {
          this.auth.onLoading.next(false);
          success(res);
        }
      },
      (err) =>
      {
        if (fail && typeof fail == 'function')
        {
          this.auth.onLoading.next(false);
          fail(err);
        }
      }
    );
  }
}
