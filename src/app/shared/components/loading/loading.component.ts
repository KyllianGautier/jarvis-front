import { Component, OnInit } from '@angular/core';
import { appConstants } from '../../constants/app-constants';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  public appName: string;

  constructor() {
    this.appName = appConstants.APP_NAME;
  }

  ngOnInit(): void { }

}
