import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appOnlyLetters]',
  standalone: true,
})
export class OnlyLettersDirective {
  constructor(private ngControl: NgControl) {}
  @HostListener('input', ['$event'])
  onInputChange(event: InputEvent): void {
    const input = (event.target as HTMLInputElement).value;
    const filteredInput = input.replace(/[^a-zA-Z\s]/g, ''); //only letters and spaces
    if (input !== filteredInput) {
      this.ngControl.control?.setValue(filteredInput);
    }
  }
}
