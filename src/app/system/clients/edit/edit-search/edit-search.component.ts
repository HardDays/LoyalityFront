import { ValidatorService } from './../../../../core/services/validator.service';
import { ClientsService } from './../../clients.service';
import { Component, OnInit } from '@angular/core';
import { ClientModel } from 'src/app/core/models/client.model';

@Component({
  selector: 'app-edit-search',
  templateUrl: './edit-search.component.html',
  styleUrls: ['./edit-search.component.scss']
})
export class EditSearchComponent implements OnInit {

  SearchParams = {
    name: '',
    phone: '',
    card: ''
  };
  isUserFounded = false;
  isFoundedMoreThanOne = false;
  Mask = ValidatorService.MaskPhoneRUwithout7;
  constructor(protected clientsService: ClientsService) { }

  ngOnInit() {
  }

  onEditName(s: string) {
    this.SearchParams.name = s;
    this.searchClient();
  }
  onEditPhone(s: string) {
    this.SearchParams.phone = s;
    this.searchClient();
  }

  searchClient() {
    this.isUserFounded = false;
    this.isFoundedMoreThanOne = false;
    const params = this.ConvertToBackType(this.SearchParams);
    if (params.name || params.phone || params.card) {
      this.clientsService.GetClient(
        params,
        (res: ClientModel[]) => {
          console.log(`res = `, res);
          if (res.length === 1) {
            this.isUserFounded = true;
          } else if (res.length > 1) {
            console.log('Больше одного аккаунта!');
            this.isFoundedMoreThanOne = true;
          } else {
            console.log('Нет аккаунтов!');
          }
        });
    }
  }

  ConvertToBackType(params) {
    if (params['phone']) {
      params['phone'] = params['phone'].replace(/ /g, '').replace(/\(/g, '').replace(/\)/g, '').replace(/\+/g, '').replace(/_/g, '');
    }
    return params;
  }

}
