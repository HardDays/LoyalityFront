import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BonusManagementAccessGuard } from './bonus-management.guard'
import { BonusOverviewComponent } from './bonus-overview/bonus-overview.component'


const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: 'overview', component: BonusOverviewComponent, canActivate: [BonusManagementAccessGuard] },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
  ],
  providers: []
})
export class BonusManagementRoutingModule { }
