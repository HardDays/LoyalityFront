import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { StoreListComponent } from './list.component';
import { StoresListRoutingModule } from './list.routing';
import { StoreItemDirective } from './item/item.directive';

@NgModule({
  declarations: [
    StoreListComponent,
    StoreItemDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    StoresListRoutingModule
  ],
  providers: [ ]
})
export class StoresListModule {}