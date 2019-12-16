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
    card_number: ''
  };

  Clients: ClientModel[] = [];
  SelectedClient = new ClientModel();

  isUserFounded = false;
  isFoundedMoreThanOne = false;
  Mask = ValidatorService.MaskPhoneRUwithout7;

  isSearching = false;

  constructor(protected clientsService: ClientsService) { }

  ngOnInit() {
    this.clientsService.Client = new ClientModel();
    this.clientsService.newOrder = {
      promotion_id: 0,
      price: 0,
      write_off: 0
    };
  }

  onEditName(s: string) {
    this.SearchParams.name = s;
    // this.searchClient();
  }
  onEditPhone(s: string) {
    this.SearchParams.phone = s;
    // this.searchClient();
  }
  onEditCard(s: string) {
    this.SearchParams.card_number = s;
    // this.searchClient();
  }

  onSearchClientButtonClick() {
    this.searchClient();
  }

  searchClient() {
    this.SelectedClient = new ClientModel();
    const params = this.ConvertToBackType(this.SearchParams);
    this.isSearching = true;
    if (params.name || params.phone || params.card_number) {
      this.clientsService.GetClient(
        params,
        (res: ClientModel[]) => {
          this.Clients = res;
          this.isSearching = false;
        },
        (err) => {
          this.isSearching = false;
        });
    } else {
      this.isSearching = false;
    }
  }

  ConvertToBackType(params) {
    if (params['phone']) {
      params['phone'] = params['phone'].replace(/ /g, '').replace(/\(/g, '').replace(/\)/g, '').replace(/\+/g, '').replace(/_/g, '');
    }
    if (params['name']) {
      params['name'] = params['name'].toLowerCase();
    }
    return params;
  }

  SelectUser(item) {
    this.SelectedClient = item;
    this.clientsService.Client = this.SelectedClient;
  }

}
