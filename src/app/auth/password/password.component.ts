import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormControl, Validators, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'password-cmp',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  ShowMailForm = true;
  ShowPasswordForm = false;
  IsSendSuccess = false;
  ResetSuccess = false;

  Form = new FormGroup({
    "email": new FormControl('', [
      Validators.required,
      Validators.email
    ])
  });

  Email: string = "";

  NewPasswordForm = new FormGroup({
    "email": new FormControl('', [Validators.required, Validators.email]),
    "code": new FormControl('', [Validators.required]),
    "password": new FormControl('', [
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(50)
    ]),
    "password_confirmation": new FormControl('', [
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(50),
      this.MatchPasswords()
    ])
  })

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  get email() {
    return this.Form.get('email');
  }

  ResetPw() {
    const valid = this.Form.valid;
    if (valid) {
      this.auth.RequestPassword(
        this.Form.getRawValue()['email'],
        (res) => {
          this.ShowMailForm = false;
          this.IsSendSuccess = true;
          this.Email = this.Form.getRawValue()['email'];

          this.NewPasswordForm.get('email').setValue(this.Email);
        },
        (err) => {
          this.email.setErrors({'INVALID': true})
          // this.IsSendSuccess = true;
        }
      )
    }
  }

  ShowResetPwFormHandler()
  {
    this.IsSendSuccess = false;
    this.ShowPasswordForm = true;
  }

  MatchPasswords() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (this.NewPasswordForm && this.NewPasswordForm.controls) {
        const values = this.NewPasswordForm.getRawValue();
        const forbidden = values.password != values.password_confirmation;
        return forbidden ? { 'not_match': { value: control.value } } : null;
      }
      return null;
    };
  }

  SetNewPassword()
  {
    this.NewPasswordForm.updateValueAndValidity();
    const valid = this.NewPasswordForm.valid;
    if (valid) {

      const vals = this.NewPasswordForm.getRawValue();

      this.auth.UpdatePassword(
        vals,
        (res) => {
          this.ShowPasswordForm = false;
          this.ResetSuccess = true;
        },
        (err) => {
          if (err) {
            if (err.status == 422) {
              const body = err.body;
              for (const i in body) {
                const elem = this.NewPasswordForm.get(i);
                if (elem) {
                  let errors: ValidationErrors = {};
                  for (const j in body[i]) {
                    errors[body[i][j]] = true;
                  }
                  elem.setErrors(errors);
                }
              }
            }
            else{
              this.NewPasswordForm.get('code').setErrors({'INVALID': true})
            }
          }
        }
      )
    }
  }
}
