import { Component, OnInit } from '@angular/core';
import { CompanyModel } from 'src/app/core/models/company.model';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-selector',
  templateUrl: './company-selector.component.html',
  styleUrls: []
})
export class CompanySelectorComponent implements OnInit
{

  private Companies: CompanyModel[] = [];

  constructor(public fb: FormBuilder, private auth: AuthService, private router: Router) { }

  companySelectorForm = this.fb.group({
    companyId: ['', [Validators.required]]
  })

  ngOnInit()
  {
    const { client, operator, creator } = this.auth.LoginData;

    if (client.length > 0)
    {
      this.auth.LoginData.user_type = "";
      this.Companies = client.map(c => c.company);
      return;
    }

    if (operator.length > 0)
    {
      this.auth.LoginData.user_type = "operator";
      this.Companies = operator.map(c => c.company);
      return;
    }

    if (creator.length > 0)
    {
      this.auth.LoginData.user_type = "creator";
      this.Companies = creator.map(c => c.company);
      return;
    }
  }

  SelectCompany()
  {

    if (!this.companySelectorForm.valid) return false;

    this.auth.LoginData.company_id = this.companySelectorForm.value.companyId;
    this.auth.InitSession(this.auth.LoginData);
    this.router.navigate(["/system"]);
  }

}
