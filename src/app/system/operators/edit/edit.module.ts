import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { OperatorEditComponent } from './edit.component';
import { OperatorEditRoutingModule } from './edit.routing';
import { ClickDirectiveModule } from '../click.directive';

@NgModule({
  declarations: [
    OperatorEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    OperatorEditRoutingModule,
    ClickDirectiveModule
  ],
  providers: [ ]
})
export class OperatorEditModule {}