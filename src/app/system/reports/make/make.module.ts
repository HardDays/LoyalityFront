import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MakeReportComponent } from './make.component';
import { MakeReportRoutingModule } from './make.routing';
import { MakeGeneralReportComponent } from './general/general.component';
import { SelectDirective } from './general/select.directive';
import { MyDatePickerModule } from 'mydatepicker';

@NgModule({
  declarations: [
    MakeReportComponent,
    MakeGeneralReportComponent,
    SelectDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MakeReportRoutingModule,
    MyDatePickerModule
  ],
  providers: [ ]
})
export class MakeReportModule {}