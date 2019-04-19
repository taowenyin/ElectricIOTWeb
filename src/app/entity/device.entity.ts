export class DeviceEntity {
  id: number;
  uid: string;
  imsi: string;
  name: string;
  serial_number: string;
  is_delete: number;
  type_id: number;
  type: string;
  status_id: number;
  status: string;
  user_id: number;
  user: string;
  department_id: number;
  department: string;
  comment: string;
  create_time: string;
  keep_live_interval = 60;
  battery_sleep_time = 180;
  battery_keep_live_time = 300;
  checked: boolean;
  disable: boolean;
  server_ip: string;

  public clear(): void {
    this.id = 0;
    this.uid = '';
    this.imsi = '';
    this.name = '';
    this.serial_number = '';
    this.is_delete = 0;
    this.type_id = 0;
    this.type = '';
    this.status_id = 0;
    this.status = '';
    this.user_id = 0;
    this.user = '';
    this.department_id = 0;
    this.department = '';
    this.comment = '';
    this.create_time = '';
    this.keep_live_interval = 60;
    this.battery_sleep_time = 180;
    this.battery_keep_live_time = 300;
    this.checked = false;
    this.disable = false;
    this.server_ip = '172.81.239.174:65001';
  }
}
