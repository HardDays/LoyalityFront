import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-client-by-phone',
  templateUrl: './create-client-by-phone.component.html',
  styleUrls: ['./create-client-by-phone.component.scss']
})
export class CreateClientByPhoneComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit() {
  }

  GoBack() {
      this._location.back();
  }

}
