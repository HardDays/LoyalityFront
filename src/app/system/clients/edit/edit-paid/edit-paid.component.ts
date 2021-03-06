import { LoyaltyProgramsService } from './../../../promotions/loyalty.service';
import { ClientsService } from './../../clients.service';
import { Component, OnInit } from '@angular/core';
import { PromotionsService } from 'src/app/system/promotions/promotions.service';
import { ClientModel } from 'src/app/core/models/client.model';
import { PromotionModel } from 'src/app/core/models/promotion.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-paid',
  templateUrl: './edit-paid.component.html',
  styleUrls: ['./edit-paid.component.scss']
})
export class EditPaidComponent implements OnInit {

  Client = this.clientsService.Client;
  Order = this.clientsService.newOrder;

  Bonuses = {
    All: 0,
    Available: 0
  };
  WrireBonuses = 0;
  hasErrorBonuses = false;

  isModalOpened = false;

  IsLoading = false;

  order_bonus=0;
  constructor(
    protected clientsService: ClientsService,
    private promotionsService: PromotionsService,
    private loyaltyService: LoyaltyProgramsService,
    private router: Router) { }

  ngOnInit() {

    if (!this.Client || !this.Client.id) {
      this.router.navigate(['/system', 'my_clients', 'edit', 'search']);
    }
    console.log(`Client = `, this.Client);
    console.log(`Order = `, this.Order);

    this.Bonuses.All = (+this.Client.points) / 100;
    this.order_bonus=0;
    if (!this.Order.promotion_id) {
      this.getLoyalty();
    } else {
      this.getPromotion();
    }
  }

  getLoyalty() {
    // this.loyaltyService.GetLoyalty(this.Client.loyalty_program_id,
    //   (data) => {
    //     console.log(`data = `, data);
    //     const curLoyaltysFilter = data['loyalty_levels'].filter(x => x.min_price <= this.Order.price);
    //     const curLoyaltysSort = curLoyaltysFilter.sort(
    //       (a, b) => {
    //         return  b.min_price - a.min_price;
    //       }
    //     );
    //     const curLoyalty = curLoyaltysSort[0];
    //     // this.getAvailableBonus(
    //     //   curLoyalty.write_off_rule,
    //     //   curLoyalty.write_off_limited,
    //     //   curLoyalty.write_off_min_price,
    //     //   curLoyalty.write_off_rule_points,
    //     //   curLoyalty.write_off_rule_percent
    //     // );
    this.clientsService.GetLoyaltyPoints(
      this.Client.id,
      +this.Order.price,
      (maxBonuses) => {
        // console.log(`maxBonuses = `, maxBonuses);
        this.Bonuses.Available = (+maxBonuses['points']) / 100;
      }
    );
    //   }
    // );
  }

  getPromotion() {
    const promotion: PromotionModel = this.promotionsService.GetPromotions().find(x => x.id === this.Order.promotion_id);
    console.log(promotion);
    // this.getAvailableBonus(
    //   promotion.write_off_rule,
    //   promotion.write_off_limited,
    //   promotion.write_off_min_price,
    //   promotion.write_off_rule_points,
    //   promotion.write_off_rule_percent
    // );
    this.clientsService.GetPromotionPoints(
      this.Client.id,
      +this.Order.price,
      this.Order.promotion_id,
      (maxBonuses) => {
        // console.log(`maxBonuses = `, maxBonuses);
        this.Bonuses.Available = (+maxBonuses['points']) / 100;
      }
    );
  }

  getLocalAvailableBonus(write_off_rule, write_off_limited, write_off_min_price, write_off_rule_points, write_off_rule_percent) {
    console.log(write_off_rule, write_off_limited, write_off_min_price, write_off_rule_points, write_off_rule_percent);
    this.Bonuses.Available = 0;
    if (write_off_rule === 'write_off_convert') {
      if (write_off_limited) {
        if (this.Order.price < write_off_min_price) {
          return;
        }
      }
      if (this.Bonuses.Available < write_off_rule_points) {
        return;
      }

      let maxWriteOff = (this.Order.price * write_off_rule_percent) / 100;

      if (maxWriteOff > this.Bonuses.Available) {
        maxWriteOff = this.Bonuses.Available;
      }

      this.Bonuses.Available = maxWriteOff;
    }
  }

  onWriteBonusesChange(val: number) {
    if (+val != val) { this.WrireBonuses = 0; return; }
    if (val < 0) { this.WrireBonuses = 0; return; }

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
    this.WrireBonuses = 0;
    this.Order.write_off = 0;
    this.CreateOrder();
  }

  CreateOrder() {
    this.IsLoading = true;
    if (this.Order.promotion_id) {
      this.clientsService.CreateOrderForPromotion(
        this.Client.id,
        this.Order.promotion_id,
        +this.Order.price,
        +this.Order.write_off,
        (res) => {
          this.clientsService.GetPromotionPoints(this.Client.id,this.Order.price,this.Order.promotion_id,
            (res)=>{
              this.order_bonus=res.points/100
              this.IsLoading = false;
              this.checkNewUserInfo();
              this.isModalOpened = true;
            },
              (err)=>
              {
                this.IsLoading = false;
                console.log(err);
              }
            )

        },
        (err) => {
          this.IsLoading = false;
          console.log(err);
        }
      );
    } else {
      this.clientsService.CreateOrderForLoyalty(
        this.Client.id,
        +this.Order.price,
        +this.Order.write_off,
        (res) => {

          this.clientsService.GetPromotionPoints(this.Client.id,this.Order.price,this.Order.promotion_id,
            (res)=>{
              this.order_bonus=res.points/100
              this.IsLoading = false;
              this.checkNewUserInfo();
              this.isModalOpened = true;
            },
              (err)=>
              {
                this.IsLoading = false;
                console.log(err);
              }
            )

        },
        (err) => {
          this.IsLoading = false;
          console.log(err);
        }
      );
    }
  }

  checkNewUserInfo() {
    // this.clientsService.GetClient();
  }

  closeSuccessModal() {
    this.isModalOpened = false;
    this.router.navigate(['/system', 'my_clients', 'start']);
  }


}
