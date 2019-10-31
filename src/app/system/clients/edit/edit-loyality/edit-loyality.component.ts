import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../clients.service';
import { ClientModel } from 'src/app/core/models/client.model';

@Component({
  selector: 'app-edit-loyality',
  templateUrl: './edit-loyality.component.html',
  styleUrls: ['./edit-loyality.component.scss']
})
export class EditLoyalityComponent implements OnInit {

  Client = new ClientModel();
  constructor(protected clientsService: ClientsService) { }

  ngOnInit() {
    this.Client = this.clientsService.Client;
    console.log(this.Client);
  }

}
