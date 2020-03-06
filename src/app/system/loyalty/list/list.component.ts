import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PromotionModel } from 'src/app/core/models/promotion.model';
import { LoyaltyService } from '../loyalty.service';
import { LoyaltyLevelModel, LoyaltyModel } from '../../../core/models/loyalty.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-loyalty-list-cmp',
  templateUrl: './list.component.html'
})
export class LoyaltyListComponent implements OnInit {

    ShowModal = false;
    ProgramSaved = false;
    ProgramDoesNotExists = false;
    DeleteSuccess = false;
    Levels: LoyaltyLevelModel[] = [];
    Loyalty : LoyaltyModel = new LoyaltyModel();
    LevelForDelete: LoyaltyLevelModel = new LoyaltyLevelModel();

  constructor(
      private auth: AuthService,
      private router: Router,
      private route: ActivatedRoute,
      private service: LoyaltyService)
  {
    this.service.onLoyaltyChange$.subscribe((res) => {
        if(res)
        {
            this.UpdateData();
        }
    })
  }

  ngOnInit()
  {
    this.service.RefreshLoyalty();
  }

  UpdateData()
  {
    const loyalty = this.service.GetLoyalty();
    if(loyalty)
    {
      this.Levels = loyalty.loyalty_levels;
      this.Loyalty = loyalty;
    }
  }

  DeleteLevel()
  {
    this.ShowModal = false;
    this.service.DeleteLevel(this.LevelForDelete.id,
        (res) => {
            this.DeleteSuccess = true;
            this.service.RefreshLoyalty();
        },
        (err) => {

        }
    )
  }

  CreateNewLevel()
  {
    const exists = this.service.IsLoyaltyValid();
    if(!exists)
    {
        this.ProgramDoesNotExists = true;
        return;
    }

    this.router.navigate(["/system","my_loyalty_program","level", "new"]);
  }


}
