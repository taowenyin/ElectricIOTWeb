import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ReponseEntity} from '../entity/reponse.entity';
import {Observable} from 'rxjs';
import {API_MANAGE_DEPARTMENT} from './http-url.namespace';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(
    private http: HttpClient
  ) { }

  public getAllDepartment(): Observable<ReponseEntity> {
    return this.http.get<ReponseEntity>(API_MANAGE_DEPARTMENT);
  }
}
