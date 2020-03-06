import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MyDatePickerModule } from 'mydatepicker';
import { LoyaltyEditComponent } from './edit.component';
import { LoyaltyEditRoutingModule } from './edit.routing';

@NgModule({
  declarations: [
    LoyaltyEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    LoyaltyEditRoutingModule,
    MyDatePickerModule
  ],
  providers: [ ]
})
export class LoyaltyEditModule {}
