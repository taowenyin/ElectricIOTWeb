///<reference path="../../../../../node_modules/ng-zorro-antd/tree/nz-tree-node.d.ts"/>
import {Component, OnInit, ViewChild} from '@angular/core';
import {NzFormatEmitEvent, NzTreeNode, NzTreeNodeOptions} from 'ng-zorro-antd';
import {DeviceService} from '../../../core/device.service';
import {DeviceTreeNodeEntity} from '../../../entity/device-tree-node.entity';

declare var BMap: any;

@Component({
  selector: 'app-map-monitor',
  templateUrl: './map-monitor.component.html',
  styleUrls: ['./map-monitor.component.less']
})
export class MapMonitorComponent implements OnInit {
  @ViewChild('deviceTypeTree') deviceTypeTree;

  public devicesTreeData: NzTreeNodeOptions[] = [];
  public rawDevicesTreeData: DeviceTreeNodeEntity[] = [];

  constructor(private deviceService: DeviceService) {
  }

  ngOnInit() {
    const electricMap = new BMap.Map('map-bd');
    const centerPoint = new BMap.Point(116.404, 39.915);
    electricMap.centerAndZoom(centerPoint, 15);
    electricMap.enableScrollWheelZoom(true);

    this.loadTypeClassifyDevices();
  }

  public treeNodeClick(event: NzFormatEmitEvent): void {
    console.log(event, event.selectedKeys, event.keys, event.nodes, this.deviceTypeTree.getSelectedNodeList());
  }

  public treeNodeCheck(event: NzFormatEmitEvent): void {
    console.log(event, event.checkedKeys, event.keys, event.nodes);
  }

  public treeNodeSelect(keys: string[]): void {
    console.log(keys, this.deviceTypeTree.getSelectedNodeList());
  }

  public treeNodeExpand(event: NzFormatEmitEvent): void {
    console.log(event);
  }

  // 获取设备类型分类的设备
  private loadTypeClassifyDevices(): void {
    this.deviceService.getTypeClassifyDevices().subscribe(
      data => {
        if (data.code === 0) {
          const typeClassifyData = Object.values(data.data);
          for (const typeClassify of typeClassifyData) {
            const classifyNode: DeviceTreeNodeEntity = new DeviceTreeNodeEntity();

            // 创建父节点
            if (typeClassify.type.id === 0) {
              classifyNode.title = '未定义';
            } else {
              classifyNode.title = typeClassify.type.name;
            }
            classifyNode.key = typeClassify.type.id;
            classifyNode.expanded = true;

            // 创建子节点
            for (const device of typeClassify.devices) {
              const deviceNode: DeviceTreeNodeEntity = new DeviceTreeNodeEntity();
              if (device.type_id == null) {
                deviceNode.title = device.imsi;
              } else {
                deviceNode.title = device.name;
              }

              deviceNode.key = device.id;
              deviceNode.isLeaf = true;

              classifyNode.children.push(deviceNode);
            }

            this.rawDevicesTreeData.push(classifyNode);
          }

          this.devicesTreeData = this.rawDevicesTreeData;
        }
      },
      error => {
        console.log(error);
      },
      () => {
        console.log('Get Type Classify Devices Complete');
      }
    );
  }

}
