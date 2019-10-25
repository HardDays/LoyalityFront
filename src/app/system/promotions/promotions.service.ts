
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { StoreModel } from '../../core/models/store.model';
import { OperatorModel } from 'src/app/core/models/operator.model';
import { PromotionModel } from '../../core/models/promotion.model';


@Injectable()
export class PromotionsService {

    Promotions: PromotionModel[] = [];
    public onPromotionsChange$: Subject<boolean> = new Subject<boolean>();

    constructor(private http: HttpService, private auth:AuthService)
    {}

    RefreshPromotions(success?: (data) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.GetData('/promotions', ''),
            (res: PromotionModel[]) => {
                // console.log(res);
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

    GetPromotions()
    {
        return JSON.parse(JSON.stringify(this.Promotions));
    }

    GetPromotion(Id, success?: (data) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.GetData('/promotions/' + Id, ''),
            success,
            fail
        );
    }

    DeletePromotion(Id, success?: (data) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.DeleteData('/promotions/' + Id),
            success,
            fail
        );
    }

    CreatePromotion(Obj, success?: (data) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.PostData('/promotions', Obj),
            success,
            fail
        );
    }

    PutPromotion(Id, Obj, success?: (data) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.PutData('/promotions/' + Id, Obj),
            success,
            fail
        );
    }
}
