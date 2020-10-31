import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string;

  translationLoaded: boolean;

  constructor(translate: TranslateService) {
    this.title = 'jarvis-front';

    this.translationLoaded = false;

    translate.addLangs(['en']);
    translate.setDefaultLang('en');
    translate.use('en')
      .subscribe(() => this.translationLoaded = true);
  }
}
