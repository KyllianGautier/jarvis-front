import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appImportantLabel]'
})
export class ImportantLabelDirective {

  constructor(private el: ElementRef) {
    this.el.nativeElement.style.fontSize = '26px';
    this.el.nativeElement.style.margin = 'unset';
  }

}
