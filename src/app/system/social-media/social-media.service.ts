import { Injectable, Inject } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { AuthService } from 'src/app/core/services/auth.service';

import { APP_CONFIG, AppConfig } from '../../app-config.module';


@Injectable()
export class SocialMediaService {

  private windowObjectReference: Window;
  private intervalRef: any = null;

  constructor(private http: HttpService, private auth: AuthService, @Inject(APP_CONFIG) private config: AppConfig) {
  }

  UpdateVkGroup(isCreated, data, success?: (data) => void, fail?: (err) => void) {
    this.auth.onLoading.next(true);
    this.http.CommonRequest(
      () => isCreated ? this.http.PutData('/vk/groups', data) : this.http.PostData('/vk/groups', data),
      (res) => {
        if (success && typeof success == "function") {
          success(res);
        }
        this.auth.onLoading.next(false);
      },
      (err) => {
        console.log(err)
        this.auth.onLoading.next(false);
      }
    );
  }

  AuthorizeVK(success?: () => void, fail?: () => void) {
    const url = `https://oauth.vk.com/authorize?client_id=${this.config.clientId}&redirect_uri=${window.location.origin}/&scope=offline&response_type=token&revoke=1&v=5.103`
    const strWindowFeatures = 'toolbar=no, menubar=no, width=800, height=700, top=100, left=100';

    // window.localStorage.setItem("vkAuth", "in_progress");
    this.windowObjectReference = window.open(url, name, strWindowFeatures);
    this.intervalRef = window.setInterval(() => {

      let href: string;
      try {
        href = this.windowObjectReference.location.href;
      } catch (e) { };

      if (href && href !== "about:blank") {
        window.clearInterval(this.intervalRef);

        const getUrlParameterByName = (name, url) => {
          name = name.replace(/[\[\]]/g, "\\$&");
          let regex = new RegExp("[?&#]" + name + "(=([^&#]*)|&|#|$)");
          let results = regex.exec(url);
          if (!results) return null;
          if (!results[2]) return "";
          return decodeURIComponent(results[2].replace(/\+/g, " "));
        }

        const vk_access_token = getUrlParameterByName("access_token", href);
        const vk_error = getUrlParameterByName("error", href);
        console.log(vk_error)

        this.windowObjectReference.close();

        if (!vk_access_token || vk_error === "access_denied") {
          fail();
          return;
        }

        this.SetVKClient(
          { access_token: vk_access_token },
          () => {
            success();
          },
          () => {
            fail();
          })
      }

    }, 500)
  }

  SetVKClient(data, success?: (data) => void, fail?: (err) => void) {
    this.auth.onLoading.next(true);
    this.http.CommonRequest(
      () => this.http.PostData('/clients/profile/vk', data),
      (res) => {
        this.auth.onLoading.next(false);
        success(res);
      },
      (err) => {
        this.auth.onLoading.next(false);
        fail(err);
      }
    );
  }

  GetVKGroupInfo(success?: (data) => void) {
    this.auth.onLoading.next(true);
    this.http.CommonRequest(
      () => this.http.GetData('/vk/groups'),
      (res) => {
        if (success && typeof success == "function") {
          success(res);
        }
        this.auth.onLoading.next(false);
      },
      (err) => {
        this.auth.onLoading.next(false);
      }
    );
  }

}
