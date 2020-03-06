import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { PromotionEditComponent } from './edit.component';
import { PromotionEditRoutingModule } from './edit.routing';
import { MyDatePickerModule } from 'mydatepicker';

@NgModule({
  declarations: [
    PromotionEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    PromotionEditRoutingModule,
    MyDatePickerModule
  ],
  providers: []
})
export class PromotionEditModule { }
