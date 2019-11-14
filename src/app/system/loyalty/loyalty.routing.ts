import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { LoyaltyComponent } from './loyalty.component';
import { LoyaltyAccessGuard } from './loyalty.guard';


const routes: Routes =
[
  {
    path: '', component: LoyaltyComponent, children:[
      { path: '', redirectTo: 'list', pathMatch: 'full', canActivate:[LoyaltyAccessGuard]},
      { path: 'list', loadChildren: 'src/app/system/loyalty/list/list.module#LoyaltyListModule', canActivate:[LoyaltyAccessGuard]},
      { path: 'level', loadChildren: 'src/app/system/loyalty/level/level.module#LoyaltyLevelModule',canActivate:[LoyaltyAccessGuard]},
      {
        path: 'edit', loadChildren: 'src/app/system/loyalty/edit/edit.module#LoyaltyEditModule', canActivate: [LoyaltyAccessGuard]
      }
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
export class LoyaltyRoutingModule { }