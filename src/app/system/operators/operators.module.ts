import { TextMaskModule } from 'angular2-text-mask';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, ActivatedRouteSnapshot } from '@angular/router';
import { MyDatePickerModule } from 'mydatepicker';
import { OperatorsRoutingModule } from './operators.routing';
import { OperatorsAccessGuard } from './operators.guard';
import { OperatorsService } from './operators.service';
import { OperatorsListComponent } from './list/list.component';
import { OperatorEditComponent } from './edit/edit.component';
import { OperatorCreateComponent } from './create/create.component';
import { ClickDirective } from './click.directive';
import { OperatorsComponent } from './operators.component';

@NgModule({
  declarations: [
    OperatorsListComponent,
    OperatorEditComponent,
    OperatorCreateComponent,
    ClickDirective,
    OperatorsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    OperatorsRoutingModule,
    ReactiveFormsModule,
    TextMaskModule
  ],
  providers: [ OperatorsAccessGuard, OperatorsService]
})
export class OperatorsModule {}
