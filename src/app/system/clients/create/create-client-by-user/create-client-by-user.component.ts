import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-client-by-user',
  templateUrl: './create-client-by-user.component.html',
  styleUrls: ['./create-client-by-user.component.scss']
})
export class CreateClientByUserComponent implements OnInit {

  Form: FormGroup = new FormGroup({
    'name': new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]),
    'country': new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]),
    'city': new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]),
    'street': new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]),
    'house': new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.max(9999)
    ]),
    "store_id": new FormControl('',[
      Validators.required
    ])
  });

  get name() {
    return this.Form.get('name');
  }
  get country() {
    return this.Form.get('country');
  }
  get city() {
    return this.Form.get('city');
  }
  get street() {
    return this.Form.get('street');
  }
  get house() {
    return this.Form.get('house');
  }

  SelectedStore = null;
  ShowSelect = false;

  LoalityProgramm = [
    {id: 1, name: 'Первая акция'},
    {id: 2, name: 'Вторая акция'},
    {id: 3, name: 'Третья акция'}
  ];

  constructor(private _location: Location) { }

  ngOnInit() {
  }

  GoBack() {
      this._location.back();
  }

  Save() {
  }



  OnSelected(item)
  {
    this.SelectedStore = item;
    this.Form.controls.store_id.setValue(this.SelectedStore.id);
    this.ShowSelect = false;
  }

}
