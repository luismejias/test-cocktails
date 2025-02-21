import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appOnlyNumbers]',
  standalone: true,
})
export class OnlyNumbersDirective {
  constructor(private ngControl: NgControl) {}

  @HostListener('input', ['$event'])
  onInputChange(event: InputEvent): void {
    const input = (event.target as HTMLInputElement).value;
    const filteredInput = input.replace(/[^0-9]/g, ''); // Only numbers
    if (input !== filteredInput) {
      this.ngControl.control?.setValue(filteredInput);
    }
  }
}
