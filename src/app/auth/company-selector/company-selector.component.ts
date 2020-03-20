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
  ShouldCreateCompany: boolean = false;
  private CompanyIdToUserType: object = {};

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    const { client, operator, creator } = this.auth.LoginData;

    if (client.length === 0 && operator.length === 0 && creator.length === 0) {
      // means that user is creator and should follow the step of creating a company
      this.auth.LoginData.user_type = "creator";
      this.ShouldCreateCompany = true;
      return;
    }

    this.Companies.push(...operator.map(c => c.company));
    this.Companies.push(...creator.map(c => c.company));
    this.Companies.push(...client.map(c => c.company));


    operator.forEach(c => { this.CompanyIdToUserType[c.company.id] = "operator" })
    creator.forEach(c => { this.CompanyIdToUserType[c.company.id] = "creator" })
    client.forEach(c => { this.CompanyIdToUserType[c.company.id] = "client" })
  }


  SelectCompany() {
    if (!this.SelectedCompany) return;

    const companyId = +this.SelectedCompany.id;
    this.auth.LoginData.user_type = this.CompanyIdToUserType[companyId];
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
