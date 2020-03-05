import { AuthService } from './../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { IMenuItem } from '../../core/interfaces/menu.item.interface';
import { DomSanitizer } from '@angular/platform-browser';
import { LoginSuccessModel } from '../../core/models/login.success.model';

export enum MenuUrls
{
    my_stores = 'my_stores',
    my_promotions = 'my_promotions',
    my_reports = 'reports',
    my_cashiers = 'my_cashiers',
    sms_sending = 'sms_sending',
    rates = 'rates',
    my_loyalty_program = 'my_loyalty_program',
    my_profile_data = 'client_profile/data',
    my_profile_bonuses = 'client_profile/bonuses',
    my_profile_loyalty = 'client_profile/loyalty',
    bonus_management = 'bonus_management/overview'
}

@Component({
    selector: 'navigation-cmp',
    templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit
{
    IsLoggedIn: boolean = false;
    CurrentPage = "";
    MenuItems: IMenuItem[] = [];
    Me: LoginSuccessModel = new LoginSuccessModel();
    constructor(private router: Router, private auth: AuthService, private sanitizer: DomSanitizer)
    {
        // this.UpdateCredentialsAndMenu();
        this.router.events.subscribe((event) =>
        {
            if (event instanceof NavigationEnd)
            {
                for (const item of this.MenuItems)
                {
                    if (event.url.indexOf(item.url) > -1)
                    {
                        this.CurrentPage = item.url;
                    }
                }
            }
        });
        this.auth.onAuthChange$.subscribe(
            (val) =>
            {
                this.UpdateCredentialsAndMenu();
            }
        );
    }

    ngOnInit()
    {
        this.UpdateCredentialsAndMenu();
    }

    UpdateCredentialsAndMenu()
    {
        this.Me = this.auth.LoginData;
        this.IsLoggedIn = this.auth.IsLoggedIn;
        this.UpdateMenuItems();
    }

    UpdateMenuItems()
    {
        this.MenuItems = [
            {
                url: MenuUrls.my_promotions,
                image: "assets/img/menu1.svg",
                label: "Акции",
                visible: this.IsLoggedIn && this.Me.user_type === 'creator'
            },
            {
                url: MenuUrls.my_reports,
                image: "assets/img/menu2.svg",
                label: "Отчеты",
                visible: this.IsLoggedIn && this.Me.user_type === 'creator'
            },
            {
                url: MenuUrls.my_stores,
                image: "assets/img/menu3.svg",
                label: "Мои магазины",
                visible: this.IsLoggedIn && this.Me.user_type === 'creator'
            },
            {
                url: MenuUrls.my_cashiers,
                image: "assets/img/menu4.svg",
                label: "Кассиры",
                visible: this.IsLoggedIn && this.Me.user_type === 'creator'
            },
            // {
            //     url : MenuUrls.sms_sending,
            //     image : "assets/img/menu5.svg",
            //     label : "СМС-рассылки",
            //     visible: this.IsLoggedIn && this.Me.user_type === 'creator'
            // },
            {
                url: MenuUrls.rates,
                image: "assets/img/menu6.svg",
                label: "Тарифы",
                visible: this.IsLoggedIn && this.Me.user_type === 'creator'
            },
            {
                url: MenuUrls.my_loyalty_program,
                image: "assets/img/menu7.svg",
                label: "Программа лояльности",
                visible: this.IsLoggedIn && this.Me.user_type === 'creator'
            },
            {
                url: MenuUrls.bonus_management,
                image: "assets/img/menu-bonuses.svg",
                label: "Начисление и списание бонусов",
                visible: this.IsLoggedIn && this.Me.user_type === 'creator'
            },
            {
                url: MenuUrls.my_profile_data,
                image: "assets/img/menu-lk1.svg",
                label: "Мои данные",
                visible: this.IsLoggedIn && this.Me.user_type === 'client'
            },
            {
                url: MenuUrls.my_profile_bonuses,
                image: "assets/img/menu-lk2.svg",
                label: "Мои бонусы",
                visible: this.IsLoggedIn && this.Me.user_type === 'client'
            },
            {
                url: MenuUrls.my_profile_loyalty,
                image: "assets/img/menu-lk3.svg",
                label: "Программа лояльности",
                visible: this.IsLoggedIn && this.Me.user_type === 'client'
            }
        ];
    }

    OpenLink(item)
    {
        const url = this.sanitizer.bypassSecurityTrustResourceUrl(item.url);
        window.open(item.url, "_blank");
    }
}
