import { Component, OnInit } from '@angular/core';
import { ClientProfileService } from '../client-profile.service';

@Component({
  selector: 'app-client-bonuses',
  templateUrl: './client-bonuses.component.html',
  styleUrls: ['./client-bonuses.component.scss']
})
export class ClientBonusesComponent implements OnInit {

  Client = this.profileService.ClientProfile;
  Bonuses = [];

  Today = new Date();

  constructor(private profileService: ClientProfileService) { }

  ngOnInit() {
    this.GetBonuses();
    this.GetProfile();
  }

  GetBonuses() {
    this.profileService.GetClientOrders(
      (res) => {
        this.Bonuses = res;
      },
      (err) => {

      }
    );
  }

  GetProfile() {
    if (!this.profileService.ClientProfile.id) {
      this.profileService.GetClientProfile(
        (res) => {
          this.profileService.ClientProfile = res;
          this.Client = this.profileService.ClientProfile;
        }
      );
    } else {
      this.Client = this.profileService.ClientProfile;
    }

  }

}
