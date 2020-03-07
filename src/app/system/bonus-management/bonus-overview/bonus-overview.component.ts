import { Component, OnInit } from '@angular/core';
import { BonusManagementService } from "../bonus-management.service"
import { ClientModel } from 'src/app/core/models/client.model';
import { BonusStateService } from '../bonus-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bonus-overview',
  templateUrl: './bonus-overview.component.html',
  styleUrls: []
})
export class BonusOverviewComponent implements OnInit {

  Clients: ClientModel[] = [];
  _origClients: ClientModel[] = [];
  userSearchData: string = "";

  constructor(private service: BonusManagementService, private stateService: BonusStateService, private router: Router) { }

  ngOnInit() {
    this.service.GetClients(
      (data: ClientModel[]) => {
        this.Clients = data;
        this._origClients = data;
      },
      (err) => {
        console.error(err)
      })
  }

  NavigateWithData(client) {
    this.stateService.Client = client;
    this.router.navigate(['/system', 'bonus_management', 'edit'])
  }

  FilterClients() {

    this.Clients = this.userSearchData
      ? this._origClients.filter(c => {
        let res = false;
        if (c.first_name) {
          res = res || c.first_name.includes(this.userSearchData);
        }
        if (c.last_name) {
          res = res || c.last_name.includes(this.userSearchData);
        }
        if (c.second_name) {
          res = res || c.second_name.includes(this.userSearchData);
        }
        if (c.phone) {
          res = res || c.phone.includes(this.userSearchData);
        }

        return res;
      })
      : JSON.parse(JSON.stringify(this._origClients));
  }

}
