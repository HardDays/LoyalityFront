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
  onEditCard(s: string) {
    this.SearchParams.card_number = s;
    this.searchClient();
  }

  searchClient() {
    this.SelectedClient = new ClientModel();
    const params = this.ConvertToBackType(this.SearchParams);
    if (params.name || params.phone || params.card_number) {
      this.clientsService.GetClient(
        params,
        (res: ClientModel[]) => {
          this.Clients = res;
        });
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
