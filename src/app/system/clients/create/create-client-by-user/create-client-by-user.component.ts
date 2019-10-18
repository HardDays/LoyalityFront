import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-client-by-user',
  templateUrl: './create-client-by-user.component.html',
  styleUrls: ['./create-client-by-user.component.scss']
})
export class CreateClientByUserComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit() {
  }

  GoBack() {
      this._location.back();
  }

}
