import { ClientsService } from './../../clients.service';
import { Component, OnInit } from '@angular/core';
import { ClientModel } from 'src/app/core/models/client.model';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {

  Client = new ClientModel();
  constructor(protected clientsService: ClientsService) { }

  ngOnInit() {
    this.Client = this.clientsService.Client;
    console.log(this.Client);
  }

}
