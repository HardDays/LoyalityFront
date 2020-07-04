import { Component, OnInit, } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { BonusManagementService } from "../bonus-management.service"
import { BonusStateService } from '../bonus-state.service';
import { ClientModel } from 'src/app/core/models/client.model';
import { IMyDpOptions } from 'mydatepicker';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-bonus-charge',
  templateUrl: './bonus-charge.component.html',
  styleUrls: []
})
export class BonusChargeComponent implements OnInit {
  Nachislenie=false;
  SuccessModalIsShown: boolean = false;
  canSubmit: boolean = false;
  Client: ClientModel;
  Points;
  ClientSuccess;
  begin_date=null;
  end_date=null;
  myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy',
    dayLabels: {
      su: 'Вс', mo: 'Пн', tu: 'Вт', we: 'Ср', th: 'Чт', fr: 'Пт', sa: 'Сб'
    },
    monthLabels: {
      1: 'Янв', 2: 'Фев', 3: 'Мар', 4: 'Апр', 5: 'Май', 6: 'Июн', 7: 'Июл', 8: 'Авг', 9: 'Сен', 10: 'Окт', 11: 'Ноя', 12: 'Дек'
    },
    showTodayBtn: false,
    disableUntil: this.GetDisableUntilData(new Date()),
    showClearDateBtn: false,
    //height: '28px',
    openSelectorOnInputClick: true
  };
  
 

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
    if(this.begin_date==null) return;
    if(this.end_date==null) return;

    this.service.AddPoints(
      { clientId: this.Client.id, points: +this.Points * 100,
        burning_date:this.begin_date,
        activation_date:this.end_date
      
      },
      () => {
        this.ClientSuccess = {
          name: `${this.Client.first_name ? this.Client.first_name : ""} ${this.Client.last_name ? this.Client.last_name : ""} ${this.Client.second_name ? this.Client.second_name : ""}`,
          currentPoints: (Number(this.Client.points) + Number(this.Points) * 100) / 100,
          diffPoints: `Бонусов начислено: ${this.Points}`
        }
        this.SuccessModalIsShown = true;
      },
      (err) => {
        console.error(err)
      })
  }

  ChargeOffBonuses() {
    this.Nachislenie=false;
    this.service.RemovePoints(
      { clientId: this.Client.id, points: +this.Points * 100 },
      () => {
        this.ClientSuccess = {
          name: `${this.Client.first_name ? this.Client.first_name : ""} ${this.Client.last_name ? this.Client.last_name : ""} ${this.Client.second_name ? this.Client.second_name : ""}`,
          currentPoints: Number(this.Client.points) - Number(this.Points) >= 0 ? (Number(this.Client.points) - Number(this.Points) * 100) / 100 : 0,
          diffPoints: `Бонусов списано: ${this.Points}`
        }
        this.SuccessModalIsShown = true;
      },
      (err) => {
        console.error(err)
      })
  }
  GetDisableUntilData(date: Date) {
    const number = date.getTime() - 1000 * 60 * 60 * 24;
    const newDate = new Date(number);

    return {
      year: newDate.getFullYear(),
      month: newDate.getMonth() + 1,
      day: newDate.getDate()
    };
  }
}
