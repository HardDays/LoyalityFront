import { TextMaskModule } from 'angular2-text-mask';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, ActivatedRouteSnapshot } from '@angular/router';
import { MyDatePickerModule } from 'mydatepicker';
import { ClientsComponent } from './clients.component';
import { ClientsStartComponent } from './start/start.component';
import { ClientsCreateComponent } from './create/create.component';
import { ClientsEditComponent } from './edit/edit.component';
import { ClientsAccessGuard } from './clients.guard';
import { ClientsRoutingModule } from './clients.routing';
import { ClientsService } from './clients.service';


@NgModule({
  declarations: [
    ClientsComponent,
    ClientsStartComponent,
    ClientsCreateComponent,
    ClientsEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    ClientsRoutingModule,
    ReactiveFormsModule,
    TextMaskModule
  ],
  providers: [ ClientsAccessGuard, ClientsService]
})
export class ClientsModule {}
