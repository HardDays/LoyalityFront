import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { OperatorsAccessGuard } from './operators.guard';
import { OperatorsListComponent } from './list/list.component';
import { OperatorEditComponent } from './edit/edit.component';
import { OperatorCreateComponent } from './create/create.component';
// import { StoreAccessGuard } from './store.guard';
// import { StoreListComponent, OperatorsListComponent } from './list/list.component';
// import { StoreEditComponent, OperatorEditComponent } from './edit/edit.component';
// import { StoreCreateComponent, OperatorCreateComponent } from './create/create.component';

const routes: Routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full'},
    { path: 'list', component: OperatorsListComponent, canActivate:[OperatorsAccessGuard]},
    { path: 'edit/:id', component: OperatorEditComponent,canActivate:[OperatorsAccessGuard]},
    {
        path: 'create', component: OperatorCreateComponent,canActivate:[OperatorsAccessGuard]
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