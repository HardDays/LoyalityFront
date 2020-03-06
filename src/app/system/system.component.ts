import { Component, OnInit, OnDestroy, ChangeDetectorRef, HostListener, ElementRef } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
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
    IsMenuShown: boolean = true;
    Me: LoginSuccessModel = new LoginSuccessModel();
    Company: CompanyModel = new CompanyModel();
    Initials = "";
    Hovered = false;
    UserTypeText = "";
    constructor(private auth: AuthService, private router: Router)
    {
        this.IsLoggedIn = this.auth.IsLoggedIn;
        this.OnLoginChange();
        this.auth.onAuthChange$.subscribe(
            (val) =>
            {
                this.OnLoginChange();
            }
        )

        this.auth.onCompanyChange$.subscribe(
            (val) =>
            {

                this.Company = this.auth.CompanyData;
            }
        )

        this.router.events.subscribe((event) =>
        {
            if (event instanceof NavigationEnd)
            {
                if (!this.IsMenuShown) this.ShowSystemNavigationMenu();
                if (event.url.includes("bonus_management/edit/")) this.HideSystemNavigationMenu();
            }
        });

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

        this.GetUserTypeText();
    }

    GetUserTypeText()
    {
        this.UserTypeText = "";
        if (this.Me.user_type === "operator")
        {
            this.UserTypeText = "Кассир";
        }
        else if (this.Me.user_type === "client")
        {
            this.UserTypeText = "Покупатель";
        }
    }

    HideSystemNavigationMenu()
    {
        this.IsMenuShown = false;
    }

    ShowSystemNavigationMenu()
    {
        this.IsMenuShown = true;
    }


}
