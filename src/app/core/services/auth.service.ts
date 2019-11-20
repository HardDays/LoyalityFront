import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { LoginModel } from '../models/login.model';
import { HttpService } from './http.service';
import { LoginSuccessModel } from '../models/login.success.model';
import { CreatorModel } from '../models/creator.model';
import { CompanyModel } from '../models/company.model';


@Injectable()
export class AuthService
{
    protected login_field:string = "login_field";
    protected company_field:string = "company_field";

    public onAuthChange$: Subject<boolean> = new Subject<boolean>();
    public IsLoggedIn: boolean = false;
    public LoginData: LoginSuccessModel = new LoginSuccessModel();
    public CompanyData: CompanyModel = new CompanyModel();
    public onCompanyChange$: Subject<boolean> = new Subject<boolean>();

    public Creator: CreatorModel = new CreatorModel();



    constructor(public http: HttpService, private router: Router)
    {
        this.onAuthChange$.subscribe(val => {
            this.IsLoggedIn = val;
            if (this.LoginData.user_type == 'creator')
            {
                this.GetCompanyInfo();
            }

        });
        this.onAuthChange$.next(false);
        this.GetLoginDataFromLocal();
    }

    Login(data: LoginModel,  success?: (data) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.PostData('/auth/login', data),
            (res: LoginSuccessModel) => {
                this.InitSession(res);
                if(success && typeof success == "function")
                {
                    success(res);
                }
                // this.router.navigate(["/"]);
            },
            (err) => {
                if(fail && typeof fail == "function")
                {
                    fail(err);
                }
            }
        );
    }

    CreateCreator(data: CreatorModel,  success?: (data) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.PostData('/creators', data),
            (res: LoginSuccessModel) => {
                this.Creator = data;
                // this.InitSession(res);
                if(success && typeof success == "function")
                {
                    success(res);
                }
            },
            (err) => {
                if(fail && typeof fail == "function")
                {
                    fail(err);
                }
            }
        );
    }

    Logout()
    {
        localStorage.removeItem(this.login_field);
        localStorage.removeItem(this.company_field);
        this.LoginData = new LoginSuccessModel();
        this.CompanyData = new CompanyModel();
        this.http.DeleteAuthToken();
        this.onAuthChange$.next(false);
        this.onCompanyChange$.next(false);

        this.router.navigate(["/auth"]);
    }

    InitSession(data:LoginSuccessModel)
    {
        localStorage.setItem(this.login_field ,JSON.stringify(data));
        this.http.BaseInitByToken(data.token);
        this.LoginData = data;
        // TODO: DELETE THIS LINE or LOGIN AS CLIENT
        // this.LoginData.user_type = 'client';
        this.onAuthChange$.next(true);
    }

    GetCompanyInfo(success?: (data) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.GetData('/companies', ''),
            (res: CompanyModel) => {
                if(res)
                {
                    this.CompanyData = res;
                    localStorage.setItem(this.company_field ,JSON.stringify(res));
                    this.onCompanyChange$.next(true);
                    if(success && typeof success == "function")
                    {
                        success(res);
                    }
                }
                else{
                    this.router.navigate(["/system", "company"])
                }

            },
            (err) => {
                this.onCompanyChange$.next(false);
                if(fail && typeof fail == "function")
                {
                    fail(err);
                }
            }
        );
    }

    GetLoginDataFromLocal()
    {
        const data = localStorage.getItem(this.login_field);
        if(data)
        {
            this.InitSession(JSON.parse(data));
        }
    }

    Confirm(data: any,  success?: (data) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.PostData('/auth/confirm', data),
            (res: LoginSuccessModel) => {
                this.InitSession(res);
                if(success && typeof success == "function")
                {
                    success(res);
                }
            },
            (err) => {
                if(fail && typeof fail == "function")
                {
                    fail(err);
                }
            }
        );
    }

    CreateCompany(data: any,  success?: (data) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.PostData('/companies', data),
            (res: CompanyModel) => {
                if(res)
                {
                    this.CompanyData = res;
                    localStorage.setItem(this.company_field ,JSON.stringify(res));
                    this.onCompanyChange$.next(true);
                    if(success && typeof success == "function")
                    {
                        success(res);
                    }
                }
                else{
                    this.onCompanyChange$.next(false);
                    if(fail && typeof fail == "function")
                    {
                        fail(null);
                    }
                }

            },
            (err) => {
                this.onCompanyChange$.next(false);
                if(fail && typeof fail == "function")
                {
                    fail(err);
                }
            }
        );
    }

    UpdateCompany(data: any, success?: (data) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.PutData('/companies', data),
            (res: CompanyModel) => {
                if(res)
                {
                    this.CompanyData = res;
                    localStorage.setItem(this.company_field ,JSON.stringify(res));
                    this.onCompanyChange$.next(true);
                    if(success && typeof success == "function")
                    {
                        success(res);
                    }
                }
                else{
                    this.onCompanyChange$.next(false);
                    if(fail && typeof fail == "function")
                    {
                        fail(null);
                    }
                }

            },
            (err) => {
                this.onCompanyChange$.next(false);
                if(fail && typeof fail == "function")
                {
                    fail(err);
                }
            }
        );
    }

    UpdateProfile(data: any,  success?: (data) => void, fail?: (err) => void)
    {
        this.http.CommonRequest(
            () => this.http.PutData('/creators/profile', data),
            (res: any) => {
                if(res)
                {
                    for(const i in res)
                    {
                        if(res[i])
                        {
                            this.LoginData[i] = res[i];
                        }

                        this.InitSession(this.LoginData);
                    }
                    if(success && typeof success == "function")
                    {
                        success(res);
                    }
                }
                else{
                    this.onAuthChange$.next(false);
                    if(fail && typeof fail == "function")
                    {
                        fail(null);
                    }
                }

            },
            (err) => {
                this.onAuthChange$.next(false);
                if(fail && typeof fail == "function")
                {
                    fail(err);
                }
            }
        );
    }

    RequestPassword(email: string, success?: (data) => void, fail?: (err) => void) {
        this.http.CommonRequest(
            () => this.http.PostData('/auth/password/request', {email}),
            (res) => {
                if(res)
                {
                    if(success && typeof success == "function")
                    {
                        success(res);
                    }
                }
            },
            (err) => {
                if(fail && typeof fail == "function")
                {
                    fail(err);
                }
            }
        );
    }
}
