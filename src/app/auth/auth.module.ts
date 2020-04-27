import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AuthComponent } from './auth.component';
import { AuthAccessGuard } from './auth.guard';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth.routing';
import { TextMaskModule } from 'angular2-text-mask';
import { LoginModule } from './login/login.module';
import { PasswordModule } from './password/password.module';
import { SignupModule } from './signup/signup.module';
import { ConfirmModule } from './confirm/confirm.module';
import { CompanySelectorComponent } from './company-selector/company-selector.component';
import { CompanyModule } from '../system/company/company.module';
import { AuthStateService } from "./auth-state.service"

@NgModule({
  declarations: [
    AuthComponent,
    CompanySelectorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    TextMaskModule,
    AuthRoutingModule,
    LoginModule,
    PasswordModule,
    SignupModule,
    ConfirmModule,
    CompanyModule
    // HttpClientModule,
  ],
  // exports: [AuthComponent],
  providers: [AuthAccessGuard, AuthStateService]
})
export class AuthModule { }
