import { TextMaskModule } from 'angular2-text-mask';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, ActivatedRouteSnapshot } from '@angular/router';
import { MyDatePickerModule } from 'mydatepicker';
import { StoresComponent } from './stores.component';
import { StoreListItemComponent } from './list/item/item.component';
import { StoreListComponent } from './list/list.component';
import { StoreCreateComponent } from './create/create.component';
import { StoreEditComponent } from './edit/edit.component';
import { StoreAccessGuard } from './store.guard';
import { StoreRoutingModule } from './stores.routing';
import { StoresService } from './stores.service';


@NgModule({
  declarations: [
    StoresComponent,
    StoreListItemComponent,
    StoreListComponent,
    StoreCreateComponent,
    StoreEditComponent
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
  providers: [ StoreAccessGuard, StoresService]
})
export class StoresModule {}
