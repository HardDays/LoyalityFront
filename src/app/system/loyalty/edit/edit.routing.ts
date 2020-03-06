import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { LoyaltyEditComponent } from './edit.component';

const routes: Routes =
  [
    {
      path: '', component: LoyaltyEditComponent, pathMatch: "full"
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
export class LoyaltyEditRoutingModule { }
