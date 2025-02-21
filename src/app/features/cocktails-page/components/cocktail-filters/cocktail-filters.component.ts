import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { OnlyLettersDirective, OnlyNumbersDirective } from '../../../../shared';
@Component({
  selector: 'app-cocktail-filters',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    OnlyLettersDirective,
    OnlyNumbersDirective
  ],
  templateUrl: './cocktail-filters.component.html',
  styleUrl: './cocktail-filters.component.scss',
})
export class CocktailFiltersComponent {
  @Output() filterFormValueChanged = new EventEmitter<any>();
  cocktailsFiltersForm!: FormGroup;
  constructor(private readonly formBuilder: FormBuilder) {
    this.cocktailsFiltersForm = this.formBuilder.group({
      id: ['', []],
      name: ['', [Validators.maxLength(50)]],
      ingredient: ['', []],
    });
  }

  filterFormValueChangedEmit(): void {
    this.filterFormValueChanged.emit(this.cocktailsFiltersForm.value);
  }

  cleanFilters(): void {
    this.cocktailsFiltersForm.patchValue({
      id: '',
      name: '',
      ingredient:''
    });
    this.filterFormValueChangedEmit();
  }
}
