import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { ReportComponent } from './report.component';

const routes: Routes =
  [
    {
      path: ':id', component: ReportComponent
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
export class ReportRoutingModule { }
