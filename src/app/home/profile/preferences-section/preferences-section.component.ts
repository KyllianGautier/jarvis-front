import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-preferences-section',
  templateUrl: './preferences-section.component.html',
  styleUrls: ['./preferences-section.component.scss']
})
export class PreferencesSectionComponent implements OnInit {

  @Input()
  public showSkeleton = false;

  constructor() { }

  ngOnInit(): void {
  }

}
