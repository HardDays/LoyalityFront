import { NgModule, InjectionToken } from '@angular/core';
import { environment } from '../environments/environment';

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export class AppConfig {
  apiUrl: string;
  clientId: string;
}

export const APP_DI_CONFIG: AppConfig = {
  apiUrl: environment.apiUrl,
  clientId: environment.vkClientId,
};

@NgModule({
  providers: [{
    provide: APP_CONFIG,
    useValue: APP_DI_CONFIG
  }]
})
export class AppConfigModule { }
