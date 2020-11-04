import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-device-section',
  templateUrl: './device-section.component.html',
  styleUrls: ['./device-section.component.scss']
})
export class DeviceSectionComponent implements OnInit {

  @Input()
  public userDevice: UserDevice;

  constructor() { }

  ngOnInit(): void {
  }

}
