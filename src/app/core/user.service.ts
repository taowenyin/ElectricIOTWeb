import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ReponseEntity} from '../entity/reponse.entity';
import {Observable} from 'rxjs';
import {API_MANAGE_USER_DEPARTMENT} from './http-url.namespace';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  public getUserListByDepartmentId(id: number): Observable<ReponseEntity> {
    return this.http.get<ReponseEntity>(API_MANAGE_USER_DEPARTMENT(id));
  }
}
