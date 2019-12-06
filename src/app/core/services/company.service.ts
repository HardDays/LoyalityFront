import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { LoginModel } from '../models/login.model';
import { HttpService } from './http.service';
import { LoginSuccessModel } from '../models/login.success.model';
import { CreatorModel } from '../models/creator.model';
import { AuthService } from './auth.service';


@Injectable()
export class CompanyService
{
    constructor(public http: HttpService, private router: Router, private auth: AuthService) 
    {
    }

    CreateCompany(data: any,  success?: (data) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.PostData('/companies', data),
            (res) => {
                if(success && typeof success == "function")
                {
                    success(res);
                }
            },
            (err) => {
                this.auth.ErrorHandler(err, fail);
            }
        );
    }
}