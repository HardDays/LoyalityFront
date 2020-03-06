import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Response, Headers, URLSearchParams } from '@angular/http';
import { TokenModel } from '../models/token.model';
import { Observable } from 'rxjs';

declare var Buffer: any;
@Injectable()
export class HttpService {

  serverUrl = 'http://34.90.57.126:3001/api/v1';
  // serverUrl = 'https://fathomless-earth-40434.herokuapp.com/api/v1';
  CompanyId = '';

  public headers: Headers = new Headers([]);
  constructor(private http: Http) {
    this.BaseHeadersInit();
  }

  BaseInitByToken(data: string) {
    if (data) {
      if (this.headers.has('Authorization')) {
        this.headers.delete('Authorization');
      }
      this.headers.append('Authorization', data);
    }
  }

  AddCompanyId(companyId) {
    this.CompanyId = companyId;
  }

  DeleteAuthToken() {
    if (this.headers.has('Authorization')) {
      this.headers.delete('Authorization');
    }
  }

  BaseHeadersInit() {
    if (!this.headers.has('Content-Type')) {
      this.headers.append('Content-Type', 'application/json');
    }
  }


  validResp(resp) {
    let body = resp._body;
    if (body == " ") return false;
    return true;
  }

  CommonRequest(fun: () => Observable<Response>, success?: (data) => void, fail?: (err) => void) {
    this.BaseHeadersInit();

    return fun()
      .subscribe(
        (resp: Response) => {
          if (success && typeof success == "function") {
            success(this.validResp(resp) ? resp.json() : "");
          }
        },
        (error) => {
          if (fail && typeof fail == "function") {
            let errObj = error;
            try {
              errObj.body = this.validResp(error) ? error.json() : ""
            }
            catch (e) {
              error.body = {};
            }
            fail(errObj);
          }
        }
      )
  }

  GetQueryStr(method: string, params?: any) {
    return this.serverUrl + method + '?' + params;
  }

  GetData(method: string, params?: any) {
    return this.http.get(this.serverUrl + method + '?' + params + `&company_id=${this.CompanyId}`, { headers: this.headers });
  }

  DeleteData(method: string) {
    return this.DeleteDataWithBody(method, {});
  }

  DeleteDataWithBody(method: string, body: any) {
    return this.http.delete(this.serverUrl + method + `&company_id=${this.CompanyId}`, new RequestOptions({
      headers: this.headers,
      body: { ...body, company_id: this.CompanyId }
    }));
  }

  DeleteDataWithParam(method: string, param: any) {
    return this.http.delete(this.serverUrl + method + '?' + param + `&company_id=${this.CompanyId}`, { headers: this.headers });
  }

  PostData(method: string, data: any) {
    return this.http.post(this.serverUrl + method, { ...data, company_id: this.CompanyId }, { headers: this.headers });
  }

  PatchData(method: string, data: any) {
    return this.http.patch(this.serverUrl + method, { ...data, company_id: this.CompanyId }, { headers: this.headers });
  }

  PutData(method: string, data: any) {
    return this.http.put(this.serverUrl + method, { ...data, company_id: this.CompanyId }, { headers: this.headers });
  }

  GetDataFromOtherUrl(url: string) {
    return this.http.get(url);
  }
}
