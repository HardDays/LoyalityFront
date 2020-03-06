import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { OperatorEditComponent } from './edit.component';

const routes: Routes =
[
  {
    path: ':id', component: OperatorEditComponent
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
export class OperatorEditRoutingModule { }
