import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { ReportsComponent } from './reports.component';
import { ReportsAccessGuard } from './reports.guard';


const routes: Routes =
[
  {
    path: '', component: ReportsComponent, children:[
      { path: '', redirectTo: 'make', pathMatch: 'full'},
      { path: 'make', loadChildren: 'src/app/system/reports/make/make.module#MakeReportModule', canActivate: [ReportsAccessGuard]},
      { path: 'get', loadChildren: 'src/app/system/reports/report/report.module#ReportModule', canActivate: [ReportsAccessGuard]}
    //   { path: 'level', loadChildren: 'src/app/system/loyalty/level/level.module#LoyaltyLevelModule'}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
  ],
  providers: []
})
export class ReportsRoutingModule { }
