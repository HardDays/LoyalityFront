import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-cmp',
  templateUrl: './company.component.html'
})
export class CompanyComponent implements OnInit {

  Form: FormGroup = new FormGroup({
    "name": new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ])
  });

  @Input()
  showBackButton: boolean = true;

  get name() {
    return this.Form.get('name');
  }

  constructor(private _location: Location, private auth: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  GoBack() {
    this._location.back();
  }

  Save() {
    for (const i in this.Form.controls) {
      this.Form.controls[i].markAsDirty();
      this.Form.controls[i].markAsTouched();
    }
    const valid = this.Form.valid;

    if (valid) {
      const data = this.Form.getRawValue();
      this.auth.CreateCompany(data, (res) => {
        this.router.navigate(["/system"])
      },
        (err) => {
        })
    }
  }

}
