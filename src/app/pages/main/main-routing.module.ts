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
    children: [
      {path: 'map', component: MapMonitorComponent},
      {path: 'device', component: DeviceManageComponent},
      {path: 'department', component: DepartmentComponent},
      {path: 'role', component: RoleComponent},
      {path: 'user', component: UserComponent},
      {path: 'setting', component: SettingComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})
export class MainRoutingModule { }
