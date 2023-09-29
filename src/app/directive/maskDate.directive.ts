import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appMaskDate]'
})
export class MaskDateDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: any): void {
    const input = event.target;
    const value = input.value.replace(/\D/g, '');

    if (value.length === 8) {
      input.value = `${value.substr(0, 2)}/${value.substr(2, 2)}/${value.substr(4, 4)}`;
    } else {
      input.value = value;
    }
  }

}
