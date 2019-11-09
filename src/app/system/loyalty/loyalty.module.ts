
import { TextMaskModule } from 'angular2-text-mask';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, ActivatedRouteSnapshot } from '@angular/router';
import { MyDatePickerModule } from 'mydatepicker';
import { LoyaltyComponent } from './loyalty.component';
import { LoyaltyRoutingModule } from './loyalty.routing';
import { LoyaltyAccessGuard } from './loyalty.guard';
import { LoyaltyService } from './loyalty.service';

@NgModule({
  declarations: [
      LoyaltyComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    LoyaltyRoutingModule,
    ReactiveFormsModule,
    TextMaskModule,
    MyDatePickerModule
  ],
  providers: [ LoyaltyAccessGuard, LoyaltyService]
})
export class PromotionsModule {}
