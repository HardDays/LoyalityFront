import { ClientsService } from './../../clients.service';
import { Component, OnInit } from '@angular/core';
import { PromotionsService } from 'src/app/system/promotions/promotions.service';
import { ClientModel } from 'src/app/core/models/client.model';

@Component({
  selector: 'app-edit-paid',
  templateUrl: './edit-paid.component.html',
  styleUrls: ['./edit-paid.component.scss']
})
export class EditPaidComponent implements OnInit {

  Client = new ClientModel();

  isModalOpened = false;

  constructor(
    protected clientsService: ClientsService,
    private loyalityService: PromotionsService) { }

  ngOnInit() {
    this.Client = this.clientsService.Client;

    console.log(this.clientsService.newOrder);
  }

}
