import { TextMaskModule } from 'angular2-text-mask';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, ActivatedRouteSnapshot } from '@angular/router';
import { MyDatePickerModule } from 'mydatepicker';
import { SettingsComponent } from './settings.component';

@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    TextMaskModule
  ],
  exports: [SettingsComponent],
  providers: [ ]
})
export class SettingsModule {}
