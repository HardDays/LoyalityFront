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

  constructor(private loyalityService: PromotionsService,
    private service: ClientsService,
    private _location: Location,
    private router: Router) { }

  ngOnInit() {
    if (!this.CurrentClient.id) {
      this.router.navigate(['/system', 'my_clients', 'create']);
    }
    this.loyalityService.RefreshPromotions(
      (data) => {
        this.PromotionsProgramm = data;
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



  OnSelected(item)
  {
    this.SelectedLoyality = item;
    this.ShowSelect = false;
  }

  GoBack() {
    this.router.navigate(['/system', 'my_clients']);
  }

  onCloseSuccessModal() {
    this.router.navigate(['/system', 'my_clients']);
  }
}
