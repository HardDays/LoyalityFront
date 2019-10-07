
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { StoreModel } from '../../core/models/store.model';


@Injectable()
export class StoresService {

    Stores: StoreModel[] = [];
    public onStoresChange$: Subject<boolean> = new Subject<boolean>();

    constructor(private http: HttpService, private auth:AuthService)
    {
        
    }

    RefreshStores(success?: (data) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.GetData('/stores', ''),
            (res: StoreModel[]) => {
                this.Stores = res;
                this.onStoresChange$.next(true);
                if(success && typeof success == "function")
                {
                    success(res);
                }
            },
            (err) => {
                this.onStoresChange$.next(false);
                if(fail && typeof fail == "function")
                {
                    fail(err);
                }
            }
        );
    }

    GetStores()
    {
        return JSON.parse(JSON.stringify(this.Stores));
    }
}
