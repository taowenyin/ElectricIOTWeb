import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { MainRoutingModule } from './main-routing.module';
import { MapMonitorComponent } from './map-monitor/map-monitor.component';
import { DeviceManageComponent } from './device-manage/device-manage.component';
import { DepartmentComponent } from './department/department.component';
import { RoleComponent } from './role/role.component';
import { UserComponent } from './user/user.component';
import { SettingComponent } from './setting/setting.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations:
    [
      MainComponent,
      MapMonitorComponent,
      DeviceManageComponent,
      DepartmentComponent,
      RoleComponent,
      UserComponent,
      SettingComponent
    ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    MainRoutingModule
  ]
})
export class MainModule { }
