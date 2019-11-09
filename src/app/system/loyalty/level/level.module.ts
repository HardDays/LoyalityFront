import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MyDatePickerModule } from 'mydatepicker';
import { LoyaltyLevelComponent } from './level.component';
import { LoyaltyLevelRoutingModule } from './level.routing';

@NgModule({
  declarations: [
    LoyaltyLevelComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    LoyaltyLevelRoutingModule,
    MyDatePickerModule
  ],
  providers: [ ]
})
export class LoyaltyLevelModule {}