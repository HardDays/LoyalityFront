import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { SystemComponent } from './system.component';
import { TestComponent } from './test/test.component';
import { SystemAccessGuard } from './system.guard';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes =
[
  {
    path: '', component: SystemComponent, children:[
      { path: "", pathMatch:"full", redirectTo: "my_promotions" },
      { path: 'my_stores', loadChildren: './stores/stores.module#StoresModule', canActivate:[SystemAccessGuard]},
      { path: 'my_cashiers', loadChildren: './operators/operators.module#OperatorsModule', canActivate:[SystemAccessGuard]},
      { path: 'my_clients', loadChildren: './clients/clients.module#ClientsModule', canActivate:[SystemAccessGuard]},
      { path: 'my_promotions', loadChildren: './promotions/promotions.module#PromotionsModule', canActivate:[SystemAccessGuard]},
      { path: 'settings', component: SettingsComponent, canActivate:[SystemAccessGuard]},
      // { path: 'test', component: TestComponent },
      { path: '**', component: TestComponent }
    ]
  }
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
