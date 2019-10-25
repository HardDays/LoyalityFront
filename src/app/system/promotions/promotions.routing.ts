import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { PromotionsListComponent } from './list/list.component';
import { PromotionEditComponent } from './edit/edit.component';
import { PromotionsAccessGuard } from './promotions.guard';

const routes: Routes = [
    // { path: '', redirectTo: 'edit/2', pathMatch: 'full'},
    { path: '', redirectTo: 'list', pathMatch: 'full'},
    { path: 'list', component: PromotionsListComponent, canActivate:[PromotionsAccessGuard]},
    { path: 'edit/:id', component: PromotionEditComponent,canActivate:[PromotionsAccessGuard]}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
  ],
  providers: []
})
export class PromotionsRoutingModule { }