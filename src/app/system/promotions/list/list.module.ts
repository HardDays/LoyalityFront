import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { PromotionsListRoutingModule } from './list.routing';
import { PromotionsListComponent } from './list.component';

@NgModule({
  declarations: [
    PromotionsListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    PromotionsListRoutingModule
  ],
  providers: []
})
export class PromotionsListModule { }
