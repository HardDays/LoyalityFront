import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'auth-cmp',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit{
    constructor(private auth: AuthService, private cdr: ChangeDetectorRef) {

    }
    ngOnInit() {

    }
}
