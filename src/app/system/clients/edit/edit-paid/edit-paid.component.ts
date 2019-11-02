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

  Client = this.clientsService.Client;
  Order = this.clientsService.newOrder;

  Bonuses = {
    All: 100,
    Available: 20
  };
  WrireBonuses = 0;
  hasErrorBonuses = false;

  isModalOpened = false;

  constructor(
    protected clientsService: ClientsService,
    private loyalityService: PromotionsService) { }

  ngOnInit() {
    console.log(`Client = `, this.Client);
    console.log(`Order = `, this.Order);
  }

  onWriteBonusesChange(val: number) {
    if (val > this.Bonuses.Available) {
      this.hasErrorBonuses = true;
      return;
    }
    this.hasErrorBonuses = false;
    this.WrireBonuses = val;
  }

  onClickWriteBonuses() {
    if (this.hasErrorBonuses) {
      this.WrireBonuses = 0;
    }
    this.Order.write_off = this.WrireBonuses;
    this.clientsService.newOrder.write_off = this.WrireBonuses;
    this.CreateOrder();
  }

  onClickNotWriteBonuses() {
    this.Order.write_off = 0;
    this.CreateOrder();
  }

  CreateOrder() {
    if (this.Order.promotion_id) {
      this.clientsService.CreateOrderForPromotion(
        this.Client.id,
        this.Order.promotion_id,
        this.Order.price,
        this.Order.write_off,
        (res) => {
          this.isModalOpened = true;
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.clientsService.CreateOrderForLoyalty(
        this.Client.id,
        this.Order.price,
        this.Order.write_off,
        (res) => {
          this.isModalOpened = true;
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

}
