import { ClientLoyaltyComponent } from './client-loyalty/client-loyalty.component';
import { ClientBonusesComponent } from './client-bonuses/client-bonuses.component';
import { ClientDataComponent } from './client-data/client-data.component';
import { LoyaltyProgramsService } from './../promotions/loyalty.service';
import { TextMaskModule } from 'angular2-text-mask';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, ActivatedRouteSnapshot } from '@angular/router';
import { MyDatePickerModule } from 'mydatepicker';
import { PromotionsService } from '../promotions/promotions.service';

import { PipesModule } from './../../core/pipes/pipes.module';
import { ClientProfileAccessGuard } from './client-profile.guard';
import { ClientProfileService } from './client-profile.service';
import { ClientProfileComponent } from './client-profile.component';
import { ClientProfileRoutingModule } from './client-profile.routing';

@NgModule({
  declarations: [
    ClientProfileComponent,
    ClientDataComponent,
    ClientBonusesComponent,
    ClientLoyaltyComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    ClientProfileRoutingModule,
    ReactiveFormsModule,
    TextMaskModule,
    MyDatePickerModule,
    PipesModule
  ],
  providers: [ ClientProfileAccessGuard, ClientProfileService]
})
export class ClientProfileModule {}
