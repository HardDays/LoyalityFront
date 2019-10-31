import { TextMaskModule } from 'angular2-text-mask';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, ActivatedRouteSnapshot } from '@angular/router';
import { SystemRoutingModule } from './system.routing';
import { SystemAccessGuard } from './system.guard';
import { MyDatePickerModule } from 'mydatepicker';
import { SystemComponent } from './system.component';
import { TestComponent } from './test/test.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SettingsModule } from './settings/settings.module';


@NgModule({
  declarations: [
    SystemComponent,
    NavigationComponent,
    TestComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    SystemRoutingModule,
    ReactiveFormsModule,
    TextMaskModule,
    SettingsModule
  ],
  providers: [ SystemAccessGuard]
})
export class SystemModule {}
