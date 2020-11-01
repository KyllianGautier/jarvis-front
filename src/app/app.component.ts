import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {delay} from 'rxjs/operators';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string;

  translationLoaded: boolean;

  constructor(
    private translate: TranslateService,
    private primengConfig: PrimeNGConfig
  ) {
    this.title = 'jarvis-front';

    this.translationLoaded = false;

    translate.addLangs(['en']);
    translate.setDefaultLang('en');
    translate.use('en')
      .subscribe(() => this.translationLoaded = true);

    this.primengConfig.ripple = true;
  }
}
