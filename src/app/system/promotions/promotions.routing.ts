import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { PromotionsListComponent } from './list/list.component';
import { PromotionEditComponent } from './edit/edit.component';
import { PromotionsAccessGuard } from './promotions.guard';
import { PromotionsComponent } from './promotions.component';


const routes: Routes =
[
  {
    path: '', component: PromotionsComponent, children:[
      { path: '', redirectTo: 'list', pathMatch: 'full', canActivate:[PromotionsAccessGuard]},
      { path: 'list', loadChildren: 'src/app/system/promotions/list/list.module#PromotionsListModule', canActivate:[PromotionsAccessGuard]},
      { path: 'edit', loadChildren: 'src/app/system/promotions/edit/edit.module#PromotionEditModule',canActivate:[PromotionsAccessGuard]}
    ]
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
export class PromotionsRoutingModule { }