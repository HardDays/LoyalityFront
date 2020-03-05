import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable()
export class BonusManagementAccessGuard implements CanActivate
{
  constructor(private auth: AuthService, private router: Router)
  { }

  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean
  {
    // if(router.data)
    // {
    //     if(router.data.auth)
    //     {
    //         if(router.data.auth != this.auth.IsLoggedIn)
    //         {
    //             this.router.navigate(["/auth"]);
    //             return false;
    //         }
    //     }
    // }

    // if(router.data.role)
    // {
    //     if(!this.auth.Me)
    //     {
    //         this.router.navigate(["/auth"]);
    //         return false;
    //     }
    //     else if(router.data.role != this.auth.Me.role)
    //     {
    //         this.router.navigate(["/auth"]);
    //         return false;
    //     }
    // }

    return true;
  }
}
