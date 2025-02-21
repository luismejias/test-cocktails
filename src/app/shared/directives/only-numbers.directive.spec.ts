import { OnlyNumbersDirective } from './only-numbers.directive';
import { FormControl, NgControl } from '@angular/forms';
import { render, screen, fireEvent } from '@testing-library/angular';
import { Component } from '@angular/core';

class MockNgControl extends NgControl {
  control = new FormControl();
  viewToModelUpdate() {}
}

@Component({
  template: `<input appOnlyNumbers data-testid="input" [formControl]="control" />`,
  standalone: true,
  imports: [OnlyNumbersDirective],
})
class TestComponent {
  control = new FormControl('');
}

describe('OnlyNumbersDirective', () => {
  it('should create an instance', async () => {
    const { fixture } = await render(TestComponent, {
          imports: [OnlyNumbersDirective],
          providers: [{
            provide: NgControl, useValue: MockNgControl
          }]
        });
    const directive = fixture.debugElement.query(
      (el) => el.injector.get(OnlyNumbersDirective, null) !== null
    );
    expect(directive).toBeTruthy();
  });

  it('should allow only numbers', async () => {
    await render(TestComponent, {
      imports: [OnlyNumbersDirective],
      providers: [{
        provide: NgControl, useValue: MockNgControl
      }]
    });

    const input = screen.getByTestId('input') as HTMLInputElement;

    fireEvent.input(input, { target: { value: '12345' } });
    expect(input.value).toBe('12345');

    fireEvent.input(input, { target: { value: '123abc' } });
    expect(input.value).toBe('123');

    fireEvent.input(input, { target: { value: '12!@#' } });
    expect(input.value).toBe('12');
  });
});
