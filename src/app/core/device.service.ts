import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ReponseEntity} from '../entity/reponse.entity';
import {
  API_MANAGE_DEVICE, API_GET_ALL_DEVICE_STATUS, API_GET_ALL_DEVICE_TYPE, API_MANAGE_DEVICE_TYPE,
  API_DEVICE_COMMAND, API_DEVICE_READ_DATA
} from './http-url.namespace';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  // 连接设备指令
  public static COMMAND_CONNECT_DEVICE = 'I00i';
  // 连接设备指令的反馈
  public static COMMAND_CONNECT_DEVICE_FEEDBACK_1 = 'I00i';
  public static COMMAND_CONNECT_DEVICE_FEEDBACK_2 = 'I00iI00i';
  // 读取电压指令
  public static COMMAND_READ_VOLTAGE = 'B00b';

  constructor(
    private http: HttpClient
  ) { }

  public getAllDevices(): Observable<ReponseEntity> {
    return this.http.get<ReponseEntity>(API_MANAGE_DEVICE);
  }

  public getAllDeviceTypes(): Observable<ReponseEntity> {
    return this.http.get<ReponseEntity>(API_GET_ALL_DEVICE_TYPE);
  }

  public getAllDeviceStatus(): Observable<ReponseEntity> {
    return this.http.get<ReponseEntity>(API_GET_ALL_DEVICE_STATUS);
  }

  public modifyDeviceInfo(deviceData: FormData): Observable<ReponseEntity> {
    return this.http.put<ReponseEntity>(API_MANAGE_DEVICE, deviceData);
  }

  public createDevice(deviceData: FormData): Observable<ReponseEntity> {
    return this.http.post<ReponseEntity>(API_MANAGE_DEVICE, deviceData);
  }

  public getTypeClassifyDevices(): Observable<ReponseEntity> {
    return this.http.get<ReponseEntity>(API_MANAGE_DEVICE_TYPE);
  }

  public createCommand(commandData: FormData): Observable<ReponseEntity> {
    return this.http.post<ReponseEntity>(API_DEVICE_COMMAND, commandData);
  }

  public readDataCommand(id: number): Observable<ReponseEntity> {
    return this.http.get<ReponseEntity>(API_DEVICE_READ_DATA(id));
  }
}
