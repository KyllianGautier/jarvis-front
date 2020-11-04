import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-security-section',
  templateUrl: './security-section.component.html',
  styleUrls: ['./security-section.component.scss']
})
export class SecuritySectionComponent implements OnInit {

  @Input()
  public showSkeleton = false;

  @Input()
  public userDevices: UserDevice[];

  constructor() { }

  ngOnInit(): void {
  }

}
