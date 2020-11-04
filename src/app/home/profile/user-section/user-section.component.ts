import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-section',
  templateUrl: './user-section.component.html',
  styleUrls: ['./user-section.component.scss']
})
export class UserSectionComponent implements OnInit {

  @Input()
  public showSkeleton = false;

  @Input()
  public user: User;

  constructor() { }

  ngOnInit(): void {
  }

}
