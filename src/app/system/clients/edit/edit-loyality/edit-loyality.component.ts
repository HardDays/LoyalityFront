import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../clients.service';
import { ClientModel } from 'src/app/core/models/client.model';
import { PromotionsService } from 'src/app/system/promotions/promotions.service';

@Component({
  selector: 'app-edit-loyality',
  templateUrl: './edit-loyality.component.html',
  styleUrls: ['./edit-loyality.component.scss']
})
export class EditLoyalityComponent implements OnInit {

  Client = new ClientModel();

  Price = 0;

  SelectedLoyality = null;
  ShowSelect = false;
  PromotionsProgramm = [];

  isNextDisabled = true;

  constructor(
    protected clientsService: ClientsService,
    private loyalityService: PromotionsService) { }

  ngOnInit() {
    this.Client = this.clientsService.Client;
    this.loyalityService.RefreshPromotions(
      (data) => {
        this.PromotionsProgramm = data;
        this.SelectedLoyality = this.PromotionsProgramm.find(x => x.id === this.clientsService.newOrder.promotion_id);
      }
    );
    this.Price = this.clientsService.newOrder.price;
    this.checkIsNextDisabled();
  }

  OnSelected(item) {
    this.SelectedLoyality = item;
    console.log(item);
    if (item) {
      this.clientsService.newOrder.promotion_id = this.SelectedLoyality.id;
    } else {
      this.clientsService.newOrder.promotion_id = 0;
    }
    this.ShowSelect = false;
  }

  onPriceChanged(val) {
    this.Price = +val;
    this.clientsService.newOrder.price = this.Price;
    this.checkIsNextDisabled();
  }

  checkIsNextDisabled () {
    if (!this.Price || this.Price === 0) {
      this.isNextDisabled = true;
      return;
    }
    this.isNextDisabled = false;
  }

}
