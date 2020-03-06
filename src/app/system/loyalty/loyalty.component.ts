import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'loyalty-cmp',
  templateUrl: './loyalty.component.html'
})
export class LoyaltyComponent implements OnInit {
  constructor(private cdr: ChangeDetectorRef, private auth: AuthService) {

  }
  ngOnInit(): void {
  }
}
