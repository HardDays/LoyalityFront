import { TextMaskModule } from 'angular2-text-mask';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, ActivatedRouteSnapshot } from '@angular/router';
import { MyDatePickerModule } from 'mydatepicker';
import { PromotionsComponent } from './promotions.component';
import { PromotionsListComponent } from './list/list.component';
import { PromotionEditComponent } from './edit/edit.component';
import { PromotionsRoutingModule } from './promotions.routing';
import { PromotionsAccessGuard } from './promotions.guard';
import { PromotionsService } from './promotions.service';

@NgModule({
  declarations: [
      PromotionsComponent,
      PromotionsListComponent,
      PromotionEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    PromotionsRoutingModule,
    ReactiveFormsModule,
    TextMaskModule,
    MyDatePickerModule
  ],
  providers: [ PromotionsAccessGuard, PromotionsService]
})
export class PromotionsModule {}
