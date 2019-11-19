import { Component, OnInit, OnDestroy, ChangeDetectorRef, HostListener, ElementRef } from '@angular/core';
import { Router, NavigationStart, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Button } from 'protractor';
import { AuthService } from 'src/app/core/services/auth.service';
import { MakeReportStateModel } from '../../../core/models/reports.model';
import { ReportsService } from '../reports.service';

import {Location} from '@angular/common';


@Component({
  selector: 'app-report-cmp',
  templateUrl: './report.component.html'
})
export class ReportComponent implements OnInit
{
    Type = "";
    MakeParams = {
        begin_date: "",
        end_date: "",
        stores: [],
        loyalty_programs: [],
        promotions: [],
        operators:[]
    };
    NameDics = {
        general: "Общий отчет",
        orders: "Отчёт о покупках",
        clients: "Отчёт о покупателях",
        sms: "СМС-отчет"
    };

    ColumnsWidth = {
        date: 10,
        normal_price: 10,
        write_off_points: 10,
        final_price: 10,
        store: 10,
        loyalty: 10,
        customer: 20,
        operator: 20
    };

    TableData: any = {};
    ArrayData: any = [];

    StoresString = "";
    OperatorsString = "";
    PromotionsString = "";

    ReportsFieldsLabels = {
        general: {
            "accrued_points" : "Всего бонусов выдано",
            "average_price": "Величина среднего чека",
            "cards_count": "Количество карт с покупками",
            "clients_count": "Количество новых покупателей (зарегистрированных в указанный период)",
            "orders_count": "Количество покупок",
            "written_off_points": "Всего бонусов списано"
        },
        sms: {
            "total_count": "Всего СМС",
            "registered_count": "Всего приветственных СМС отправлено",
            "points_accrued_count": "Всего СМС о начислении бонусов отправлено",
            "points_written_off_count": "Всего СМС о списании бонусов отправлено",
            "points_burned_count": "Всего СМС о сгорании бонусов отправлено",
            "recommended_count": "Всего СМС о начислении бонусов по системе рекомендации"
        },
    };

    ReportFields = {
        general: [
            "clients_count",
            "orders_count",
            "cards_count",
            "average_price",
            "accrued_points",
            "written_off_points"
        ],
        sms: [
            "total_count",
            "registered_count",
            "points_accrued_count",
            "points_written_off_count",
            "points_burned_count",
            "recommended_count"
        ],
        clients: [],
        orders: []
    };
    constructor(private _location: Location, private auth: AuthService, private router: Router, private route: ActivatedRoute, private service: ReportsService)
    {
        this.route.params.subscribe(params=> {
            if(params && params['id'])
            {
              this.Type = params['id'];
            }
        });

        this.route.queryParams.subscribe(params => {
            for(const i in this.MakeParams)
            {
                if(this.MakeParams[i] instanceof Array)
                {
                    if(params[i])
                    {
                        if(params[i] instanceof Array)
                        {
                            for(const item of params[i])
                            {
                                this.MakeParams[i].push(item);
                            }
                        }
                        else{
                            this.MakeParams[i].push(params[i]);
                        }
                    }
                }
                else
                {
                    if(params[i])
                        this.MakeParams[i] = params[i];
                }
            }
        });

        this.service.onOperatorsChange$.subscribe(
            res => {
                this.UpdateOperatorsString();
            }
        )

        this.service.onStoresChange$.subscribe(
            res => {
                this.UpdateStoresString();
            }
        )

        this.service.onPromotionsChange$.subscribe(
            res => {
                this.UpdatePromotionsString();
            }
        )
    }

    ngOnInit(): void
    {
        this.GetReport();
        this.UpdatePromotionsString();
        this.UpdateStoresString();
        this.UpdateOperatorsString();
    }

    GetReport()
    {
        let params = {};
        for(const i in this.MakeParams)
        {
            if(this.MakeParams[i] instanceof Array)
            {
                if(this.MakeParams[i].length > 0)
                {
                    params[i] = this.MakeParams[i];
                }
            }
            else
            {
                if(this.MakeParams[i])
                {
                    params[i] = this.MakeParams[i];
                }
            }
        }
        this.service.GetReport(this.Type, params, 
            (res) => {
                this.ParseData(res);
            },
            (err) => {
            }
        );
    }

    ParseData(data)
    {
        if(this.Type == "general" || this.Type == "sms")
        {
            let result: any = data;
            if(this.Type = "general")
            {
                result.accrued_points /= 100;
                result.average_price /= 100;
                result.written_off_points /= 100;
            }
            this.TableData = result;
        }
        else{
            if(this.Type == "orders")
            {
                let result: any[] = [];
                for(const item of data)
                {
                    let model = {
                        date: item.created_at,
                        normal_price: item.price / 100,
                        write_off_points: item.write_off_points ? item.write_off_points / 100 : 0,
                        final_price: (item.price - (item.write_off_points ? item.write_off_points : 0)) / 100,
                        loyalty: item.loyalty_program && item.loyalty_program.name ? item.loyalty_program.name : "",
                        customer: "",
                        operator: "",
                        store: item.store && item.store.name ? item.store.name : ""
                    };
                    model.customer = item.user.first_name + " " + (item.user.second_name ? item.user.second_name + " " : "") + item.user.last_name;
                    model.operator = item.operator ? (item.operator.first_name + " " + (item.operator.second_name ? item.operator.second_name + " " : "") + item.operator.last_name) : "";
                    result.push(model);
                }
                this.ArrayData = result;
            }
            else{
                this.ArrayData = data;
            }
            
        }
    }

    UpdateOperatorsString()
    {
        const base = "Все кассиры";

        let result = [];
        const operators = this.service.GetOperators();

        if(this.MakeParams.operators && this.MakeParams.operators.length > 0)
        {
            for(const i of this.MakeParams.operators)
            {
                const index = operators.findIndex(obj => i == obj.id);
                if(index >= 0)
                {
                    result.push((operators[index].first_name + " " + (operators[index].second_name ? operators[index].second_name + " " : "") + operators[index].last_name));
                }
            }
        }
        this.OperatorsString = result.length ? result.join(", ") : base;
    }

    UpdateStoresString()
    {
        const base = "Все магазины";
        let result = [];
        const stores = this.service.GetStores();

        if(this.MakeParams.stores && this.MakeParams.stores.length > 0)
        {
            for(const i of this.MakeParams.stores)
            {
                const index = stores.findIndex(obj => i == obj.id);
                if(index >= 0)
                {
                    result.push(stores[index].name);
                }
            }
        }

        this.StoresString = result.length ? result.join(", ") : base;
    }

    UpdatePromotionsString()
    {
        const base = "Все акции";
        let result = [];
        const promotions = this.service.GetPromotions();
        if(this.MakeParams.promotions && this.MakeParams.promotions.length > 0)
        {
            for(const i of this.MakeParams.promotions)
            {
                const index = promotions.findIndex(obj => i == obj.id && obj.loyalty == 0);
                if(index >= 0)
                {
                    result.push(promotions[index].name);
                }
            }
        }

        if(this.MakeParams.loyalty_programs && this.MakeParams.loyalty_programs.length > 0)
        {
            for(const i of this.MakeParams.loyalty_programs)
            {
                const index = promotions.findIndex(obj => i == obj.id && obj.loyalty == 1);
                if(index >= 0)
                {
                    result.push(promotions[index].name);
                }
            }
        }

        this.PromotionsString = result.length ? result.join(", ") : base;
    }

    GoBack()
    {
        this._location.back();
    }



}
