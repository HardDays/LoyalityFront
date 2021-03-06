import { Component, OnInit, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IDictionary, IStringToAny } from 'src/app/core/interfaces/dictionary.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StoreModel } from '../../../core/models/store.model';
import { OperatorModel } from '../../../core/models/operator.model';
import { PromotionsService } from '../promotions.service';
import { PromotionModel } from 'src/app/core/models/promotion.model';

@Component({
  selector: 'app-promotion-list-cmp',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class PromotionsListComponent implements OnInit {

  Promotions: PromotionModel[] = [];
  PromotionDelete: PromotionModel = new PromotionModel();
  ShowModal = false;
  DeleteResult = "";
  QueryString = "";
  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private service: PromotionsService) {
    this.service.onPromotionsChange$.subscribe((res) => {
      if (res) {
        this.UpdatePromotions();
      }
    })
  }

  ngOnInit() {
    this.service.RefreshPromotions();
  }

  UpdatePromotions(q?: string) {
    const promotions: PromotionModel[] = this.service.GetPromotions();
    const _q = q ? q.toLowerCase() : "";
    this.Promotions = q ? promotions.filter((obj) => obj.name.toLowerCase().indexOf(_q) >= 0) : promotions;
  }

  DeletePromotion(Item: PromotionModel) {
    this.ShowModal = false;
    this.service.DeletePromotion(Item.id,
      (res) => {
        this.DeleteResult = "Акция  «" + Item.name + "» успешно удалена!";
        this.service.RefreshPromotions();
      },
      (err) => {
        this.DeleteResult = "Не получилось удалить акцию  «" + Item.name + "»!";
      })
  }

  DeletePromotionQA(Item: PromotionModel) {
    this.PromotionDelete = Item;
    this.ShowModal = true;
  }
}
