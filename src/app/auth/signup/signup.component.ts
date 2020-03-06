import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { CreatorModel } from '../../core/models/creator.model';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ValidatorService } from '../../core/services/validator.service';
import { CompanyService } from '../../core/services/company.service';


@Component({
  selector: 'signup-cmp',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit
{
  FormData: CreatorModel = new CreatorModel();
  CompanyName: string = '';
  ConfirmPassword: string = '';
  RegSuccess = false;
  RegForm: FormGroup = new FormGroup({
    "first_name": new FormControl(this.FormData.first_name, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)
    ]),
    "last_name": new FormControl(this.FormData.last_name,[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)
    ]),
    "email": new FormControl(this.FormData.email,[
      Validators.required,
      Validators.email
    ]),
    "phone": new FormControl(this.FormData.phone, [
      Validators.required,
      this.ValidatePhone()
    ]),
    "password": new FormControl(this.FormData.password, [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(50)
    ]),
    "confirm_password": new FormControl(this.ConfirmPassword, [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(50),
      this.MatchPasswords()
    ])//,
    // "cname": new FormControl(this.CompanyName, [
    //   Validators.required,
    //   Validators.minLength(3),
    //   Validators.maxLength(50)
    // ])
  });

  constructor(private auth: AuthService,private router: Router, private company: CompanyService)
  {

  }

  ngOnInit(): void
  {
    this.RegForm.reset();
  }

  MatchPasswords()
  {
      return (control: AbstractControl): {[key: string]: any} | null => {
          if(this.RegForm && this.RegForm.controls)
          {
              const values = this.RegForm.getRawValue();
              const forbidden = values.password != values.confirm_password;
              return forbidden ?  {'not_match': {value: control.value}} : null;
          }
          return null;
      };
  }

  ValidatePhone()
  {
    return (control: AbstractControl): {[key: string]: any} | null => {
      if(this.RegForm && this.RegForm.controls)
      {
          const values = this.RegForm.getRawValue();
          if(values.phone)
          {
            const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

            return regex.test(values.phone) ? null : {'incorrect_value': {value: control.value}};
          }
      }
      return null;
    };
  }

  get first_name()
  {
    return this.RegForm.get('first_name');
  }

  get last_name()
  {
    return this.RegForm.get('last_name');
  }

  get email()
  {
    return this.RegForm.get('email');
  }

  get phone()
  {
    return this.RegForm.get('phone');
  }

  get password()
  {
    return this.RegForm.get('password');
  }

  get confirm_password()
  {
    return this.RegForm.get('confirm_password');
  }

  // get cname()
  // {
  //   return this.RegForm.get('cname');
  // }

  Create()
  {
    this.RegForm.updateValueAndValidity();
    const valid = this.RegForm.valid;
    // const valid = true;
    if(valid)
    {
      const vals = this.RegForm.getRawValue();

      for(const i in this.FormData)
      {
        this.FormData[i] = vals[i];
      }


      this.auth.CreateCreator(this.FormData,
        (val) => {
          this.RegSuccess = true;
          this.router.navigate(["/auth","confirm"]);
          // this.company.CreateCompany({name: vals.cname});
        },
        (err) => {
          if(err)
          {
            if(err.status == 422)
            {
              const body = err.body;
              for(const i in body)
              {
                const elem = this.RegForm.get(i);
                if(elem)
                {
                  let errors: ValidationErrors = {};
                  for(const j in body[i])
                  {
                    errors[body[i][j]] = true;
                  }
                  elem.setErrors(errors);
                }
              }
            }
          }
        });
    }
    else
    {
      for(const i in this.RegForm.controls)
      {
        // this.Form.get(i).markAsDirty();
        this.RegForm.get(i).markAsDirty();
      }

    }
  }
}
