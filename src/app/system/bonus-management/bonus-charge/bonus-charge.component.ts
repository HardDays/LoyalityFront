import { Component, OnInit, } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { BonusManagementService } from "../bonus-management.service"
import { BonusStateService } from '../bonus-state.service';
import { ClientModel } from 'src/app/core/models/client.model';

@Component({
  selector: 'app-bonus-charge',
  templateUrl: './bonus-charge.component.html',
  styleUrls: []
})
export class BonusChargeComponent implements OnInit {

  SuccessModalIsShown: boolean = false;
  canSubmit: boolean = false;
  Client: ClientModel;
  Points;
  ClientSuccess;

  constructor(private _location: Location, private router: Router, private service: BonusManagementService, private stateService: BonusStateService) {
  }

  ngOnInit() {
    if (!this.stateService.Client) {
      this.router.navigate(["/system", "bonus_management", "overview"]);
      return;
    }
    this.Client = this.stateService.Client
  }

  CheckCanSubmit() {
    this.canSubmit = this.Points > 0 && Boolean(this.Client.id);
  }

  SetPointsValue(value) {
    this.Points = value;
    this.CheckCanSubmit();
  }

  GoBack() {
    this._location.back();
  }

  onCloseSuccessModal() {
    this.SuccessModalIsShown = false;
    this.router.navigate(['/system', 'bonus_management', 'overview']);
  }

  AddBonuses() {
    this.service.AddPoints(
      { clientId: this.Client.id, points: this.Points },
      () => {
        this.ClientSuccess = {
          name: `${this.Client.first_name ? this.Client.first_name : ""} ${this.Client.last_name ? this.Client.last_name : ""} ${this.Client.second_name ? this.Client.second_name : ""}`,
          points: Number(this.Client.points) + Number(this.Points),
        }
        this.SuccessModalIsShown = true;
      },
      (err) => {
        console.error(err)
      })
  }

  ChargeOffBonuses() {
    // todo
  }
}
