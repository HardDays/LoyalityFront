
import { TextMaskModule } from 'angular2-text-mask';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, ActivatedRouteSnapshot } from '@angular/router';
import { MyDatePickerModule } from 'mydatepicker';
import { ReportsComponent } from './reports.component';
import { ReportsRoutingModule } from './reports.routing';
import { ReportsService } from './reports.service';

@NgModule({
  declarations: [
      ReportsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    ReportsRoutingModule,
    ReactiveFormsModule,
    TextMaskModule,
    MyDatePickerModule
  ],
  providers: [ ReportsService ]
})
export class ReportsModule {}
