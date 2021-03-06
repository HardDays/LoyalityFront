import { LoyaltyProgramsService } from './../../../promotions/loyalty.service';
import { ClientsService } from './../../clients.service';
import { AuthService } from './../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-client-confirm-phone',
  templateUrl: './create-client-confirm-phone.component.html',
  styleUrls: ['./create-client-confirm-phone.component.scss']
})
export class CreateClientConfirmPhoneComponent implements OnInit {

  Phone = '';
  Code = '';

  hasError = false;

  IsLoading = false;

  constructor(
    private authService: AuthService,
    private clientService: ClientsService,
    private router: Router,
    private loyaltyService: LoyaltyProgramsService
  ) { }

  ngOnInit() {
    this.IsLoading = true;
    // this.GetCurrentLoyalty();
    this.Phone = this.clientService.Client.phone;
    if (!this.Phone) {
      this.IsLoading = false;
      this.router.navigate(['/system', 'my_clients', 'create']);
    }
    this.GetCurrentLoyalty();
  }

  ConfirmCode() {
    this.hasError = false;
    this.authService.ConfirmWithoutLogin(
      {
        phone: this.Phone,
        code: this.Code
      },
      (res) => {
        this.router.navigate(['/system', 'my_clients', 'create', 'buy']);
      },
      (err) => {
        this.hasError = true;
        // this.router.navigate(['/system', 'my_clients', 'create', 'buy']);
      }
    );
  }

  GoBack() {
    this.router.navigate(['/system', 'my_clients']);
  }

  GetCurrentLoyalty() {
    this.IsLoading = true;
    this.loyaltyService.GetLoyalty(
      this.clientService.Client.loyalty_program_id,
      (res) => {
        console.log(`res loyalty = `, res);
        setTimeout(() => {
          this.IsLoading = false;
        }, 100);
        if (res && res['sms_on_register'] === false) {
          this.router.navigate(['/system', 'my_clients', 'create', 'buy']);
        }
      }, (err) => {
        this.IsLoading = false;
      }
    );
  }

}
