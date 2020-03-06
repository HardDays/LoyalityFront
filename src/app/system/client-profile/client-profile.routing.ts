import { ClientLoyaltyComponent } from './client-loyalty/client-loyalty.component';
import { ClientBonusesComponent } from './client-bonuses/client-bonuses.component';
import { ClientDataComponent } from './client-data/client-data.component';
import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { ClientProfileAccessGuard } from './client-profile.guard';


const routes: Routes = [
  { path: '', redirectTo: 'data', pathMatch: 'full' },
  { path: 'data', component: ClientDataComponent, canActivate: [ClientProfileAccessGuard] },
  { path: 'bonuses', component: ClientBonusesComponent, canActivate: [ClientProfileAccessGuard] },
  { path: 'loyalty', component: ClientLoyaltyComponent, canActivate: [ClientProfileAccessGuard] }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
  ],
  providers: []
})
export class ClientProfileRoutingModule { }
