import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'test-cmp',
  templateUrl: './test.component.html'
})
export class TestComponent  implements OnInit{
  
  title = 'LoyalityFront';

  constructor(private cdr: ChangeDetectorRef, private auth: AuthService) {
        
  }
  ngOnInit(): void 
  {
  }

  Logout()
  {
    this.auth.Logout();
  }
}
