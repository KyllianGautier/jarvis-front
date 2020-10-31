import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appJarvisFont]'
})
export class JarvisFontDirective {

  constructor(private el: ElementRef) {
    this.el.nativeElement.style.fontFamily = 'Orbitron';
  }
}
