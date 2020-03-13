import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppAccessGuard } from './app.guard';
import { HttpModule } from '@angular/http';
import { HttpService } from './core/services/http.service';
import { AuthService } from './core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TextMaskModule } from 'angular2-text-mask';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing';
import { CompanyService } from './core/services/company.service';
import { AppConfigModule } from './app-config.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    TextMaskModule,
    AppConfigModule
  ],
  providers: [
    AppAccessGuard,
    HttpModule,
    HttpService,
    AuthService,
    CompanyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
