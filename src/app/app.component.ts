import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{
  IsLoggedIn = false;
  title = 'LoyalityFront';

  constructor(private auth: AuthService, private cdr: ChangeDetectorRef, private router: Router) {
    this.IsLoggedIn = this.auth.IsLoggedIn;
    this.OnLoginChange();
    this.auth.onAuthChange$.subscribe(
        (val) => {
            this.IsLoggedIn = val;
            this.OnLoginChange();
        }
    )
  }
  ngOnInit(): void 
  {
  }


  OnLoginChange()
  {
    // console.log(this.IsLoggedIn);
    this.router.navigate([this.IsLoggedIn ? 'system' : 'auth']);
  }
}
