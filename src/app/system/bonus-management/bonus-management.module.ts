import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { BonusManagementRoutingModule } from './bonus-management.routing';
import { BonusManagementAccessGuard } from './bonus-management.guard';
import { BonusOverviewComponent } from './bonus-overview/bonus-overview.component'
import { BonusManagementService } from './bonus-management.service'


@NgModule({
  declarations: [BonusOverviewComponent],
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
