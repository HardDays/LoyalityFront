import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { StoreCreateComponent } from './create.component';
import { StoreCreateRoutingModule } from './create.routing';

@NgModule({
  declarations: [
    StoreCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    StoreCreateRoutingModule
  ],
  providers: []
})
export class StoreCreateModule { }
