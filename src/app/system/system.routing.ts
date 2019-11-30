import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { SystemComponent } from './system.component';
import { TestComponent } from './test/test.component';
import { SystemAccessGuard } from './system.guard';
import { CompanyComponent } from './company/company.component';

const routes: Routes =
[
  {
    path: '', component: SystemComponent, children:[
      { path: "", pathMatch:"full", redirectTo: "my_loyalty_program" },
      { path: 'my_stores', loadChildren: './stores/stores.module#StoresModule', canActivate:[SystemAccessGuard]},
      { path: 'my_cashiers', loadChildren: './operators/operators.module#OperatorsModule', canActivate:[SystemAccessGuard]},
      { path: 'my_clients', loadChildren: './clients/clients.module#ClientsModule', canActivate:[SystemAccessGuard]},
      { path: 'my_promotions', loadChildren: './promotions/promotions.module#PromotionsModule', canActivate:[SystemAccessGuard]},
      { path: 'my_loyalty_program', loadChildren: './loyalty/loyalty.module#LoyaltyModule', canActivate:[SystemAccessGuard]},
      { path: 'client_profile', loadChildren: './client-profile/client-profile.module#ClientProfileModule',canActivate: [SystemAccessGuard]},
      { path: 'settings', loadChildren: './settings/settings.module#SettingsModule',canActivate: [SystemAccessGuard]},
      { path: 'reports', loadChildren: './reports/reports.module#ReportsModule',canActivate: [SystemAccessGuard]},
      { path: 'company', component: CompanyComponent, canActivate:[SystemAccessGuard]},
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
