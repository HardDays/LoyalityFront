import { Component, OnInit, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { IDictionary, IStringToAny } from 'src/app/core/interfaces/dictionary.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginSuccessModel } from '../../core/models/login.success.model';

@Component({
  selector: 'app-settings-cmp',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {

  Me = new LoginSuccessModel();

  GeneralFormError = false;
  GeneralFormSuccess = false;
  GeneralForm: FormGroup = new FormGroup({
    "first_name": new FormControl("", [
      Validators.required,
      Validators.maxLength(50),
      Validators.minLength(3)
    ]),
    "last_name": new FormControl("", [
      Validators.required,
      Validators.maxLength(50),
      Validators.minLength(3)
    ]),
    // "company_name": new FormControl("", [
    //   Validators.required,
    //   Validators.maxLength(50),
    //   Validators.minLength(3)
    // ])
  });

  EmailFormError = false;
  EmailFormSuccess = false;
  EmailForm: FormGroup = new FormGroup({
    "current_email": new FormControl("", [
      Validators.required,
      Validators.email
    ]),
    "email": new FormControl("", [
      Validators.required,
      Validators.email,
      this.MatchEmails()
    ])
  });


  PasswordFormError = false;
  PasswordFormSuccess = false;
  PasswordForm: FormGroup = new FormGroup({
    "current_password": new FormControl("", [
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(50)
    ]),
    "password": new FormControl("", [
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(50)
    ]),
    "password_confirmation": new FormControl("", [
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(50),
      this.MatchPasswords()
    ])
  });
  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute) {
    this.auth.onAuthChange$.subscribe((res) => {
      if (res) {
        this.UpdateFormVals();
      }
    });

    // this.auth.onCompanyChange$.subscribe((res) => {
    //   if (res) {
    //     this.GeneralForm.get('company_name').setValue(this.auth.CompanyData.name);
    //   }
    // })
  }

  ngOnInit() {
    this.UpdateFormVals();
  }

  UpdateFormVals() {
    this.Me = this.auth.LoginData;
    this.UpdateEmailForm();
    this.UpdatePasswordForm();
    this.UpdateGeneralForm();
  }

  UpdateEmailForm() {
    this.EmailForm.reset();
    this.EmailForm.get('current_email').setValue(this.Me.email);
  }

  UpdatePasswordForm() {
    this.PasswordForm.reset();
  }

  UpdateGeneralForm() {
    // this.GeneralForm.reset();

    this.GeneralForm.get('first_name').setValue(this.Me.first_name);
    this.GeneralForm.get('last_name').setValue(this.Me.last_name);
    // this.GeneralForm.get('company_name').setValue(this.auth.CompanyData.name);
  }

  MatchPasswords() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (this.PasswordForm && this.PasswordForm.controls) {
        const values = this.PasswordForm.getRawValue();
        const forbidden = values.password != values.password_confirmation;
        return forbidden ? { 'not_match': { value: control.value } } : null;
      }
      return null;
    };
  }

  MatchEmails() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (this.Me && this.Me.email) {
        const old_mail = this.Me.email;
        if (control.value == old_mail) {
          return { 'incorrect_new_email': true };
        }
      }
      return null;
    };
  }

  UpdatePassword() {
    for (const i in this.PasswordForm.controls) {
      this.PasswordForm.get(i).markAsTouched();
      this.PasswordForm.get(i).markAsDirty();
    }
    this.PasswordForm.updateValueAndValidity();
    this.PasswordFormError = this.PasswordForm.invalid;

    if (this.PasswordFormError)
      return;

    const data = this.PasswordForm.getRawValue();
    this.auth.UpdateProfile(data,
      (res) => {
        this.PasswordFormSuccess = true;
        this.UpdatePasswordForm();
        setTimeout(() => {
          this.PasswordFormSuccess = false;
        }, 3000);
      },
      (err) => {
        if (err.status == 403) {
          this.PasswordForm.get('current_password').setErrors({ 'wrong': true });
          this.PasswordFormError = true;
        }
      }
    )

  }

  UpdateEmail() {
    for (const i in this.EmailForm.controls) {
      this.EmailForm.get(i).markAsTouched();
      this.EmailForm.get(i).markAsDirty();
    }
    this.EmailForm.updateValueAndValidity();
    this.EmailFormError = this.EmailForm.invalid;

    if (this.EmailFormError)
      return;

    const data = this.EmailForm.getRawValue();
    this.auth.UpdateProfile(data,
      (res) => {
        this.EmailFormSuccess = true;
        this.UpdateEmailForm();
        setTimeout(() => {
          this.EmailFormSuccess = false;
        }, 3000);
      },
      (err) => {
        if (err.status == 422) {
          const body = err.body;
          for (var i in body) {
            if (this.EmailForm.get(i)) {
              let err = {};
              err[body[i][0].toLowerCase()] = true;
              this.EmailForm.get(i).setErrors(err);
            }
          }
          this.EmailFormError = true;
        }
      }
    )

    // ON SUCCESS BLOCK

  }

  UpdateGeneral() {
    for (const i in this.GeneralForm.controls) {
      this.GeneralForm.get(i).markAsTouched();
      this.GeneralForm.get(i).markAsDirty();
    }
    this.GeneralForm.updateValueAndValidity();
    this.GeneralFormError = this.GeneralForm.invalid;

    if (this.GeneralFormError)
      return;

    const data = this.GeneralForm.getRawValue();
    this.auth.UpdateProfile(data,
      (res) => {
        this.Me = this.auth.LoginData;
        // this.auth.UpdateCompany({ name: data.company_name },
        //   (res) => {
        //     this.GeneralFormSuccess = true;
        //     this.UpdateGeneralForm();
        //     setTimeout(() => {
        //       this.GeneralFormSuccess = false;
        //     }, 3000);
        //   },
        //   (err) => { }
        // );
      },
      (err) => { }
    )

  }
}
