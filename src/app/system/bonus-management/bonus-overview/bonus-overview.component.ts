import { Component, OnInit } from '@angular/core';
import { BonusManagementService } from "../bonus-management.service"
import { ClientExtendedModel, ClientModel } from 'src/app/core/models/client.model';
import { BonusStateService } from '../bonus-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bonus-overview',
  templateUrl: './bonus-overview.component.html',
  styleUrls: []
})
export class BonusOverviewComponent implements OnInit {

  Clients: ClientExtendedModel[] = [];
  _origClients: ClientExtendedModel[] = [];
  userSearchData: string = "";

  constructor(private service: BonusManagementService, private stateService: BonusStateService, private router: Router) { }

  ngOnInit() {
    this.service.GetClients(
      (data: ClientExtendedModel[]) => {
        let arr = [];
        data.forEach(client => {
          let val = [];
          if(client.first_name)
          {
            val.push(client.first_name);
          }

          if(client.last_name)
          {
            val.push(client.last_name);
          }

          if(client.second_name)
          {
            val.push(client.second_name);
          }

          client.full_name = val.join(" ");

          arr.push(client);
        });
        this.Clients = arr;
        this._origClients = arr;
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
        if(c.full_name)
        {
          res = res || c.full_name.includes(this.userSearchData);
        }
        if (c.first_name) 
        {
          res = res || c.first_name.includes(this.userSearchData);
        }
        if (c.last_name) 
        {
          res = res || c.last_name.includes(this.userSearchData);
        }
        if (c.second_name) 
        {
          res = res || c.second_name.includes(this.userSearchData);
        }
        if (c.phone) 
        {
          res = res || c.phone.includes(this.userSearchData);
        }
        if(c.card_number)
        {
          res = res || c.card_number.includes(this.userSearchData)
        }

        return res;
      })
      : JSON.parse(JSON.stringify(this._origClients));
  }

}
