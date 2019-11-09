import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PromotionModel } from 'src/app/core/models/promotion.model';
import { LoyaltyService } from '../loyalty.service';

@Component({
  selector: 'app-loyalty-list-cmp',
  templateUrl: './list.component.html'
})
export class LoyaltyListComponent implements OnInit {

Promotions: PromotionModel[] = [];
QueryString = "";
  constructor(
      private auth: AuthService, 
      private router: Router, 
      private route: ActivatedRoute,
      private service: LoyaltyService)
  {
    this.service.onPromotionsChange$.subscribe((res) => {
        if(res)
        {
            this.UpdatePromotions();
        }
    })
  }

  ngOnInit()
  {
    this.service.RefreshPromotions();
  }

  UpdatePromotions(q?:string)
  {
    const promotions: PromotionModel[] = this.service.GetPromotions();
    const _q = q ? q.toLowerCase() : "";
    this.Promotions = q ? promotions.filter((obj) => obj.name.toLowerCase().indexOf(_q) >=0 ) : promotions;
  }

  DeletePromotion(Item)
  {
      this.service.DeletePromotion(Item.id, 
          (res) => {
              this.service.RefreshPromotions();
          },
          (err) => {

          })
  }
}
