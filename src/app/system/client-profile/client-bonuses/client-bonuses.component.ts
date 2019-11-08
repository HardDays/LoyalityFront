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
    console.log(this.Client);
  }

  GetBonuses() {
    this.profileService.GetClientOrders(
      (res) => {
        this.Bonuses = res;
        console.log(`Bonuses = `, this.Bonuses);
      },
      (err) => {

      }
    );
  }

}
