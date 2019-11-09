import { EditClientComponent } from './edit/edit-client/edit-client.component';
import { EditSearchComponent } from './edit/edit-search/edit-search.component';
import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { ClientsAccessGuard } from './clients.guard';
import { ClientsStartComponent } from './start/start.component';
import { ClientsEditComponent } from './edit/edit.component';
import { ClientsCreateComponent } from './create/create.component';
import { CreateClientByPhoneComponent } from './create/create-client-by-phone/create-client-by-phone.component';
import { CreateClientByUserComponent } from './create/create-client-by-user/create-client-by-user.component';
import { EditLoyalityComponent } from './edit/edit-loyality/edit-loyality.component';
import { EditPaidComponent } from './edit/edit-paid/edit-paid.component';
import { CreateClientProfileComponent } from './create/create-client-profile/create-client-profile.component';
import { CreateClientConfirmPhoneComponent } from './create/create-client-confirm-phone/create-client-confirm-phone.component';
import { CreateClientFirstBuyComponent } from './create/create-client-first-buy/create-client-first-buy.component';

const routes: Routes = [
    { path: '', redirectTo: 'start', pathMatch: 'full'},
    { path: 'start', component: ClientsStartComponent, canActivate: [ClientsAccessGuard]},
    { path: 'create', component: ClientsCreateComponent, canActivate: [ClientsAccessGuard],
      children: [
        { path: '', redirectTo: 'profile'},
        { path: 'profile', component: CreateClientProfileComponent, canActivate: [ClientsAccessGuard]},
        { path: 'confirm', component: CreateClientConfirmPhoneComponent, canActivate: [ClientsAccessGuard]},
        { path: 'buy', component: CreateClientFirstBuyComponent, canActivate: [ClientsAccessGuard]}
      ]
    },
    { path: 'edit', component: ClientsEditComponent, canActivate: [ClientsAccessGuard],
    children: [
      { path: '', redirectTo: 'search'},
      { path: 'search', component: EditSearchComponent, canActivate: [ClientsAccessGuard]},
      { path: 'loyality', component: EditLoyalityComponent, canActivate: [ClientsAccessGuard]},
      { path: 'paid', component: EditPaidComponent, canActivate: [ClientsAccessGuard]},
      { path: 'client', component: EditClientComponent, canActivate: [ClientsAccessGuard]}
    ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
  ],
  providers: []
})
export class ClientsRoutingModule { }
