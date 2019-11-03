import { LoyaltyProgramsService } from './../../../promotions/loyalty.service';
import { ClientsService } from './../../clients.service';
import { Component, OnInit } from '@angular/core';
import { PromotionsService } from 'src/app/system/promotions/promotions.service';
import { ClientModel } from 'src/app/core/models/client.model';
import { PromotionModel } from 'src/app/core/models/promotion.model';

@Component({
  selector: 'app-edit-paid',
  templateUrl: './edit-paid.component.html',
  styleUrls: ['./edit-paid.component.scss']
})
export class EditPaidComponent implements OnInit {

  Client = this.clientsService.Client;
  Order = this.clientsService.newOrder;

  Bonuses = {
    All: 10000,
    Available: 0
  };
  WrireBonuses = 0;
  hasErrorBonuses = false;

  isModalOpened = false;


  constructor(
    protected clientsService: ClientsService,
    private promotionsService: PromotionsService,
    private loyaltyService: LoyaltyProgramsService) { }

  ngOnInit() {
    console.log(`Client = `, this.Client);
    console.log(`Order = `, this.Order);

    // this.Bonuses.All = this.Client.points;

    if (!this.Order.promotion_id) {
      this.getLoyalty();
    } else {
      this.getPromotion();
    }
  }

  getLoyalty() {
    this.loyaltyService.GetLoyalty(this.Client.loyalty_program_id,
      (data) => {
        console.log(`data = `, data);
        const curLoyalty = data['loyalty_levels'][0];
        this.getAvailableBonus(
          curLoyalty.write_off_rule,
          curLoyalty.write_off_limited,
          curLoyalty.write_off_min_price,
          curLoyalty.write_off_rule_points,
          curLoyalty.write_off_rule_percent
        );
      }
    );
  }

  getPromotion() {
    const promotion: PromotionModel = this.promotionsService.GetPromotions().find(x => x.id === this.Order.promotion_id);
    console.log(promotion);
    this.getAvailableBonus(
      promotion.write_off_rule,
      promotion.write_off_limited,
      promotion.write_off_min_price,
      promotion.write_off_rule_points,
      promotion.write_off_rule_percent
    );
  }

  getAvailableBonus(write_off_rule, write_off_limited, write_off_min_price, write_off_rule_points, write_off_rule_percent) {
    this.Bonuses.Available = 0;
    if (write_off_rule === 'write_off_convert') {
      if (write_off_limited)  {
        if (this.Order.price < write_off_min_price) {
          return;
        }
      }
      if (this.Bonuses.All < write_off_rule_points) {
        return;
      }

      let maxWriteOff = (this.Order.price * write_off_rule_percent) / 100;

      if (maxWriteOff > this.Bonuses.All) {
        maxWriteOff = this.Bonuses.All;
      }

      this.Bonuses.Available = maxWriteOff;
    }
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
