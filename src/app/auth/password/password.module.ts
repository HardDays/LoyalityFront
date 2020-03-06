import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { PasswordComponent } from './password.component';

@NgModule({
  declarations: [
    PasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    PasswordComponent
  ],
  providers: []
})
export class PasswordModule { }
