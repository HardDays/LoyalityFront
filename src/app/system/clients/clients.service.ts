
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { StoreModel } from '../../core/models/store.model';


@Injectable()
export class ClientsService {

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

    GetStoreById(Id): StoreModel
    {
        const store = this.Stores.find((obj) => obj.id == Id);

        return store ? JSON.parse(JSON.stringify(store)) : null;
    }

    GetOperators(StoreId, success?: (data) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.GetData('/operators?store_id=' + StoreId, ''),
            success,
            fail
        );
    }

    CreateStore(Obj, success?: (data) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.PostData('/stores', Obj),
            success,
            fail
        );
    }

    PutStore(Id, Obj, success?: (data) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.PutData('/stores/' + Id, Obj),
            success,
            fail
        );
    }

    GetStore(Id, success?: (data) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.GetData('/stores/' + Id),
            success,
            fail
        );
    }

    DeleteStore(Id, success?: (data) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.DeleteData('/stores/' + Id),
            success,
            fail
        );
    }
    DeleteOperator(Id, success?: (data) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.DeleteData('/operators/' + Id),
            success,
            fail
        );
    }
}