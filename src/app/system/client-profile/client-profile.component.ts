import { ClientModel } from './../../core/models/client.model';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { ClientProfileService } from './client-profile.service';

@Component({
  selector: 'client-profile-cmp',
  templateUrl: './client-profile.component.html'
})
export class ClientProfileComponent implements OnInit {
  constructor(private cdr: ChangeDetectorRef, private auth: AuthService, private profileService: ClientProfileService) {
  }

  ngOnInit(): void {
  }
}
