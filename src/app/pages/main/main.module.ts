import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule
  ]
})
export class MainModule { }
