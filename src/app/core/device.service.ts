import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ReponseEntity} from '../entity/reponse.entity';
import {API_GET_ALL_DEVICE, API_GET_ALL_DEVICE_STATUS, API_GET_ALL_DEVICE_TYPE} from './http-url.namespace';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(
    private http: HttpClient
  ) { }

  public getAllDevices(): Observable<ReponseEntity> {
    return this.http.get<ReponseEntity>(API_GET_ALL_DEVICE);
  }

  public getAllDeviceTypes(): Observable<ReponseEntity> {
    return this.http.get<ReponseEntity>(API_GET_ALL_DEVICE_TYPE);
  }

  public getAllDeviceStatus(): Observable<ReponseEntity> {
    return this.http.get<ReponseEntity>(API_GET_ALL_DEVICE_STATUS);
  }
}
