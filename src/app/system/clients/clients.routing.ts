import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { ClientsAccessGuard } from './clients.guard';
import { ClientsStartComponent } from './start/start.component';
import { ClientsEditComponent } from './edit/edit.component';
import { ClientsCreateComponent } from './create/create.component';

const routes: Routes = [
    { path: '', redirectTo: 'start', pathMatch: 'full'},
    { path: 'start', component: ClientsStartComponent, canActivate:[ClientsAccessGuard]},
    { path: 'edit/:id', component: ClientsEditComponent,canActivate:[ClientsAccessGuard]},
    {
        path: 'create', component: ClientsCreateComponent,canActivate:[ClientsAccessGuard]
    }
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
