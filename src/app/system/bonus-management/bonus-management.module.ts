import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { BonusManagementRoutingModule } from './bonus-management.routing';
import { BonusManagementAccessGuard } from './bonus-management.guard';
import { BonusOverviewComponent } from './bonus-overview/bonus-overview.component'
import { BonusManagementService } from './bonus-management.service';
import { BonusChargeComponent } from './bonus-charge/bonus-charge.component'
import { BonusManagementComponent } from './bonus-management.component';
import { BonusStateService } from './bonus-state.service';

@NgModule({
  declarations: [BonusManagementComponent, BonusOverviewComponent, BonusChargeComponent],
  imports: [
    CommonModule,
    HttpModule,
    CommonModule,
    RouterModule,
    FormsModule,
    BonusManagementRoutingModule
  ],
  providers: [BonusManagementService, BonusStateService, BonusManagementAccessGuard],
})
export class BonusManagementModule { }
