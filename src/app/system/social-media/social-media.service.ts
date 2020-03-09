import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { AuthService } from 'src/app/core/services/auth.service';


@Injectable()
export class SocialMediaService {

  constructor(private http: HttpService, private auth: AuthService) { }

  CreateVkGroup(data, success?: (data) => void, fail?: (err) => void) {
    this.auth.onLoading.next(true);
    this.http.CommonRequest(
      () => this.http.PostData('/vk/groups', data),
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

}
