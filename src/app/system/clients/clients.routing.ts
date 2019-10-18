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

const routes: Routes = [
    { path: '', redirectTo: 'start', pathMatch: 'full'},
    { path: 'start', component: ClientsStartComponent, canActivate: [ClientsAccessGuard]},
    { path: 'create', component: ClientsCreateComponent, canActivate: [ClientsAccessGuard],
      children: [
        { path: '', redirectTo: 'phone'},
        { path: 'phone', component: CreateClientByPhoneComponent, canActivate: [ClientsAccessGuard]},
        { path: 'user', component: CreateClientByUserComponent, canActivate: [ClientsAccessGuard]}
      ]
    },
    { path: 'edit', component: ClientsEditComponent, canActivate: [ClientsAccessGuard]},
    { path: 'edit/:id', component: ClientsEditComponent, canActivate: [ClientsAccessGuard]}

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
