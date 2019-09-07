import { Component, OnInit, OnDestroy, ChangeDetectorRef, HostListener, ElementRef } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { Subscription } from 'rxjs';
import { Button } from 'protractor';


@Component({
  selector: 'system-cmp',
  templateUrl: './system.component.html'
})
export class SystemComponent implements OnInit
{
    IsLoggedIn = false;

    constructor(private auth: AuthService)
    {
        this.IsLoggedIn = this.auth.IsLoggedIn;
        this.OnLoginChange();
        this.auth.onAuthChange$.subscribe(
            (val) => {
                this.IsLoggedIn = val;
                this.OnLoginChange();
            }
        )
    }

    ngOnInit(): void {
        // throw new Error("Method not implemented.");
    }

    OnLoginChange()
    {

    }
    
}
