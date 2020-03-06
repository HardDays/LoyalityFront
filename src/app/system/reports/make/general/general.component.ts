import { Component, OnInit, OnDestroy, ChangeDetectorRef, HostListener, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { Button } from 'protractor';
import { AuthService } from 'src/app/core/services/auth.service';
import { MakeReportStateModel } from '../../../../core/models/reports.model';
import { ReportsService } from '../../reports.service';
import { PromotionModel } from '../../../../core/models/promotion.model';
import { PromotionsAccessGuard } from '../../../promotions/promotions.guard';
import { StoreModel } from '../../../../core/models/store.model';
import { OperatorModel } from '../../../../core/models/operator.model';
import { IMyDpOptions } from 'mydatepicker';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-make-general-report-cmp',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class MakeGeneralReportComponent implements OnInit {
  @Input() State: MakeReportStateModel = new MakeReportStateModel();

  @Output() OnChangeState = new EventEmitter<MakeReportStateModel>();



  myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy',
    dayLabels: {
      su: 'Вс', mo: 'Пн', tu: 'Вт', we: 'Ср', th: 'Чт', fr: 'Пт', sa: 'Сб'
    },
    monthLabels: {
      1: 'Янв', 2: 'Фев', 3: 'Мар', 4: 'Апр', 5: 'Май', 6: 'Июн', 7: 'Июл', 8: 'Авг', 9: 'Сен', 10: 'Окт', 11: 'Ноя', 12: 'Дек'
    },
    showTodayBtn: false,
    // disableUntil: this.GetDisableUntilData(new Date()),
    showClearDateBtn: false,
    height: '28px',
    openSelectorOnInputClick: true
  };

  MakeParams = {
    begin_date: "",
    end_date: "",
    stores: [],
    loyalty_programs: [],
    promotions: [],
    operators: []
  };

  NameDics = {
    general: "Общий отчет",
    orders: "Отчёт о покупках",
    clients: "Отчёт о покупателях",
    sms: "СМС-отчет"
  };

  Form: FormGroup = new FormGroup({
    "begin_date": new FormControl('', []),
    "end_date": new FormControl('', [])
  });

  SelectsOpened = {
    promotions: false,
    stores: false,
    operators: false
  };

  Promotions: any[] = [];
  SelectedPromotions: any[] = [];

  Stores: StoreModel[] = [];
  SelectedStores: StoreModel[] = [];

  Operators: OperatorModel[] = [];
  SelectedOperators: OperatorModel[] = [];

  constructor(private auth: AuthService, private service: ReportsService, private router: Router) {
    this.service.onOperatorsChange$.subscribe(Val => {
      if (Val)
        this.UpdateOperators();
    })

    this.service.onPromotionsChange$.subscribe(Val => {
      if (Val)
        this.UpdatePromotions();
    })

    this.service.onStoresChange$.subscribe(Val => {
      if (Val)
        this.UpdateStores();
    })

  }

  ngOnInit(): void {
    this.UpdateOperators();
    this.UpdatePromotions();
    this.UpdateStores();
  }

  OnHeaderClick() {
    this.State.opened = !this.State.opened;
    this.OnChangeState.emit(this.State);
  }

  UpdateOperators() {
    this.Operators = this.service.GetOperators();
  }

  SelectOperator(item: OperatorModel) {
    const index = this.SelectedOperators.findIndex(obj => obj.id == item.id)
    if (index < 0) {
      this.SelectedOperators.push(item);
    }
  }

  UnselectOperator(item: OperatorModel) {
    this.SelectedOperators = this.SelectedOperators.filter(obj => obj.id != item.id);
  }

  UpdateStores() {
    this.Stores = this.service.GetStores();
  }

  SelectStore(item: StoreModel) {
    const index = this.SelectedStores.findIndex(obj => obj.id == item.id)
    if (index < 0) {
      this.SelectedStores.push(item);
    }
  }

  UnselectStore(item: StoreModel) {
    this.SelectedStores = this.SelectedStores.filter(obj => obj.id != item.id);
  }

  UpdatePromotions() {
    this.Promotions = this.service.GetPromotions();
  }

  SelectPromotion(item: PromotionModel) {
    const index = this.SelectedPromotions.findIndex(obj => obj.id == item.id)
    if (index < 0) {
      this.SelectedPromotions.push(item);
    }
  }

  UnselectPromotion(item: PromotionModel) {
    this.SelectedPromotions = this.SelectedPromotions.filter(obj => obj.id != item.id);
  }

  OnClickOutside($event: string) {
    this.SelectsOpened[$event] = false;
  }

  OnClickSelect($event: string) {
  }

  Save() {
    const remove_error = (property_name) => {
      if (this.Form.controls[property_name].hasError('wrong')) {
        this.Form.controls[property_name].setErrors({
          'wrong': null
        });
        this.Form.controls[property_name].updateValueAndValidity();
      }
    }

    for (const i in this.Form.controls) {
      this.Form.controls[i].markAsDirty();
      this.Form.controls[i].markAsTouched();
      remove_error(i);
      this.Form.controls[i].updateValueAndValidity();
    }

    let hasError = false;
    const data = this.Form.getRawValue();

    if (data.begin_date.epoc && data.end_date.epoc) {
      if (data.begin_date.epoc > data.end_date.epoc) {
        this.Form.controls.end_date.setErrors({
          'wrong': true
        });
        hasError = true;
      }
    }
    this.Form.updateValueAndValidity();
    if (hasError) {
      return;
    }

    this.MakeParams.begin_date = data.begin_date && data.begin_date.formatted ? data.begin_date.formatted : "";
    this.MakeParams.end_date = data.end_date && data.end_date.formatted ? data.end_date.formatted : "";

    this.MakeParams.stores = [];
    for (const item of this.SelectedStores) {
      this.MakeParams.stores.push(item.id);
    }

    this.MakeParams.operators = [];
    for (const item of this.SelectedOperators) {
      this.MakeParams.operators.push(item.id);
    }


    this.MakeParams.promotions = [];
    this.MakeParams.loyalty_programs = [];

    for (const item of this.SelectedPromotions) {
      if (item.loyalty) {
        this.MakeParams.loyalty_programs.push(item.id);
      }
      else {
        this.MakeParams.promotions.push(item.id);
      }
    }
    let params = {};
    for (const i in this.MakeParams) {
      if (this.MakeParams[i] instanceof Array) {
        if (this.MakeParams[i].length > 0) {
          params[i] = this.MakeParams[i];
        }
      }
      else {
        if (this.MakeParams[i]) {
          params[i] = this.MakeParams[i];
        }
      }
    }
    // console.log(this.MakeParams, params);

    this.router.navigate(["system", "reports", "get", this.State.type], { queryParams: params })
    // console.log(this.MakeParams);
    // console.log(this.State);
  }

}
