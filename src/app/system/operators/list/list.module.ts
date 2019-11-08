import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { OperatorsListComponent } from './list.component';
import { OperatorsListRoutingModule } from './list.routing';

@NgModule({
  declarations: [
    OperatorsListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    OperatorsListRoutingModule
  ],
  providers: [ ]
})
export class OperatorsListModule {}