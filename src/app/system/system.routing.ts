import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { SystemComponent } from './system.component';
import { TestComponent } from './test/test.component';

const routes: Routes =
[
  { path: "", pathMatch:"full", redirectTo: "test"},
  {
    path: 'test', component: TestComponent
  },
          
  { path: '**', component: TestComponent}

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class SystemRoutingModule { }
