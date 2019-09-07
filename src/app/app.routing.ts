import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AppAccessGuard } from './app.guard';

const routes: Routes = [
    { path: '', redirectTo: 'auth', pathMatch: 'full'},
    { path: 'auth', loadChildren: './auth/auth.module#AuthModule', canActivate:[AppAccessGuard]},
    // { path: 'test', component: TestComponent}
    { path: 'system', loadChildren: './system/system.module#SystemModule',canActivate:[AppAccessGuard]}
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
  ],
  exports: [
  ],
  providers: []
})
export class AppRoutingModule { }
