import { Component, OnInit } from '@angular/core';
import {DeviceService} from '../../../core/device.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DeviceEntity} from '../../../entity/device.entity';
import {NzMessageService} from 'ng-zorro-antd';
import * as moment from 'moment';
import {DepartmentService} from '../../../core/department.service';
import {UserService} from '../../../core/user.service';

@Component({
  selector: 'app-device-manage',
  templateUrl: './device-manage.component.html',
  styleUrls: ['./device-manage.component.less']
})
export class DeviceManageComponent implements OnInit {

  // 网络获取的原始数据
  public rawData: DeviceEntity[] = [];

  public uidList = [
    {text: 'MS-01', value: 'MS-01', byDefault: false},
    {text: 'MS-02', value: 'MS-02', byDefault: false},
    {text: 'MS-03', value: 'MS-03', byDefault: false},
  ];
  public imsiList = [
    {text: '123456789', value: '123456789', byDefault: false},
    {text: '123456789', value: '123456789', byDefault: false},
    {text: '123456789', value: '123456789', byDefault: false},
  ];
  public nameList = [
    {text: '测试设备1', value: '测试设备1', byDefault: false},
    {text: '测试设备2', value: '测试设备2', byDefault: false},
    {text: '测试设备3', value: '测试设备3', byDefault: false},
  ];
  public serialNumberList = [
    {text: '1234567', value: '1234567', byDefault: false},
    {text: '1234567', value: '1234567', byDefault: false},
    {text: '1234567', value: '1234567', byDefault: false},
  ];
  public typeList = [
    {text: '测试设备类型1', value: '测试设备类型1', byDefault: false},
    {text: '测试设备类型2', value: '测试设备类型2', byDefault: false},
    {text: '测试设备类型3', value: '测试设备类型3', byDefault: false},
  ];
  public statusList = [
    {text: '测试设备状态1', value: '测试设备状态1', byDefault: false},
    {text: '测试设备状态2', value: '测试设备状态2', byDefault: false},
    {text: '测试设备状态3', value: '测试设备状态3', byDefault: false},
  ];
  public userList = [
    {text: '保管员1', value: '保管员1', byDefault: false},
    {text: '保管员2', value: '保管员2', byDefault: false},
    {text: '保管员3', value: '保管员3', byDefault: false},
  ];
  public departmentList = [
    {text: '研发部门1', value: '研发部门1', byDefault: false},
    {text: '研发部门2', value: '研发部门2', byDefault: false},
    {text: '研发部门3', value: '研发部门3', byDefault: false},
  ];

  // 是否全部选中
  public isAllChecked = false;
  // 是否设为不确定状态
  public isIndeterminate = false;
  // 数据集
  public dataSet: DeviceEntity[] = Object.assign([], this.rawData);
  // 表格中显示的数据
  public displayData: DeviceEntity[] = [];
  // 表格载入中
  public isTableDataLoading = false;

  // 需要进行排序的标签名
  public sortName = null;
  // 需要进行排序的标签值
  public sortValue = null;
  // UID筛选列表
  public listOfSearchUID = [];
  // IMSI筛选列表
  public listOfSearchIMSI = [];
  // NAME筛选列表
  public listOfSearchName = [];
  // SerialNumber筛选列表
  public listOfSearchSerialNumber = [];
  // Type筛选列表
  public listOfSearchType = [];
  // Status筛选列表
  public listOfSearchStatus = [];
  // User筛选列表
  public listOfSearchUser = [];
  // Department筛选列表
  public listOfSearchDepartment = [];

  // 设备详细信息对话框显示状态位
  public isDeviceInfoDialogVisible = false;
  // 设备详细信息是否载入完成
  public isOkLoading = false;

  // 设备信息表单
  public deviceInfoForm: FormGroup;

  // 是否载入类型数据中
  public isTypeLoading = false;
  // 是否载入状态数据中
  public isStatusLoading = false;
  // 是否载入部门数据中
  public isDepartmentLoading = false;
  // 是否载入用户数据中
  public isUserLoading = false;
  // 设备类型列表
  public deviceTypeList = [];
  // 设备状态列表
  public deviceStatusList = [];
  // 部门列表
  public deviceDepartmentList = [];
  // 所属部门的员工列表
  public deviceUserList = [];

  // 设备详细对话框是否为保存状态
  public isWriteStatus = false;
  // 设备详细对话框是否为创建状态
  public isCreateStatus = false;

  // 当前选中设备的数据
  public currentSelectDeviceData: DeviceEntity = new DeviceEntity();

  constructor(
    private deviceService: DeviceService,
    private departmentService: DepartmentService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private message: NzMessageService
  ) {
  }

  ngOnInit() {
    this.deviceInfoForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      uid: ['', [Validators.required]],
      imsi: ['', [Validators.required]],
      name: ['', [Validators.required]],
      serial_number: ['', [Validators.required]],
      type_id: ['', [Validators.required]],
      status_id: ['', [Validators.required]],
      department_id: ['', [Validators.required]],
      user_id: ['', [Validators.required]],
      comment: [''],
      create_time: [''],
      keep_live_interval: [''],
      battery_sleep_time: [''],
      battery_keep_live_time: [''],
    });

    this.loadAllDevices();
    this.loadDeviceTypesMore();
    this.loadDeviceStatusMore();
    this.loadDeviceDepartmentMore();
  }

  // 获取当前页面的数据
  public currentPageDataChange($event: Array<DeviceEntity>): void {
    this.displayData = $event;
  }

  // 刷新当前页面的数据集状态
  public refreshStatus(): void {
    const allChecked = this.displayData.filter(value => !value.disable).every(value => value.checked === true);
    const allUnChecked = this.displayData.filter(value => !value.disable).every(value => !value.checked);
    this.isAllChecked = allChecked;
    this.isIndeterminate = (!allChecked) && (!allUnChecked);
  }

  // 全选当前页面的数据集状态
  public checkAll(value: boolean): void {
    this.displayData.forEach(data => {
      if (!data.disable) {
        data.checked = value;
      }
    });

    this.refreshStatus();
  }

  // 筛选数据
  public filter(listOfSearchUID: string[],
         listOfSearchIMSI: string[],
         listOfSearchName: string[],
         listOfSearchSerialNumber: string[],
         listOfSearchType: string[],
         listOfSearchStatus: string[],
         listOfSearchUser: string[],
         listOfSearchDepartment: string[]): void {
    this.listOfSearchUID = listOfSearchUID;
    this.listOfSearchIMSI = listOfSearchIMSI;
    this.listOfSearchName = listOfSearchName;
    this.listOfSearchSerialNumber = listOfSearchSerialNumber;
    this.listOfSearchType = listOfSearchType;
    this.listOfSearchStatus = listOfSearchStatus;
    this.listOfSearchUser = listOfSearchUser;
    this.listOfSearchDepartment = listOfSearchDepartment;

    // 筛选数据时需重置数据集
    this.dataSet = this.rawData.slice(0, this.rawData.length);

    this.search();
  }

  // 对数据排序
  public sort(sort: { key: string, value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;

    this.search();
  }

  // 更新原始数据
  public handleUpdateRawData(): void {
    // 清空原数据
    this.rawData.splice(0, this.rawData.length);
    this.loadAllDevices();
  }

  // 创建新设备
  public handleCreateDevice(): void {
    // 创建新的设备数据
    this.currentSelectDeviceData = new DeviceEntity();

    // 表单载入数据
    this.loadDeviceFormData(this.currentSelectDeviceData);
    this.isWriteStatus = true;
    this.isCreateStatus = true;
    this.isDeviceInfoDialogVisible = true;
    this.deviceInfoForm.enable();
  }

  // 显示设备详细信息对话框
  public handleShow(index: number): void {
    this.currentSelectDeviceData = this.dataSet[index];
    // 表单载入数据
    this.loadDeviceFormData(this.currentSelectDeviceData);

    this.isDeviceInfoDialogVisible = true;
    this.deviceInfoForm.disable();
  }

  // 修改设备详细信息对话框
  public handleModify(): void {

    if (this.isWriteStatus) {
      this.deviceInfoForm.disable();
      this.isOkLoading = true;

      console.log(this.deviceInfoForm.value);

      // 获取表单中的数据
      const deviceFormData: FormData = new FormData();
      for (const key in this.deviceInfoForm.value) {
        // 获取所有传入的数据
        if (this.deviceInfoForm.value[key] !== undefined && this.deviceInfoForm.value[key] !== null) {
          if (key === 'create_time') {
            deviceFormData.append(key, moment(this.deviceInfoForm.value[key]).format('YYYY-MM-DD HH:mm:ss'));
          } else {
            deviceFormData.append(key, this.deviceInfoForm.value[key]);
          }
        }
      }

      // 创建设备
      if (this.isCreateStatus) {
        // 如果是创建设备要把更新状态关闭
        this.isWriteStatus = false;
        console.log('===Create Device===');
        this.isCreateStatus = false;

        this.deviceService.createDevice(deviceFormData).subscribe(
          data => {
            console.log(data);
            if (data.code === 0) {
              this.message.create('success', '创建成功');
              const newDeivce: DeviceEntity = new DeviceEntity();
              // 把Object对象转化为自定义对象
              Object.assign(newDeivce, data.data);

              this.isDeviceInfoDialogVisible = false;
              this.isWriteStatus = false;
              this.isCreateStatus = false;

              // 重新载入新数据
              this.handleUpdateRawData();
            } else {
              this.message.create('error', '创建失败:' + data.msg);
            }
          },
          error => {
            console.log(error);
          },
          () => {
            console.log('===createDevice===');
            this.isOkLoading = false;
          }
        );
      }

      // 更新信息
      if (this.isWriteStatus) {
        console.log('===Write Device===');
        // 向服务器更新
        this.deviceService.modifyDeviceInfo(deviceFormData).subscribe(
          data => {
            if (data.code === 0) {
              // 更新数据表中的数据显示
              for (const key in this.deviceInfoForm.value) {
                this.currentSelectDeviceData[key] = this.deviceInfoForm.value[key];
              }
              this.message.create('success', '修改成功');
            } else {
              this.message.create('error', '修改失败:' + data.msg);
            }
          },
          error => {
            console.log(error);
          },
          () => {
            this.isWriteStatus = false;
            this.isOkLoading = false;
            this.isDeviceInfoDialogVisible = false;

            console.log('===modifyDeviceInfo===');
          }
        );
      }
    } else {
      this.deviceInfoForm.enable();
      this.deviceInfoForm.get('imsi').disable();
      this.deviceInfoForm.get('create_time').disable();
      this.isWriteStatus = true;
    }
  }

  // 范例函数
  public handleOk(): void {
    this.isOkLoading = true;
    window.setTimeout(() => {
      this.isDeviceInfoDialogVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  public handleCancel(): void {
    this.isDeviceInfoDialogVisible = false;
    // 窗口退出时禁用设备信息窗口
    this.deviceInfoForm.disable();

    // 关闭写状态
    this.isWriteStatus = false;
    // 关闭创建状态
    this.isCreateStatus = false;
    // 关闭按钮载入状态
    this.isOkLoading = false;
  }

  // 载入更多的设备类型
  public loadDeviceTypesMore(): void {
    this.isTypeLoading = true;
    this.deviceService.getAllDeviceTypes().subscribe(
      data => {
        if (data.code === 0) {
          const typesData = Object.values(data.data);
          this.isTypeLoading = false;
          this.deviceTypeList = typesData.slice(0, typesData.length);
        }
      },
      error => {
        console.log(error);
      },
      () => {
        console.log('Get All Device Types Complete');
      }
    );
  }

  // 载入更多的设备状态
  public loadDeviceStatusMore(): void {
    this.isStatusLoading = true;
    this.deviceService.getAllDeviceStatus().subscribe(
      data => {
        if (data.code === 0) {
          const statusData = Object.values(data.data);
          this.isStatusLoading = false;
          this.deviceStatusList = statusData.slice(0, statusData.length);
        }
      },
      error => {
        console.log(error);
      },
      () => {
        console.log('Get All Device Status Complete');
      }
    );
  }

  // 载入更多的设备部门
  public loadDeviceDepartmentMore(): void {
    this.isDepartmentLoading = true;
    this.departmentService.getAllDepartment().subscribe(
      data => {
        if (data.code === 0) {
          const departmentData = Object.values(data.data);
          this.isDepartmentLoading = false;
          this.deviceDepartmentList = departmentData.slice(0, departmentData.length);
        }
      },
      error => {
        console.log(error);
      },
      () => {
        console.log('Get All Department Complete');
      }
    );
  }

  // 部门选择时的响应事件
  public deviceDepartmentChange(index: number): void {
    // 载入更多用户
    if (index === undefined || index === null) {
      return;
    }

    this.loadDeviceUserMore(index);
  }

  // 载入更多部门对应的用户
  public loadDeviceUserMore(index: number): void {
    if (index === undefined) {
      return;
    }

    this.isUserLoading = true;
    this.userService.getUserListByDepartmentId(index).subscribe(
      data => {
        if (data.code === 0) {
          const userData = Object.values(data.data);
          this.isUserLoading = false;
          this.deviceUserList = userData.slice(0, userData.length);
        }
      },
      error => {
        console.log(error);
      },
      () => {
        console.log('Get User List By Department Id Complete');
      }
    );
  }

  // 载入所有的设备类型
  public loadAllDevices(): void {
    // 表格数据载入中
    this.isTableDataLoading = true;
    this.deviceService.getAllDevices().subscribe(
      data => {
        if (data.code === 0) {
          const netData = Object.values(data.data);
          for (const device of netData) {
            device['checked'] = false;
            device['disable'] = false;
            this.rawData.push(device);

            this.uidList.push({text: device.uid, value: device.uid, byDefault: false});
            this.imsiList.push({text: device.imsi, value: device.imsi, byDefault: false});
            this.nameList.push({text: device.name, value: device.name, byDefault: false});
            this.serialNumberList.push({text: device.serial_number, value: device.serial_number, byDefault: false});
            this.statusList.push({text: device.status, value: device.status, byDefault: false});
            this.typeList.push({text: device.type, value: device.type, byDefault: false});
            this.userList.push({text: device.user, value: device.user, byDefault: false});
            this.departmentList.push({text: device.department, value: device.department, byDefault: false});
          }

          // 筛选数据时需重置数据集
          this.dataSet = this.rawData.slice(0, this.rawData.length);
        }
      },
      error => {
        console.log(error);
      },
      () => {
        this.isTableDataLoading = false;
        console.log('Get All Devices Complete');
      }
    );
  }

  private loadDeviceFormData(data: DeviceEntity): void {
    // 设置打开对话框中的值
    this.deviceInfoForm.get('id').setValue(data['id']);
    this.deviceInfoForm.get('uid').setValue(data['uid']);
    this.deviceInfoForm.get('imsi').setValue(data['imsi']);
    this.deviceInfoForm.get('name').setValue(data['name']);
    this.deviceInfoForm.get('serial_number').setValue(data['serial_number']);
    this.deviceInfoForm.get('type_id').setValue(data['type_id']);
    this.deviceInfoForm.get('status_id').setValue(data['status_id']);
    this.deviceInfoForm.get('department_id').setValue(data['department_id']);
    this.deviceInfoForm.get('user_id').setValue(data['user_id']);
    this.deviceInfoForm.get('comment').setValue(data['comment']);
    this.deviceInfoForm.get('create_time').setValue(data['create_time']);
    this.deviceInfoForm.get('keep_live_interval').setValue(data['keep_live_interval']);
    this.deviceInfoForm.get('battery_sleep_time').setValue(data['battery_sleep_time']);
    this.deviceInfoForm.get('battery_keep_live_time').setValue(data['battery_keep_live_time']);
  }

  private search(): void {

    // 筛选回调函数
    const filterFunc = item => {
      return (this.listOfSearchUID.length ? this.listOfSearchUID.some(
        uid => item.uid.indexOf((typeof uid === 'string') ? uid : uid.value) !== -1) : true) &&
        (this.listOfSearchIMSI.length ? this.listOfSearchIMSI.some(
          imsi => item.imsi.indexOf((typeof imsi === 'string') ? imsi : imsi.value) !== -1) : true) &&
        (this.listOfSearchName.length ? this.listOfSearchName.some(
          name => item.name.indexOf((typeof name === 'string') ? name : name.value) !== -1) : true) &&
        (this.listOfSearchSerialNumber.length ? this.listOfSearchSerialNumber.some(
          serialNumber => item.serial_number.indexOf(
            (typeof serialNumber === 'string') ? serialNumber : serialNumber.value) !== -1) : true) &&
        (this.listOfSearchType.length ? this.listOfSearchType.some(
          type => item.type.indexOf((typeof type === 'string') ? type : type.value) !== -1) : true) &&
        (this.listOfSearchStatus.length ? this.listOfSearchStatus.some(
          status => item.status.indexOf((typeof status === 'string') ? status : status.value) !== -1) : true) &&
        (this.listOfSearchUser.length ? this.listOfSearchUser.some(
          user => item.user.indexOf((typeof user === 'string') ? user : user.value) !== -1) : true) &&
        (this.listOfSearchDepartment.length ? this.listOfSearchDepartment.some(
          department => item.department.indexOf((typeof department === 'string') ? department : department.value) !== -1) : true);
    };
    let data = this.dataSet.filter(item => filterFunc(item));

    // 判断是否需要排序
    if (this.sortName && this.sortValue) {
      data = data.sort(
        (a, b) => (this.sortValue === 'ascend') ?
          (a[this.sortName] > b[this.sortName] ? 1 : -1) :
          (b[this.sortName] > a[this.sortName] ? 1 : -1));
    }

    // 由于两个数组的地址不同，因此不能直接拷贝
    this.dataSet = data.slice(0, data.length);
  }

}
