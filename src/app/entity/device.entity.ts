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
  keep_live_interval: number;
  battery_sleep_time: number;
  battery_keep_live_time: number;
  checked: boolean;
  disable: boolean;
}
