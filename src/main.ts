import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

if (window.localStorage.getItem("vkAuth") === "in_progress") {
  alert(window.location.href);
  const getUrlParameterByName = (name, url) => {
    name = name.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp("[?&#]" + name + "(=([^&#]*)|&|#|$)");
    let results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  alert(getUrlParameterByName("access_token", window.location.href))
  window.localStorage.setItem("vk_access_token", getUrlParameterByName("access_token", window.location.href));
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
