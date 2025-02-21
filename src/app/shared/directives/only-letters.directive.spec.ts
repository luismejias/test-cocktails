import { OnlyLettersDirective } from './only-letters.directive';
import { FormControl, FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { render, screen, fireEvent } from '@testing-library/angular';

class MockNgControl extends NgControl {
  control = new FormControl();
  viewToModelUpdate() {}
}

describe('OnlyLettersDirective', () => {
  it('should create an instance', () => {
    const directive = new OnlyLettersDirective(new MockNgControl());
    expect(directive).toBeTruthy();
  });

  it('should allow only letters and spaces', async () => {
    await render(`<input appOnlyLetters data-testid="input" />`, {
      imports: [OnlyLettersDirective],
      providers: [{
        provide: NgControl, useValue: MockNgControl
      }]
    });
    const input = screen.getByTestId('input') as HTMLInputElement;
    const event = new KeyboardEvent('keydown', { key: '@' });
    fireEvent.input(input, event);
    expect(input.value).toBe('');
  });

  it('should allow only letters and spaces', async () => {
    const { fixture } = await render(`<input appOnlyLetters data-testid="input" />`, {
      imports: [OnlyLettersDirective],
      providers: [{
        provide: NgControl, useClass: MockNgControl
      }]
    });
    const input = screen.getByTestId('input') as HTMLInputElement;

    fireEvent.keyDown(input, { key: '@' });
    input.value ='@';
    fixture.detectChanges();
    
    
    expect(input.value).toBe('');
  });

  it('should allow only lettersxxxxx', async () => {
    const { fixture } = await render(`<input appOnlyLetters data-testid="input" />`, {
      imports: [OnlyLettersDirective],
      providers: [{
        provide: NgControl, useClass: MockNgControl
      }]
    });
    const input = screen.getByTestId('input') as HTMLInputElement;

    fireEvent.input(input, { target: { value: 'Hello!@#' } });
    
    fixture.detectChanges();
    console.log('input.value=> ', input.value);
    
    expect(input.value).toBe('Hello');
  });

  it('should allow only letters and spaces*********************', async () => {
    await render(`<input appOnlyLetters data-testid="input" />`, {
      imports: [OnlyLettersDirective, ReactiveFormsModule, FormsModule],
      providers: [{ provide: NgControl, useClass: MockNgControl }],
    });

    const input = screen.getByTestId('input') as HTMLInputElement;

    // Simular eventos válidos de teclas (letras y espacios)
    fireEvent.keyDown(input, { key: 'H', code: 'KeyH', charCode: 72 });
    fireEvent.input(input, { target: { value: 'H' } });

    fireEvent.keyDown(input, { key: 'e', code: 'KeyE', charCode: 69 });
    fireEvent.input(input, { target: { value: 'He' } });

    fireEvent.keyDown(input, { key: ' ', code: 'Space', charCode: 32 });
    fireEvent.input(input, { target: { value: 'He ' } });

    fireEvent.keyDown(input, { key: 'l', code: 'KeyL', charCode: 76 });
    fireEvent.input(input, { target: { value: 'He l' } });

    fireEvent.keyDown(input, { key: 'o', code: 'KeyO', charCode: 79 });
    fireEvent.input(input, { target: { value: 'He lo' } });

    expect(input.value).toBe('He lo');

    // Simular eventos de teclas inválidas
    fireEvent.keyDown(input, { key: '!', code: 'Digit1', charCode: 33 });
    fireEvent.input(input, { target: { value: 'He lo!' } });

    fireEvent.keyDown(input, { key: '@', code: 'Digit2', charCode: 64 });
    fireEvent.input(input, { target: { value: 'He lo!@' } });

    expect(input.value).toBe('He lo');
  });
});
