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


@Component({
  selector: 'app-make-general-report-cmp',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class MakeGeneralReportComponent implements OnInit
{
    @Input() State: MakeReportStateModel = new MakeReportStateModel();

    @Output() OnChangeState = new EventEmitter<MakeReportStateModel>();

    myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'dd.mm.yyyy',
        dayLabels: {
            su: 'Вс', mo: 'Пн', tu: 'Вт', we: 'Ср', th: 'Чт', fr: 'Пт', sa: 'Сб'
        },
        monthLabels:{
            1: 'Янв', 2: 'Фев', 3: 'Мар', 4: 'Апр', 5: 'Май', 6: 'Июн', 7: 'Июл', 8: 'Авг', 9: 'Сен', 10: 'Окт', 11: 'Ноя', 12: 'Дек'
        },
        showTodayBtn: false,
        // disableUntil: this.GetDisableUntilData(new Date()),
        showClearDateBtn: false,
        height: '28px',
        openSelectorOnInputClick: true
      };

    NameDics = {
        general: "Общий отчет",
        orders: "Отчёт о покупках",
        clients: "Отчёт о покупателях",
        sms: "СМС-отчет"
    };

    SelectsOpened = {
        promotions : false,
        stores: false,
        operators: false
    };

    Promotions: PromotionModel[] = [];
    SelectedPromotions: PromotionModel[] = [];

    Stores: StoreModel[] = [];
    SelectedStores: StoreModel[] = [];

    Operators: OperatorModel[] = [];
    SelectedOperators: OperatorModel[] = [];

    constructor(private auth: AuthService, private service: ReportsService)
    {  
        this.service.onOperatorsChange$.subscribe(Val => {
            if(Val)
                this.UpdateOperators();
        })

        this.service.onPromotionsChange$.subscribe(Val => {
            if(Val)
                this.UpdatePromotions();
        })

        this.service.onStoresChange$.subscribe(Val => {
            if(Val)
                this.UpdateStores();
        })
        
    }

    ngOnInit(): void
    {
    }

    OnHeaderClick()
    {
        this.State.opened = !this.State.opened;
        this.OnChangeState.emit(this.State);
    }

    UpdateOperators()
    {
        this.Operators = this.service.GetOperators();
        console.log(this.Operators);
    }

    SelectOperator(item: OperatorModel)
    {
        const index = this.SelectedOperators.findIndex(obj => obj.id == item.id)
        if(index < 0)
        {
            this.SelectedOperators.push(item);
        }
    }

    UnselectOperator(item: OperatorModel)
    {
        this.SelectedOperators = this.SelectedOperators.filter(obj => obj.id != item.id);
    }

    UpdateStores()
    {
        this.Stores = this.service.GetStores();
    }

    SelectStore(item: StoreModel)
    {
        const index = this.SelectedStores.findIndex(obj => obj.id == item.id)
        if(index < 0)
        {
            this.SelectedStores.push(item);
        }
    }

    UnselectStore(item: StoreModel)
    {
        this.SelectedStores = this.SelectedStores.filter(obj => obj.id != item.id);
    }

    UpdatePromotions()
    {
        this.Promotions = this.service.GetPromotions();
    }

    SelectPromotion(item: PromotionModel)
    {
        const index = this.SelectedPromotions.findIndex(obj => obj.id == item.id)
        if(index < 0)
        {
            this.SelectedPromotions.push(item);
        }
    }

    UnselectPromotion(item: PromotionModel)
    {
        this.SelectedPromotions = this.SelectedPromotions.filter(obj => obj.id != item.id);
    }

    OnClickOutside($event: string)
    {
        this.SelectsOpened[$event] = false;
    }

    OnClickSelect($event: string)
    {
        console.log($event);
    }

}
