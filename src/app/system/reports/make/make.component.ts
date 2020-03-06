import { Component, OnInit, OnDestroy, ChangeDetectorRef, HostListener, ElementRef } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { Button } from 'protractor';
import { AuthService } from 'src/app/core/services/auth.service';
import { MakeReportStateModel } from '../../../core/models/reports.model';


@Component({
  selector: 'app-make-report-cmp',
  templateUrl: './make.component.html'
})
export class MakeReportComponent implements OnInit {
  MakeReports: MakeReportStateModel[] = [
    new MakeReportStateModel("general", true),
    new MakeReportStateModel("clients", false),
    new MakeReportStateModel("orders", false),
    new MakeReportStateModel("sms", false)
  ];
  constructor(private auth: AuthService) {
  }

  ngOnInit(): void {
  }

  ChangeReportState($event: MakeReportStateModel) {
    if ($event.opened) {
      for (const i in this.MakeReports) {
        if (this.MakeReports[i].type != $event.type) {
          this.MakeReports[i].opened = false;
        }
      }
    }
  }

}
