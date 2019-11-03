import { LoyaltyProgramsService } from './../promotions/loyalty.service';
import { EditSearchComponent } from './edit/edit-search/edit-search.component';
import { EditPaidComponent } from './edit/edit-paid/edit-paid.component';
import { EditLoyalityComponent } from './edit/edit-loyality/edit-loyality.component';
import { EditClientComponent } from './edit/edit-client/edit-client.component';
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
import { CreateClientByPhoneComponent } from './create/create-client-by-phone/create-client-by-phone.component';
import { CreateClientByUserComponent } from './create/create-client-by-user/create-client-by-user.component';
import { PromotionsService } from '../promotions/promotions.service';

import { PipesModule } from './../../core/pipes/pipes.module';

@NgModule({
  declarations: [
    ClientsComponent,
    ClientsStartComponent,
    ClientsCreateComponent,
    ClientsEditComponent,
    CreateClientByPhoneComponent,
    CreateClientByUserComponent,
    EditClientComponent,
    EditLoyalityComponent,
    EditPaidComponent,
    EditSearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    ClientsRoutingModule,
    ReactiveFormsModule,
    TextMaskModule,
    MyDatePickerModule,
    PipesModule
  ],
  providers: [ ClientsAccessGuard, ClientsService, PromotionsService, LoyaltyProgramsService]
})
export class ClientsModule {}
