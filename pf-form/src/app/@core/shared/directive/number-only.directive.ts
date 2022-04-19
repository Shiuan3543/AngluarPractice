import {Directive, ElementRef, HostListener} from '@angular/core';
import {NgControl} from "@angular/forms";

@Directive({
  selector: '[formControlName][numbersOnly]'
})
export class NumberOnlyDirective {

  constructor(public ngControl: NgControl) {
  }

  @HostListener('ngModelChange', ['$event'])
  onModelChange(event) {
    this.onInputChange(event, false);
  }

  @HostListener('keydown.backspace', ['$event'])
  keydownBackspace(event) {
    this.onInputChange(event.target.value, true);
  }

  @HostListener('focusout', ['$event'])
  focusout(event) {
    this.onInputChange(event.target.value, true);
  }

  onInputChange(event, backspace) {
    if(!event) return;
    let rawValue = event.replace(/[^0-9]*/g,''); // 限定英文字
    this.ngControl.valueAccessor.writeValue(rawValue);
  }

}
