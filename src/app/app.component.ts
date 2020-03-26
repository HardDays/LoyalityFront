import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  IsLoggedIn = false;
  IsLoading = false;
  title = 'LoyalityFront';

  constructor(private auth: AuthService, private cdr: ChangeDetectorRef, private router: Router) {
    this.IsLoggedIn = this.auth.IsLoggedIn;
    // this.OnLoginChange();
    this.auth.onAuthChange$.subscribe(
      (val) => {
        this.IsLoggedIn = val;
        // this.OnLoginChange();
      }
    )
    this.auth.onLoading.subscribe(
      val => {
        if (this.IsLoading != val) {
          setTimeout(() => {
            this.IsLoading = val;
          }, 1);
        }
      }
    );

  }
  ngOnInit(): void {
    if (window.localStorage.getItem("vkAuth") === "in_progress" && this.auth.LoginData.user_type === "client") {
      window.localStorage.setItem("vk_access_token", this._getUrlParameterByName("access_token", window.location.href));
    }

    this.cdr.detectChanges();
  }

  _getUrlParameterByName(name, url) {
    name = name.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp("[?&#]" + name + "(=([^&#]*)|&|#|$)");
    let results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }


  // OnLoginChange()
  // {
  //   this.router.navigate([this.IsLoggedIn ? 'system' : 'auth']);
  // }
}
