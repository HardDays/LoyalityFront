import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IDictionary } from 'src/app/core/interfaces/dictionary.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StoresService } from '../stores.service';
import { StoreModel } from '../../../core/models/store.model';

@Component({
  selector: 'app-store-list-cmp',
  templateUrl: './list.component.html'
})
export class StoreListComponent implements OnInit {

Stores: StoreModel[] = [];
  constructor(
      private auth: AuthService, 
      private router: Router, 
      private route: ActivatedRoute,
      private service: StoresService)
  {
    this.service.onStoresChange$.subscribe((res) => {
        if(res)
        {
            this.UpdateStores();
        }
    })
  }

  ngOnInit()
  {
      this.service.RefreshStores();
  }

  UpdateStores()
  {
    this.Stores = this.service.GetStores();

    const mores = document.getElementsByClassName('main-blocks__link--more');
    const shopBlock = document.getElementById('shop-blocks');

    // setTimeout(
    //     ()=>{
    //         for(const i in mores)
    //         {
    //             const item = mores[i];
    //             item.addEventListener('click', function(event) {
    //                 event.stopPropagation();
    //                 const itemBlock = this.parentElement.parentElement;
    //                 console.log(itemBlock);
    //                 itemBlock.classList.add('main-blocks__item--opened');
    //                 itemBlock.style.height = itemBlock.offsetHeight + 'px';
    //                 itemBlock.firstElementChild.classList.add('main-blocks__item-absolute--active');
    //                 item.classList.add('main-blocks__link--hidden');
    //                 item.nextElementSibling.classList.add('more-cashiers--visible');
    //                 shopBlock.classList.add('main-blocks--opened_item');
    //             });
    //         }
    //         document.getElementsByTagName('body')[0].addEventListener('click', function() {
    //             if (shopBlock) {
    //                 shopBlock.classList.remove('main-blocks--opened_item');
    //                 document.getElementsByClassName('more-cashiers--visible')[0].classList.remove('more-cashiers--visible');
    //                 document.getElementsByClassName('main-blocks__link--hidden')[0].classList.remove('main-blocks__link--hidden');
    //                 document.getElementsByClassName('main-blocks__item--opened')[0].classList.remove('main-blocks__item--opened');
    //             }
    //         });
    //     }
    // )
  }




}
