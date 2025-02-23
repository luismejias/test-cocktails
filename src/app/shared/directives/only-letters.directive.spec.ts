import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, NgControl } from '@angular/forms';
import { OnlyLettersDirective } from './only-letters.directive';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('OnlyLettersDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let inputElement: HTMLInputElement;
  let ngControl: NgControl;

  // Componente de prueba para envolver la directiva
  @Component({
    template: `<input type="text" [ngModel]="model" appOnlyLetters />`
  })
  class TestComponent {
    model: string = '';
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations:[TestComponent],
      imports: [ OnlyLettersDirective, FormsModule, ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    ngControl = fixture.debugElement.query(By.directive(OnlyLettersDirective)).injector.get(NgControl);
    fixture.detectChanges();
  });

  it('should create the directive', () => {
    const directive = new OnlyLettersDirective(ngControl);
    expect(directive).toBeTruthy();
  });

  it('should allow only letters and spaces to be typed', () => {
    inputElement.value = 'abc123!';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(inputElement.value).toBe('abc'); // non-alphabetic characters should be removed
  });

  it('should not alter letters and spaces', () => {
    inputElement.value = 'Hello World';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(inputElement.value).toBe('Hello World'); // Letters and spaces should remain intact
  });

  it('should update the ngModel correctly when invalid characters are entered', () => {
    inputElement.value = 'Test@123';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(inputElement.value).toBe('Test'); // Non-letters should be removed
  });

  it('should remove numbers and special characters while typing', () => {
    inputElement.value = 'Test1234!';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(inputElement.value).toBe('Test'); // Only letters and spaces are allowed
  });
});
