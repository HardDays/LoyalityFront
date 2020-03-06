import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { LoyaltyListComponent } from './list.component';
import { LoyaltyListRoutingModule } from './list.routing';

@NgModule({
  declarations: [
    LoyaltyListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    LoyaltyListRoutingModule
  ],
  providers: []
})
export class LoyaltyListModule { }
