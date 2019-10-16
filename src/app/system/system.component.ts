import { Component, OnInit, OnDestroy, ChangeDetectorRef, HostListener, ElementRef } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { Subscription } from 'rxjs';
import { Button } from 'protractor';
import { LoginSuccessModel } from '../core/models/login.success.model';
import { CompanyModel } from '../core/models/company.model';


@Component({
  selector: 'system-cmp',
  templateUrl: './system.component.html'
})
export class SystemComponent implements OnInit
{
    IsLoggedIn = false;
    Me: LoginSuccessModel = new LoginSuccessModel();
    Company: CompanyModel = new CompanyModel();
    Initials = "";
    Hovered = false;
    constructor(private auth: AuthService)
    {
        this.IsLoggedIn = this.auth.IsLoggedIn;
        this.OnLoginChange();
        this.auth.onAuthChange$.subscribe(
            (val) => {
                this.OnLoginChange();
            }
        )

        this.auth.onCompanyChange$.subscribe(
            (val) => {
                this.Company = this.auth.CompanyData;
            }
        )
    }

    ngOnInit(): void 
    {
        this.OnLoginChange();
        this.Company = this.auth.CompanyData;
    }

    ShowMenu()
    {
        this.Hovered = true;
    }
    HideMenu()
    {
        this.Hovered = false;
    }

    Logout()
    {
        this.auth.Logout();
    }

    OnLoginChange()
    {
        this.Me = this.auth.LoginData;
        this.IsLoggedIn = this.auth.IsLoggedIn;

        this.Initials = (this.Me.last_name ? this.Me.last_name[0].toUpperCase() : '') + (this.Me.first_name ? this.Me.first_name[0].toUpperCase() : ''); 
    }
    
}
