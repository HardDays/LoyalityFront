import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable()
export class LoyaltyAccessGuard implements CanActivate{
    constructor(private auth: AuthService, private router: Router)
    {}
    canActivate(router:ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|boolean
    {
    //     let isLoginned = this.auth.IsLoggedIn;
    //     let myRole = this.auth.LoginData.user_type;

    //     if (isLoginned) {
    //       if (myRole === 'operator') {
    //         this.router.navigate(["/system/my_clients"]);
    //         return false;
    //       }
    //     } else {
    //       this.router.navigate(["/auth"]);
    //       return false;
    //     }
        return true;
    }
}
