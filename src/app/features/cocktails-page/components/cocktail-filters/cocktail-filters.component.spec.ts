import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CocktailFiltersComponent } from './cocktail-filters.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { OnlyLettersDirective, OnlyNumbersDirective } from '../../../../shared';
import { CocktailFiltersState } from '../../../../core/';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/angular';

describe('CocktailFiltersComponent', () => {
  let fixture: ComponentFixture<CocktailFiltersComponent>;
  let component: CocktailFiltersComponent;
  let filterFormValueChangedEmitMock: jest.SpyInstance<void, [value?: CocktailFiltersState | undefined], any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CocktailFiltersComponent,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        FormsModule,
        OnlyLettersDirective,
        OnlyNumbersDirective,
      ],
    }).compileComponents(); 

    fixture = TestBed.createComponent(CocktailFiltersComponent);
    component = fixture.componentInstance;
    filterFormValueChangedEmitMock = jest.spyOn(component.filterFormValueChanged, 'emit');
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form controls with default values', () => {
    expect(component.cocktailsFiltersForm.value).toEqual({
      id: null,
      name: '',
      ingredient: '',
    });
  });

  it('should emit filter values when filterFormValueChangedEmit is called and form is valid', () => {
    
    component.cocktailsFiltersForm.setValue({
      id: 1,
      name: 'Margarita',
      ingredient: 'Lime',
    });

    
    component.filterFormValueChangedEmit();

    
    expect(filterFormValueChangedEmitMock).toHaveBeenCalledWith({
      id: 1,
      name: 'Margarita',
      ingredient: 'Lime',
    });
  });

  it('should not emit filter values when form is invalid (empty fields)', () => {
    
    component.cocktailsFiltersForm.setValue({
      id: null,
      name: '',
      ingredient: '',
    });

    
    component.filterFormValueChangedEmit();

    
    expect(filterFormValueChangedEmitMock).not.toHaveBeenCalled();
  });

  it('should call cleanFilters and reset form to initial state', () => {
    
    component.cocktailsFiltersForm.setValue({
      id: 1,
      name: 'Old Name',
      ingredient: 'Old Ingredient',
    });

    
    component.cleanFilters();

    
    expect(component.cocktailsFiltersForm.value).toEqual({
      id: null,
      name: '',
      ingredient: '',
    });
    expect(filterFormValueChangedEmitMock).toHaveBeenCalledWith({
      id: null,
      name: '',
      ingredient: '',
    });
  });

  it('should return true from isFiltersValid if any field is filled', () => {
    component.cocktailsFiltersForm.setValue({ id: 1, name: 'Margarita', ingredient: '' });
    expect(component.isFiltersValid()).toBe(true);
  });

  it('should return false from isFiltersValid if all fields are empty', () => {
    component.cocktailsFiltersForm.setValue({ id: null, name: '', ingredient: '' });
    expect(component.isFiltersValid()).toBe(false);
  });
});
