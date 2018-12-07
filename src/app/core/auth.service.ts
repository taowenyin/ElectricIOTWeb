import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {API_LOGIN} from './http-url.namespace';
import {Observable} from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/x-www-form-urlencoded'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  public login(loginName: string, loginPassword: string): Observable<any> {

    const loginBody = {
      'login_name': loginName,
      'login_password': loginPassword
    };

    return this.http.post(API_LOGIN, loginBody, this.httpOptions);
  }
}
