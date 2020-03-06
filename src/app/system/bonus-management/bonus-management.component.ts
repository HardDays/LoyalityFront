import { Component, OnInit, } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-bonus-management-cmp',
  templateUrl: './bonus-management.component.html'
})
export class BonusManagementComponent implements OnInit {
  constructor(private auth: AuthService) {
  }
  ngOnInit(): void {
  }
}
