import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bonus-charge',
  templateUrl: './bonus-charge.component.html',
  styleUrls: []
})
export class BonusChargeComponent implements OnInit {

  SuccessModalIsShown: boolean = false;

  constructor(private _location: Location, private router: Router) {
  }

  ngOnInit() {
  }

  GoBack() {
    this._location.back();
  }

  onCloseSuccessModal() {
    this.SuccessModalIsShown = false;
    this.router.navigate(['/system', 'bonus_management', 'overview']);
  }

  AddBonuses() {
    this.SuccessModalIsShown = true;
  }

  ChargeOffBonuses() {
    this.SuccessModalIsShown = true;
  }
}
