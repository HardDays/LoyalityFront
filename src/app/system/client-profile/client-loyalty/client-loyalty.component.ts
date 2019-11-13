import { Component, OnInit } from '@angular/core';
import { ClientProfileService } from '../client-profile.service';
import { LoyaltyLevelModel } from 'src/app/core/models/loyalty.model';

@Component({
  selector: 'app-client-loyalty',
  templateUrl: './client-loyalty.component.html',
  styleUrls: ['./client-loyalty.component.scss']
})
export class ClientLoyaltyComponent implements OnInit {

  Client = this.profileService.ClientProfile;
  LoyaltyProgram = new LoyaltyLevelModel();

  Today = new Date();

  constructor(private profileService: ClientProfileService) { }

  ngOnInit() {
    this.GetProfile();
  }

  GetProfile() {
    if (!this.profileService.ClientProfile.id) {
      this.profileService.GetClientProfile(
        (res) => {
          this.profileService.ClientProfile = res;
          this.Client = this.profileService.ClientProfile;
          this.LoyaltyProgram = this.Client.loyalty_program;
          console.log(`Client = `, this.Client);
          console.log(`LoyaltyProgram = `, this.LoyaltyProgram);
        }
      );
    } else {
      this.Client = this.profileService.ClientProfile;
      this.LoyaltyProgram = this.Client.loyalty_program;
    }

  }

}
