import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { LoginModel } from '../models/login.model';
import { HttpService } from './http.service';
import { LoginSuccessModel } from '../models/login.success.model';
import { CreatorModel } from '../models/creator.model';


@Injectable()
export class AuthService
{
    protected login_field:string = "login_field";

    public onAuthChange$: Subject<boolean> = new Subject<boolean>();
    public IsLoggedIn: boolean = false;
    public LoginData: LoginSuccessModel = new LoginSuccessModel();

    constructor(public http: HttpService, private router: Router) 
    {
        this.onAuthChange$.subscribe(val => this.IsLoggedIn = val);
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

    Logout()
    {
        localStorage.removeItem(this.login_field);
        this.LoginData = new LoginSuccessModel();
        this.http.DeleteAuthToken();
        this.onAuthChange$.next(false);
    }

    InitSession(data:LoginSuccessModel)
    {
        localStorage.setItem(this.login_field ,JSON.stringify(data));
        this.http.BaseInitByToken(data.token);
        this.LoginData = data;
        this.onAuthChange$.next(true);
    }

    GetLoginDataFromLocal()
    {
        const data = localStorage.getItem(this.login_field);
        if(data)
        {
            this.InitSession(JSON.parse(data));
        }
    }
}