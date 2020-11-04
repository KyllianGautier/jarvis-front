import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTinyLabel]'
})
export class TinyLabelDirective {

  constructor(private el: ElementRef) {
    this.el.nativeElement.style.color = 'grey';
    this.el.nativeElement.style.fontSize = '12px';
    this.el.nativeElement.style.margin = 'unset';
    this.el.nativeElement.style.marginBottom = '4px';
  }

}
