
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { PromotionModel } from '../../core/models/promotion.model';
import { StoreModel } from '../../core/models/store.model';
import { OperatorModel } from 'src/app/core/models/operator.model';


@Injectable()
export class ReportsService {

    private Promotions: PromotionModel[] = [];
    public onPromotionsChange$: Subject<boolean> = new Subject<boolean>();

    private Stores: StoreModel[] = [];
    public onStoresChange$: Subject<boolean> = new Subject<boolean>();

    Operators: OperatorModel[] = [];
    public onOperatorsChange$: Subject<boolean> = new Subject<boolean>();

    constructor(private http: HttpService, private auth:AuthService)
    {}
    
    RefreshPromotions(success?: (data) => void, fail?: (err) => void)
    {
        this.Promotions = [];
        this.http.CommonRequest(
            () => this.http.GetData('/promotions', ''),
            (res: PromotionModel[]) => {
                this.Promotions = res;
                this.onPromotionsChange$.next(true);
                if(success && typeof success == "function")
                {
                    success(res);
                }
            },
            (err) => {
                this.onPromotionsChange$.next(false);
                if(fail && typeof fail == "function")
                {
                    fail(err);
                }
            }
        );
    }

    GetPromotions(): PromotionModel[]
    {
        return JSON.parse(JSON.stringify(this.Promotions));
    }

    RefreshStores(success?: (data) => void, fail?: (err) => void)
    {
        this.Stores = [];
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

    GetStores(): StoreModel[]
    {
        return JSON.parse(JSON.stringify(this.Stores));
    }

    RefreshOperators(success?: (data) => void, fail?: (err) => void)
    {
        this.Operators = [];
        this.http.CommonRequest(
            () => this.http.GetData('/operators', ''),
            (res: OperatorModel[]) => {
                this.Operators = res;
                this.onOperatorsChange$.next(true);
                if(success && typeof success == "function")
                {
                    success(res);
                }
            },
            (err) => {
                this.onOperatorsChange$.next(false);
                if(fail && typeof fail == "function")
                {
                    fail(err);
                }
            }
        );
    }
    GetOperators(): OperatorModel[]
    {
        return JSON.parse(JSON.stringify(this.Operators));
    }
}
