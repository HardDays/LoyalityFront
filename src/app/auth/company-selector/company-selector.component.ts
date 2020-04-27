import { Component, OnInit } from '@angular/core';
import { CompanyModel } from 'src/app/core/models/company.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { AuthStateService } from '../auth-state.service';

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

  constructor(private auth: AuthService, private router: Router, private authStateService: AuthStateService) { }

  ngOnInit() {
    if (!this.authStateService.AuthData) {
      this.router.navigate(["/auth"]);
      return;
    }

    const { user_type } = this.authStateService.AuthData;

    if (user_type === "creator" && this.authStateService.AuthData.shouldCreateCompany) {
      this.auth.InitSession(JSON.parse(JSON.stringify(this.authStateService.AuthData)))
      this.ShouldCreateCompany = true;
      return;
    }

    this.Companies.push(...this.authStateService.AuthData[user_type].map(c => c.company));
  }


  SelectCompany() {
    if (!this.SelectedCompany) return;

    const userData = JSON.parse(JSON.stringify(this.authStateService.AuthData));
    const companyId = +this.SelectedCompany.id;

    userData.company_id = companyId;

    if (userData.user_type == "operator") {
      userData.store_id = this.authStateService.AuthData.operator.find(o => o.company_id == companyId).store_id
    }

    this.auth.InitSession(userData);
    this.router.navigate(["/system"]);
  }

  OnSelected(item) {
    this.SelectedCompany = item;
    this.ShowSelect = false;
  }
}
