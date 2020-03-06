import { Component, OnInit, OnDestroy, ChangeDetectorRef, HostListener, ElementRef } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { Button } from 'protractor';
import { AuthService } from 'src/app/core/services/auth.service';
import { ReportsService } from './reports.service';


@Component({
  selector: 'app-reports-cmp',
  templateUrl: './reports.component.html'
})
export class ReportsComponent implements OnInit {
  constructor(private auth: AuthService, private service: ReportsService) {

  }

  ngOnInit(): void {
    this.service.RefreshOperators();
    this.service.RefreshPromotions();
    this.service.RefreshStores();
  }
}
