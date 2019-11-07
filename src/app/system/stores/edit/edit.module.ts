import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { StoreEditComponent } from './edit.component';
import { StoreEditRoutingModule } from './edit.routing';

@NgModule({
  declarations: [
    StoreEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    StoreEditRoutingModule
  ],
  providers: [ ]
})
export class StoreEditModule {}