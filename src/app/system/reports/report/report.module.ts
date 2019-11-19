import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MyDatePickerModule } from 'mydatepicker';
import { ReportComponent } from './report.component';
import { ReportRoutingModule } from './report.routing';

@NgModule({
  declarations: [
    ReportComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ReportRoutingModule,
    MyDatePickerModule
  ],
  providers: [ DatePipe ]
})
export class ReportModule {}