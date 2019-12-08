import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
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
        if(this.IsLoading != val)
        {
          setTimeout(() => {
            this.IsLoading = val;
          }, 1);
        }
      }
    );
    
  }
  ngOnInit(): void 
  {
    this.cdr.detectChanges();
  }


  // OnLoginChange()
  // {
  //   this.router.navigate([this.IsLoggedIn ? 'system' : 'auth']);
  // }
}
