
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
// import {Location} from '@angular/common';
import { ReportsAccessGuard } from './reports.guard';

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
  providers: [ReportsService, ReportsAccessGuard],
  // bootstrap: [ Location ]
})
export class ReportsModule { }
