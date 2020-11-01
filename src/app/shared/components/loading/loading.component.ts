import { Component, Input, OnInit } from '@angular/core';
import { appConstants } from '../../constants/app-constants';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  public appName: string;

  @Input()
  public showLogo: boolean;

  constructor() {
    this.appName = appConstants.APP_NAME;
    this.showLogo = false;
  }

  ngOnInit(): void { }

}
