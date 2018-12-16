import { Component, OnInit } from '@angular/core';
import {DeviceService} from '../../../core/device.service';

@Component({
  selector: 'app-device-manage',
  templateUrl: './device-manage.component.html',
  styleUrls: ['./device-manage.component.less']
})
export class DeviceManageComponent implements OnInit {

  // 网络获取的原始数据
  public rawData = [
    {
      id  : 1,
      uid : 'MS-01',
      imsi  : '123456789',
      name  : '测试设备1',
      serial_number : '1234567',
      type  : '测试设备类型1',
      status  : '测试设备状态1',
      user  : '保管员1',
      department  : '研发部门1',
      comment  : '测试说明1',
      create_time  : '2018-11-20 21:10:30',
      keep_live_interval  : '60',
      battery_sleep_time  : '80',
      battery_keep_live_time  : '100',
      checked  : false,
      disable  : false,
    },
    {
      id  : 2,
      uid : 'MS-02',
      imsi  : '123456789',
      name  : '测试设备2',
      serial_number : '1234567',
      type  : '测试设备类型2',
      status  : '测试设备状态2',
      user  : '保管员2',
      department  : '研发部门2',
      comment  : '测试说明2',
      create_time  : '2018-11-20 22:10:30',
      keep_live_interval  : '50',
      battery_sleep_time  : '70',
      battery_keep_live_time  : '90',
      checked  : false,
      disable  : false,
    },
    {
      id  : 3,
      uid : 'MS-03',
      imsi  : '123456789',
      name  : '测试设备3',
      serial_number : '1234567',
      type  : '测试设备类型3',
      status  : '测试设备状态3',
      user  : '保管员3',
      department  : '研发部门3',
      comment  : '测试说明3',
      create_time  : '2018-11-20 20:10:30',
      keep_live_interval  : 40,
      battery_sleep_time  : 60,
      battery_keep_live_time  : 80,
      checked  : false,
      disable  : false,
    },
  ];

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
  public dataSet = Object.assign([], this.rawData);
  // 表格中显示的数据
  public displayData = [];

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

  // 更新原始数据
  public updateRawData(): void {
    console.log('===updateRawData===');
  }

  constructor(
    private deviceService: DeviceService
  ) {
  }

  ngOnInit() {
    console.log('===ngOnInit===');

    this.deviceService.getAllDevices().subscribe(
      data => {
        if (data.code === 0) {
          const netData = Object.values(data.data);
          for (const device of netData) {
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
          console.log(this.dataSet);
          console.log(this.uidList);
          console.log(this.imsiList);
          console.log(this.nameList);
          console.log(this.serialNumberList);
          console.log(this.statusList);
          console.log(this.typeList);
          console.log(this.userList);
          console.log(this.departmentList);
        }
      },
      error => {
        console.log(error);
      },
      () => {
        console.log('Get All Devices Complete');
      }
    );
  }

  // 获取当前页面的数据
  public currentPageDataChange($event: Array<{
    uid: string;
    imsi: string;
    name: string;
    serial_number: string;
    type: string;
    status: string;
    user: string;
    department: string;
    keep_live_interval: number;
    battery_sleep_time: number;
    battery_keep_live_time: number;
    checked: boolean;
    disable: boolean}>): void {
    this.displayData = $event;

    console.log('===currentPageDataChange===');
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
