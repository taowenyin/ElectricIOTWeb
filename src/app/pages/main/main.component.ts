import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {

  // 默认是否折叠
  public isCollapsed = false;
  public isReverseArrow = false;
  // 菜单栏的默认宽度
  public menuWidth = 200;

  constructor() { }

  ngOnInit() {
  }

}
