
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
    {
        this.RefreshLoyalty();
    }


    RefreshLoyalty(success?: (data) => void, fail?: (err) => void)
    {
        this.auth.onLoading.next(true);
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
                this.auth.onLoading.next(false);
            },
            (err) => {
                this.onLoyaltyChange$.next(false);
                this.auth.ErrorHandler(err, fail)
                this.auth.onLoading.next(false);
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
                this.auth.ErrorHandler(err, fail)
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
            err => this.auth.ErrorHandler(err, fail)
        );
    }

    DeleteLevel(Id, success?: (data) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.DeleteData('/loyalty_levels/' + Id),
            success,
            err => this.auth.ErrorHandler(err, fail)
        );
    }

    CreateLevel(Obj: LoyaltyLevelModel, success?: (data) => void, fail?: (err) => void)
    {
        Obj.loyalty_program_id = this.LoyaltyProgram.id;
        this.http.CommonRequest(
            () => this.http.PostData('/loyalty_levels', Obj),
            success,
            err => this.auth.ErrorHandler(err, fail)
        );
    }

    PutLevel(Id, Obj, success?: (data) => void, fail?: (err) => void)
    {
        Obj.loyalty_program_id = this.LoyaltyProgram.id;
        this.http.CommonRequest(
            () => this.http.PutData('/loyalty_levels/' + Id, Obj),
            success,
            err => this.auth.ErrorHandler(err, fail)
        );
    }

}
