export const SERVER_URL = 'http://192.168.247.130:8080/ElectricIOTServer/api/';

// 用户登录接口
export const API_LOGIN = SERVER_URL + 'login/';

// 设备信RestFul接口
export const API_MANAGE_DEVICE = SERVER_URL + 'manage/device';
// 获取按设备类型分类的设备接口
export const API_MANAGE_DEVICE_TYPE = SERVER_URL + 'manage/device/type';

// 部门的RestFul接口
export const API_MANAGE_DEPARTMENT = SERVER_URL + 'manage/department';

// 根据部门ID获取用户列表接口
export function  API_MANAGE_USER_DEPARTMENT(id: number): string {
  return SERVER_URL + 'manage/user/department/' + id;
}

// 获取所有设备类型接口
export const API_GET_ALL_DEVICE_TYPE = SERVER_URL + 'manage/type';

// 获取所有设备状态接口
export const API_GET_ALL_DEVICE_STATUS = SERVER_URL + 'manage/status';

