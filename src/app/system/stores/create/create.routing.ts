import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { StoreCreateComponent } from './create.component';

const routes: Routes =
[
  {
    path: '',pathMatch: "full", component: StoreCreateComponent
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
export class StoreCreateRoutingModule { }
