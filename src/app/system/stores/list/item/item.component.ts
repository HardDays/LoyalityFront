import { Component, OnInit, Input, ElementRef, HostListener } from '@angular/core';
import {Location} from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IDictionary } from 'src/app/core/interfaces/dictionary.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StoreModel } from '../../../../core/models/store.model';

@Component({
  selector: 'app-store-list-item-cmp',
  templateUrl: './item.component.html'
})
export class StoreListItemComponent implements OnInit {

    @Input() Item: StoreModel;
    Errors: IDictionary = {} as IDictionary;
    ErrorMsgs: IDictionary = {} as IDictionary;

    Expanded = false;

    Addr:string = "";
    constructor(private _location: Location, private auth: AuthService, private router: Router, private route: ActivatedRoute, private _eref: ElementRef)
    {

    }

    @HostListener('document:click', ['$event'])
    clickout(event) {
        event.stopPropagation();
      if(!this._eref.nativeElement.contains(event.target) && this.Expanded) {
        this.Expanded = false;
      }
    }

    ngOnInit()
    {
        let arr = [];
        if(this.Item.country)
        {
            arr.push(this.Item.country)
        }
        if(this.Item.city)
        {
            arr.push(this.Item.city);
        }
        if(this.Item.street)
        {
            arr.push(this.Item.street);
        }
        if(this.Item.house)
        {
            arr.push(this.Item.house);
        }
        this.Addr = arr.join(", ");
    }

    ShowMore()
    {
        this.Expanded = true;
    }


}
