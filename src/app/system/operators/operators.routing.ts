import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { OperatorsAccessGuard } from './operators.guard';
import { OperatorsComponent } from './operators.component';

const routes: Routes =
[
  {
    path: '', component: OperatorsComponent, children:[
      { path: '', redirectTo: 'list', pathMatch: 'full'},
      { path: 'list', loadChildren: 'src/app/system/operators/list/list.module#OperatorsListModule', canActivate:[OperatorsAccessGuard]},
      { path: 'edit', loadChildren: 'src/app/system/operators/edit/edit.module#OperatorEditModule',canActivate:[OperatorsAccessGuard]},
      {
        path: 'create', loadChildren: 'src/app/system/operators/create/create.module#OperatorCreateModule',canActivate:[OperatorsAccessGuard]
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
export class OperatorsRoutingModule { }
