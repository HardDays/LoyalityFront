import { TextMaskModule } from 'angular2-text-mask';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { StoresComponent } from './stores.component';
import { StoreAccessGuard } from './store.guard';
import { StoreRoutingModule } from './stores.routing';
import { StoresService } from './stores.service';


@NgModule({
  declarations: [
    StoresComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    StoreRoutingModule,
    ReactiveFormsModule,
    TextMaskModule
  ],
  providers: [StoreAccessGuard, StoresService]
})
export class StoresModule { }
