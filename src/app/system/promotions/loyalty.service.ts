
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { StoreModel } from '../../core/models/store.model';
import { OperatorModel } from 'src/app/core/models/operator.model';
import { PromotionModel } from '../../core/models/promotion.model';


@Injectable()
export class LoyaltyProgramsService {

    constructor(private http: HttpService, private auth:AuthService)
    {}

    GetLoyalty(Id, success?: (data) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.GetData('/loyalty_programs/' + Id, ''),
            success,
            fail
        );
    }

}
