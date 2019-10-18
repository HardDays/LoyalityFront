import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IDictionary } from 'src/app/core/interfaces/dictionary.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientsService } from '../clients.service';

@Component({
  selector: 'app-client-edit-cmp',
  templateUrl: './edit.component.html'
})
export class ClientsEditComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
