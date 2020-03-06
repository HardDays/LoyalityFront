import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { PasswordComponent } from './password/password.component';
import { SignUpComponent } from './signup/signup.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { CompanySelectorComponent } from './company-selector/company-selector.component';

const routes: Routes =
  [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'remind', component: PasswordComponent },
    { path: 'signup', component: SignUpComponent },
    { path: 'select', component: CompanySelectorComponent }
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
export class AuthRoutingModule { }
