
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { StoreModel } from '../../core/models/store.model';
import { OperatorModel } from 'src/app/core/models/operator.model';
import { PromotionModel } from 'src/app/core/models/promotion.model';
import { LoyaltyModel, LoyaltyLevelModel } from 'src/app/core/models/loyalty.model';


@Injectable()
export class LoyaltyService {

    protected LoyaltyProgram: LoyaltyModel = new LoyaltyModel();
    // public LoyaltyLevels: LoyaltyLevelModel[] = [];
    public onLoyaltyChange$: Subject<boolean> = new Subject<boolean>();

    Promotions: PromotionModel[] = [];
    public onPromotionsChange$: Subject<boolean> = new Subject<boolean>();

    constructor(private http: HttpService, private auth:AuthService)
    {}


    RefreshLoyalty(success?: (data) => void, fail?: (err) => void)
    {
        // this.LoyaltyLevels = []
        this.http.CommonRequest(
            () => this.http.GetData('/loyalty_programs', ''),
            (res: LoyaltyModel) => {
                this.LoyaltyProgram = res;
                // this.LoyaltyLevels = JSON.parse(JSON.stringify(this.LoyaltyProgram.loyalty_levels));
                this.onLoyaltyChange$.next(true);
                // this.Promotions = res;
                // this.onPromotionsChange$.next(true);
                if(success && typeof success == "function")
                {
                    success(res);
                }
            },
            (err) => {
                this.onLoyaltyChange$.next(false);
                if(fail && typeof fail == "function")
                {
                    fail(err);
                }
            }
        )
    }

    GetLoyalty(): LoyaltyModel
    {
        return JSON.parse(JSON.stringify(this.LoyaltyProgram));
    }


    SaveLoyalty(data, success?: (data) => void, fail?: (err) => void)
    {
        const exists = this.IsLoyaltyValid();
        if(!exists)
        {
            data.loyalty_levels = [];
        }

        this.http.CommonRequest(
            () => exists ? this.http.PutData('/loyalty_programs/' + this.LoyaltyProgram.id, data) : this.http.PostData('/loyalty_programs', data),
            (res: LoyaltyModel) => {
                this.LoyaltyProgram = res;
                this.onLoyaltyChange$.next(true);
                if(success && typeof success == "function")
                {
                    success(res);
                }
            },
            (err) => {
                this.onLoyaltyChange$.next(false);
                if(fail && typeof fail == "function")
                {
                    fail(err);
                }
            }
        );
    }

    IsLoyaltyValid()
    {
        return this.LoyaltyProgram && this.LoyaltyProgram.id;
    }

    GetLevel(Id, success?: (data) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.GetData('/loyalty_levels/' + Id, ''),
            success,
            fail
        );
    }

    DeleteLevel(Id, success?: (data) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.DeleteData('/loyalty_levels/' + Id),
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