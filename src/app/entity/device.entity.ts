export class DeviceEntity {
  id: number;
  uid: string;
  imsi: string;
  name: string;
  serial_number: string;
  type: string;
  status: string;
  user: string;
  department: string;
  comment: string;
  create_time: string;
  keep_live_interval: number;
  battery_sleep_time: number;
  battery_keep_live_time: number;
  checked: boolean;
  disable: boolean;
}
