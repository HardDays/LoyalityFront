import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'clients-cmp',
  templateUrl: './clients.component.html'
})
export class ClientsComponent implements OnInit {
  constructor(private cdr: ChangeDetectorRef, private auth: AuthService) {
  }
  ngOnInit(): void {
  }
}
