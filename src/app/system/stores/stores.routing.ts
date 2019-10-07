import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { StoreAccessGuard } from './store.guard';
import { StoreListComponent } from './list/list.component';
import { StoreEditComponent } from './edit/edit.component';
import { StoreCreateComponent } from './create/create.component';

const routes: Routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full'},
    { path: 'list', component: StoreListComponent, canActivate:[StoreAccessGuard]},
    { path: 'edit/:id', component: StoreEditComponent,canActivate:[StoreAccessGuard]},
    {
        path: 'create', component: StoreCreateComponent,canActivate:[StoreAccessGuard]
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
export class StoreRoutingModule { }