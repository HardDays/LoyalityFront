
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { PromotionModel } from '../../core/models/promotion.model';
import { StoreModel } from '../../core/models/store.model';
import { OperatorModel } from 'src/app/core/models/operator.model';
import { LoyaltyModel } from 'src/app/core/models/loyalty.model';


@Injectable()
export class ReportsService {

    private Promotions: any[] = [];
    public onPromotionsChange$: Subject<boolean> = new Subject<boolean>();

    private Stores: any[] = [];
    public onStoresChange$: Subject<boolean> = new Subject<boolean>();

    Operators: any[] = [];
    public onOperatorsChange$: Subject<boolean> = new Subject<boolean>();

    constructor(private http: HttpService, private auth:AuthService)
    {}
    
    RefreshPromotions(success?: (data) => void, fail?: (err) => void)
    {
        this.Promotions = [];
        this.http.CommonRequest(
            () => this.http.GetData('/promotions', ''),
            (res: PromotionModel[]) => {
                for(const item of res)
                {
                    
                    let model = {
                        id: item.id,
                        name: item.name,
                        loyalty: 0
                    };

                    const index = this.Promotions.findIndex(obj => obj.id == model.id && obj.loyalty == 0);

                    if(index < 0)
                    {
                        this.Promotions.push(model);
                    }
                    else
                    {
                        this.Promotions[index] = model;
                    }
                }
                this.http.CommonRequest(
                    () => this.http.GetData('/loyalty_programs', ''),
                    (res: LoyaltyModel) => {
                        if(res)
                        {
                            let model = {
                                id: res.id,
                                name: res.name,
                                loyalty: 1
                            };
        
                            const index = this.Promotions.findIndex(obj => obj.id == model.id && obj.loyalty == 1);
        
                            if(index < 0)
                            {
                                this.Promotions.push(model);
                            }
                            else
                            {
                                this.Promotions[index] = model;
                            }
                        }
                        this.onPromotionsChange$.next(true);
                        if(success && typeof success == "function")
                        {
                            success(res);
                        }
                    },
                    (err) => {
                        this.onPromotionsChange$.next(false);
                        this.auth.ErrorHandler(err, fail);
                    }
                );
                
            },
            (err) => {
                this.onPromotionsChange$.next(false);
                this.auth.ErrorHandler(err, fail);
            }
        );
    }

    GetPromotions(): any[]
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
                this.auth.ErrorHandler(err, fail);
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
                this.auth.ErrorHandler(err, fail);
            }
        );
    }
    GetOperators(): OperatorModel[]
    {
        return JSON.parse(JSON.stringify(this.Operators));
    }

    GetReport(type: string, data: any, success?: (data) => void, fail?: (err) => void)
    {
        this.auth.onLoading.next(true);
        this.http.CommonRequest(
            () => this.http.GetData("/reports/" + type, this.ParseObjectToQueryString(data)),
            res => {
                if(success && typeof success == "function")
                {
                    success(res);
                }
                this.auth.onLoading.next(false);
            },
            err => {
                this.auth.ErrorHandler(err, fail);
                this.auth.onLoading.next(false);
            }
        );
    }

    ParseObjectToQueryString(params)
    {
        const options = new URLSearchParams();
        // tslint:disable-next-line: forin
        for (const key in params) {
            const prop: any = params[key];
            if (prop) {
                if ( prop instanceof Array) {
                    for (const i in prop) {
                        if (prop[i]) {
                            options.append(key + "[]", prop[i]);
                        }
                    }
                } else {
                    options.set(key, params[key]);
                }
            }
        }
        // console.log(options.toString());
        return options.toString();
    }
}
