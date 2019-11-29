import { LoyaltyService } from './../../../loyalty/loyalty.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PromotionsService } from 'src/app/system/promotions/promotions.service';
import { ClientsService } from '../../clients.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-client-first-buy',
  templateUrl: './create-client-first-buy.component.html',
  styleUrls: ['./create-client-first-buy.component.scss']
})
export class CreateClientFirstBuyComponent implements OnInit {

  SelectedLoyality = null;
  ShowSelect = false;

  PromotionsProgramm = [];

  isShowSuccessModal = false;

  OrderPrice = 0;

  CurrentClient = this.service.Client;

  ProgrammLoyaltyName = 'Программа лояльности';

  constructor(private loyalityService: PromotionsService,
    private service: ClientsService,
    private ls: LoyaltyService,
    private _location: Location,
    private router: Router) { }

  ngOnInit() {
    if (!this.CurrentClient.id) {
      this.router.navigate(['/system', 'my_clients', 'create']);
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
      }
    );

    this.ls.RefreshLoyalty(
      (res) => {
        this.ProgrammLoyaltyName = res['name'];
      }
    );

  }

  clickBuy() {
    // this.isShowSuccessModal = true;
    this.CreateOrder(this.CurrentClient.id);
  }

  CreateOrder(user_id: number) {
    if (this.SelectedLoyality) {
      this.service.CreateOrderForPromotion(
        user_id,
        +this.SelectedLoyality.id,
        +this.OrderPrice,
        0,
        (res) => {
          this.isShowSuccessModal = true;
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.service.CreateOrderForLoyalty(
        user_id,
        +this.OrderPrice,
        0,
        (res) => {
          this.isShowSuccessModal = true;
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }



  // OnSelected(item)
  // {
  //   this.SelectedLoyality = item;
  //   this.ShowSelect = false;
  // }

  OnSelected(item) {
    if (!item || item.enable) {
      this.SelectedLoyality = item;
      this.ShowSelect = false;
    }
  }

  GoBack() {
    this.router.navigate(['/system', 'my_clients']);
  }

  onCloseSuccessModal() {
    this.router.navigate(['/system', 'my_clients']);
  }
}
