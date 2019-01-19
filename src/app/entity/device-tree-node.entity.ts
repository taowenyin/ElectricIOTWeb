import {NzTreeNode, NzTreeNodeOptions} from 'ng-zorro-antd';

export class DeviceTreeNodeEntity extends Object {
  // 当前节点的名称
  public title: string;
  // 当前节点的Key
  public key: string;

  // 是否禁用CheckBox类型
  public disableCheckbox = false;
  // 是否默认选中
  public checked = false;
  // 是否最后一个节点
  public isLeaf = false;
  // 是否展开
  public expanded = false;

  // 直接点列表
  public children: DeviceTreeNodeEntity[] = [];
}
