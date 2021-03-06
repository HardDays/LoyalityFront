import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../clients.service';
import { ClientModel } from 'src/app/core/models/client.model';
import { PromotionsService } from 'src/app/system/promotions/promotions.service';
import { LoyaltyService } from 'src/app/system/loyalty/loyalty.service';

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

  ProgrammLoyaltyName = 'Программа лояльности';

  constructor(
    protected clientsService: ClientsService,
    private loyalityService: PromotionsService,
    private ls: LoyaltyService,
    private router: Router) { }

  ngOnInit() {
    this.Client = this.clientsService.Client;
    if (!this.Client || !this.Client.id) {
      this.router.navigate(['/system', 'my_clients', 'edit', 'search']);
    }
    this.loyalityService.RefreshPromotions(
      (data) => {
        this.PromotionsProgramm = data;
        const today = new Date();
        for (let item of this.PromotionsProgramm) {
          const begin = new Date(item.begin_date);
          const end = new Date(item.end_date);
          item.enable = (today >= begin) && (today <= end) ? true : false;
          // console.log(`:: `, today, item.begin_date, today >= item.begin_date,  '  -   ', item.end_date, today < item.end_date);
          console.log(today, begin, end, item.enable);
        }
        console.log(this.PromotionsProgramm);
        this.SelectedLoyality = this.PromotionsProgramm.find(x => x.id === this.clientsService.newOrder.promotion_id);
      }
    );
    this.Price = this.clientsService.newOrder.price;
    this.checkIsNextDisabled();

    this.ls.RefreshLoyalty(
      (res) => {
        console.log(res)

        this.ProgrammLoyaltyName = res['name'];
      }
    );
  }

  OnSelected(item) {
    if (!item || item.enable) {
      this.SelectedLoyality = item;
      console.log(item);
      if (item) {
        this.clientsService.newOrder.promotion_id = this.SelectedLoyality.id;
      } else {
        this.clientsService.newOrder.promotion_id = 0;
      }
      this.ShowSelect = false;
    }
  }

  onPriceChanged(val) {
    this.Price = +val;
    if (!this.Price) this.Price = 0;
    console.log(this.Price);
    this.clientsService.newOrder.price = this.Price;
    this.checkIsNextDisabled();
  }

  checkIsNextDisabled() {
    if (!this.Price || this.Price === 0) {
      this.isNextDisabled = true;
      return;
    }
    this.isNextDisabled = false;
  }

}
