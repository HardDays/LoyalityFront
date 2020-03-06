import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoginModel } from 'src/app/core/models/login.model';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'confirm-cmp',
  templateUrl: './confirm.component.html'
})
export class ConfirmComponent implements OnInit {

  LoginModel: LoginModel = new LoginModel();
  PasswordError: string = "";
  EmailError: string = "";

  Form: FormGroup = new FormGroup({
    "email": new FormControl(this.LoginModel.email, [
      Validators.required,
      Validators.email
    ]),
    "code": new FormControl(this.LoginModel.password, [
      Validators.required
    ])
  });

  get email() {
    return this.Form.get('email');
  }

  get code() {
    return this.Form.get('code');
  }

  isLoading = false;

  constructor(private auth: AuthService,
    private router: Router) {
  }

  ngOnInit() {
    const data = this.auth.Creator;


    this.Form.patchValue(data);
  }

  Login() {
    const valid = this.Form.valid;

    if (valid) {
      const data = this.Form.getRawValue();
      this.auth.Confirm(data,
        (val) => {

          this.router.navigate(["/system"]);
        },
        (err) => {
          const not_found = [401, 422, 404, 403];
          for (const i of not_found) {
            if (i == err.status) {
              this.code.setErrors({
                "wrong": true
              });
            }
          }
        })
    }
  }
}
