import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoginModel } from 'src/app/core/models/login.model';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'login-cmp',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit
{

  LoginModel: LoginModel = new LoginModel();
  PasswordError: string = "";
  EmailError: string = "";

  Form: FormGroup = new FormGroup({
    "email": new FormControl(this.LoginModel.email, [
      Validators.required,
      Validators.email
    ]),
    // "phone": new FormControl(this.LoginModel.phone, [
    //   Validators.required,
    //   this.ValidatePhone()
    // ]),
    "password": new FormControl(this.LoginModel.password, [
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(50)
    ])
  });

  get email()
  {
    return this.Form.get('email');
  }

  get phone()
  {
    return this.Form.get('phone');
  }

  get password()
  {
    return this.Form.get('password');
  }

  isLoading = false;

  constructor(private auth: AuthService,
    private router: Router)
  {
  }

  ngOnInit()
  {
  }

  ValidatePhone()
  {
    return (control: AbstractControl): { [key: string]: any } | null =>
    {
      if (this.Form && this.Form.controls)
      {
        const values = this.Form.getRawValue();
        if (values.phone)
        {
          const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

          return regex.test(values.phone) ? null : { 'incorrect_value': { value: control.value } };
        }
      }
      return null;
    };
  }

  Login()
  {
    for (const i in this.Form.controls)
    {
      this.Form.get(i).updateValueAndValidity();
    }
    this.Form.updateValueAndValidity();
    const valid = this.Form.valid;

    if (valid)
    {
      const data = this.Form.getRawValue();
      this.auth.Login(data,
        (val) =>
        {
          this.router.navigate(["/auth", "select"]);
        },
        (err) =>
        {
          if (err.status == 403)
          {
            this.router.navigate(["/auth", "confirm"]);
          }
          else
          {
            const not_found = [401, 422, 404, 403];
            for (const i of not_found)
            {
              if (i == err.status)
              {
                this.password.setErrors({
                  "wrong": true
                });
              }
            }
          }
        })
    }
  }
}
