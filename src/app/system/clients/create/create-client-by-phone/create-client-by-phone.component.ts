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
      this.service.CheckClientPhone(this.Phone,
        (res: boolean) => {
          if (res) {
            if (error && typeof (error) === 'function') {
              error('Номер телефона уже зарегистрирован!');
            }
          } else {
            if (success && typeof (success) === 'function') {
              success();
            }
          }
        },
        (err) => {
          if (error && typeof (error) === 'function') {
            error();
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
