import { Component, OnInit } from '@angular/core';
import { BonusManagementService } from "../bonus-management.service"
import { ClientModel } from 'src/app/core/models/client.model';

@Component({
  selector: 'app-bonus-overview',
  templateUrl: './bonus-overview.component.html',
  styleUrls: []
})
export class BonusOverviewComponent implements OnInit
{

  constructor(private service: BonusManagementService) { }

  ngOnInit()
  {
    this.service.GetClients(
      (data: ClientModel[]) =>
      {
        console.log(data)
      },
      (err) =>
      {
        console.error(err)
      })
  }

}
