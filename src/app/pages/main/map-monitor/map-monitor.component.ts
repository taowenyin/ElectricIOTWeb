import { Component, OnInit } from '@angular/core';

declare var BMap: any;

@Component({
  selector: 'app-map-monitor',
  templateUrl: './map-monitor.component.html',
  styleUrls: ['./map-monitor.component.less']
})
export class MapMonitorComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {
    const electricMap = new BMap.Map('map-container');
    const centerPoint = new BMap.Point(116.404, 39.915);
    electricMap.centerAndZoom(centerPoint, 15);
    electricMap.enableScrollWheelZoom(true);
  }

}
