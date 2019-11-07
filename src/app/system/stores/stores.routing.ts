import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoresComponent } from './stores.component';
import { StoreAccessGuard } from './store.guard';

const routes: Routes =
[
  {
    path: '', component: StoresComponent, children:[
      { path: '', redirectTo: 'list', pathMatch: 'full', canActivate:[StoreAccessGuard]},
      { path: 'list', loadChildren: 'src/app/system/stores/list/list.module#StoresListModule', canActivate:[StoreAccessGuard]},
      { path: 'edit', loadChildren: 'src/app/system/stores/edit/edit.module#StoreEditModule',canActivate:[StoreAccessGuard]},
      {
        path: 'create', loadChildren: 'src/app/system/stores/create/create.module#StoreCreateModule',canActivate:[StoreAccessGuard]
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
export class StoreRoutingModule { }