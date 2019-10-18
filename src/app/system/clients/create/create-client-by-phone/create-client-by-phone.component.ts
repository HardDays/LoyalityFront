import { ValidatorService } from './../../../../core/services/validator.service';
import { ClientsService } from './../../clients.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-client-by-phone',
  templateUrl: './create-client-by-phone.component.html',
  styleUrls: ['./create-client-by-phone.component.scss']
})
export class CreateClientByPhoneComponent implements OnInit {

  Phone = '';
  ErrorText = '';

  MaskPhoneRU = ValidatorService.MaskPhoneRU();

  constructor(private _location: Location,
    private _router: Router,
    private service: ClientsService
  ) { }

  ngOnInit() {
  }

  GoBack() {
      this._location.back();
  }

  clickNextStep() {
    this.VerifyPhone(
      () => this.SavePhoneAndNavigate(),
      (err) => this.ShowErrorPhoneNumber(err)
    );
  }

  VerifyPhone(success: () => void, error: (err?) => void) {
    if (this.Phone.indexOf('_') > -1) {
      error('Неккоректный номер телефона!');
    } else {
      this.service.CreateClient(
        {
          phone: this.Phone
        },
        () => {
          if (success && typeof(success) === 'function') {
            success();
          }
        },
        (err) => {
          if (
              Object.keys(err.json())
                .findIndex(x => x === 'phone') > -1
            ) {
            if (error && typeof(error) === 'function') {
              if (err.json()['phone'][0] === 'ALREADY_TAKEN') {
                error('Номер телефона уже зарегистрирован!');
              } else {
                error();
              }
            }
          } else if (success && typeof(success) === 'function') {
            success();
          }
        }
      );
    }
  }


  SavePhoneAndNavigate() {
    this.service.Client.phone = this.Phone;
    this.NavigateToCreateUser();
  }
  NavigateToCreateUser() {
    this._router.navigate(['/system', 'my_clients', 'create', 'user']);
  }

  ShowErrorPhoneNumber(err?: string) {
    if (err) {
      this.ErrorText = err;
    } else {
      this.ErrorText = 'Возникла ошибка!';
    }
  }

}
