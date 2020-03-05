import { Component, OnInit } from '@angular/core';
import { BonusManagementService } from "../bonus-management.service"

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
      (data) =>
      {
        console.log(data)
      },
      (err) =>
      {
        console.error(err)
      })
  }

}
