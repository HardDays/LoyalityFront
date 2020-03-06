import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { BonusManagementRoutingModule } from './bonus-management.routing';
import { BonusManagementAccessGuard } from './bonus-management.guard';
import { BonusOverviewComponent } from './bonus-overview/bonus-overview.component'
import { BonusManagementService } from './bonus-management.service';
import { BonusChargeComponent } from './bonus-charge/bonus-charge.component'


@NgModule({
  declarations: [BonusOverviewComponent, BonusChargeComponent],
  imports: [
    CommonModule,
    HttpModule,
    CommonModule,
    RouterModule,
    BonusManagementRoutingModule
  ],
  providers: [BonusManagementService, BonusManagementAccessGuard],
})
export class BonusManagementModule { }
