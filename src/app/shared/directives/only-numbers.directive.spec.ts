import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, NgControl } from '@angular/forms';
import { OnlyNumbersDirective } from './only-numbers.directive';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('OnlyNumbersDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let inputElement: HTMLInputElement;
  let ngControl: NgControl;

  // Componente de prueba para envolver la directiva
  @Component({
    template: `<input type="text" [ngModel]="model" appOnlyNumbers />`
  })
  class TestComponent {
    model: string = '';
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [OnlyNumbersDirective, FormsModule, ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    ngControl = fixture.debugElement.query(By.directive(OnlyNumbersDirective)).injector.get(NgControl);
    fixture.detectChanges();
  });

  it('should create the directive', () => {
    const directive = new OnlyNumbersDirective(ngControl);
    expect(directive).toBeTruthy();
  });

  it('should allow only numbers to be typed', () => {
    inputElement.value = '123abc';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(inputElement.value).toBe('123'); // non-numeric characters should be removed
  });

  it('should not alter numeric input', () => {
    inputElement.value = '456789';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(inputElement.value).toBe('456789'); // Numbers should remain intact
  });

  it('should update the ngModel correctly when non-numeric characters are entered', () => {
    inputElement.value = '100A200';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(inputElement.value).toBe('100200'); // Non-numeric characters should be removed
  });

  it('should remove special characters while typing', () => {
    inputElement.value = '123$%';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(inputElement.value).toBe('123'); // Only numbers should remain
  });
});
