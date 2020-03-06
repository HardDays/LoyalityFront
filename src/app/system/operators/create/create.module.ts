import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { OperatorCreateRoutingModule } from './create.routing';
import { OperatorCreateComponent } from './create.component';
import { ClickDirectiveModule } from '../click.directive';

@NgModule({
  declarations: [
    OperatorCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    OperatorCreateRoutingModule,
    ClickDirectiveModule
  ],
  providers: [ ]
})
export class OperatorCreateModule {}
