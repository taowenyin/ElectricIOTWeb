import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_LOGIN} from './http-url.namespace';
import {Observable} from 'rxjs';
import {ReponseEntity} from '../entity/reponse.entity';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  public login(loginName: string, loginPassword: string): Observable<ReponseEntity> {
    // 创建表单式的数据
    const loginBody: FormData = new FormData();
    loginBody.append('login_name', loginName);
    loginBody.append('login_password', loginPassword);

    return this.http.post<ReponseEntity>(API_LOGIN, loginBody);
  }
}
