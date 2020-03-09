import { Component, OnInit } from '@angular/core';
import { CompanyModel } from 'src/app/core/models/company.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-selector',
  templateUrl: './company-selector.component.html',
  styleUrls: []
})
export class CompanySelectorComponent implements OnInit {

  Companies: CompanyModel[] = [];
  ShowSelect: boolean = false;
  SelectedCompany: CompanyModel;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    const { client, operator, creator } = this.auth.LoginData;

    if (client.length > 0) {
      this.auth.LoginData.user_type = "client";
      this.Companies = client.map(c => c.company);
      return;
    }

    if (operator.length > 0) {
      this.auth.LoginData.user_type = "operator";
      this.Companies = operator.map(c => c.company);
      return;
    }

    if (creator.length > 0) {
      this.auth.LoginData.user_type = "creator";
      this.Companies = creator.map(c => c.company);
      return;
    }
  }

  SelectCompany() {
    if (!this.SelectedCompany) return;

    const companyId = +this.SelectedCompany.id;

    this.auth.LoginData.company_id = companyId;
    if (this.auth.LoginData.user_type == "operator") {
      this.auth.LoginData.store_id = this.auth.LoginData.operator.find(o => o.company_id == companyId).store_id
    }

    this.auth.InitSession(this.auth.LoginData);
    this.router.navigate(["/system"]);
  }

  OnSelected(item) {
    this.SelectedCompany = item;
    this.ShowSelect = false;
  }
}
