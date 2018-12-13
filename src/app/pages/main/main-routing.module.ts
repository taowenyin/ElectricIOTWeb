import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapMonitorComponent } from './map-monitor/map-monitor.component';
import { MainComponent } from './main.component';
import { DeviceManageComponent } from './device-manage/device-manage.component';
import { DepartmentComponent } from './department/department.component';
import {RoleComponent} from './role/role.component';
import {UserComponent} from './user/user.component';
import {SettingComponent} from './setting/setting.component';

const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    data: {breadcrumb: '主页'},
    children: [
      {path: 'map', component: MapMonitorComponent, data: {breadcrumb: '地图监控'}},
      {path: 'device', component: DeviceManageComponent, data: {breadcrumb: '设备管理'}},
      {path: 'department', component: DepartmentComponent, data: {breadcrumb: '组织'}},
      {path: 'role', component: RoleComponent, data: {breadcrumb: '角色'}},
      {path: 'user', component: UserComponent, data: {breadcrumb: '用户'}},
      {path: 'setting', component: SettingComponent, data: {breadcrumb: '设置'}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule]
})
export class MainRoutingModule { }
