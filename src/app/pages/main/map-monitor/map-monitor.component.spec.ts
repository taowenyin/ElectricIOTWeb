import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapMonitorComponent } from './map-monitor.component';

describe('MapMonitorComponent', () => {
  let component: MapMonitorComponent;
  let fixture: ComponentFixture<MapMonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapMonitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
