import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'password-cmp',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit 
{

  IsSendSuccess = false;
  Form = new FormGroup({
    "email" : new FormControl('', [
      Validators.required,
      Validators.email
    ])
  });

  constructor(private auth: AuthService) {}

  ngOnInit() {
  }

  get email()
  {
    return this.Form.get('email');
  }
  ResetPw()
  {
    const valid = this.Form.valid;
    if(valid)
    {
      this.IsSendSuccess = true;
    }
  }
}
