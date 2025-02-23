import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CocktailsPageComponent } from './cocktails-page.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CocktailService, CocktailStateService, CocktailFiltersStateService, CocktailState } from '../../core';
import { of } from 'rxjs';
import { MatDialogModule } from '@angular/material/dialog';
import { CocktailsTableComponent, CocktailFiltersComponent } from './components/';
import { MatButtonModule } from '@angular/material/button';
import { HandlerStorageService } from '../../shared';

describe('CocktailsPageComponent', () => {
  let component: CocktailsPageComponent;
  let fixture: ComponentFixture<CocktailsPageComponent>;
  let mockCocktailService: { loadDataCocktails: any; };
  let mockCocktailStateService: { getCocktailState: any; };
  let mockCocktailFiltersStateService: { getCocktailFiltersState: any; setCocktailFiltersState: any; };
  let mockHandlerStorageService;

  beforeEach(async () => {
    mockCocktailService = {
      loadDataCocktails: jest.fn(),
    };

    mockCocktailStateService = {
      getCocktailState: jest.fn().mockReturnValue(of({ cocktails: [], isLoadingResults: false })),
    };

    mockCocktailFiltersStateService = {
      getCocktailFiltersState: jest.fn().mockReturnValue(of({ id: 0, name: '', ingredient: '' })),
      setCocktailFiltersState: jest.fn(),
    };

    mockHandlerStorageService = {
      getDataFromStorage: jest.fn().mockReturnValue([]),
    };

    await TestBed.configureTestingModule({
      imports: [
        CocktailsPageComponent,
        MatTableModule,
        MatPaginatorModule,
        MatDialogModule,
        MatButtonModule,
        CocktailsTableComponent,
        CocktailFiltersComponent,
      ],
      providers: [
        { provide: CocktailService, useValue: mockCocktailService },
        { provide: CocktailStateService, useValue: mockCocktailStateService },
        { provide: CocktailFiltersStateService, useValue: mockCocktailFiltersStateService },
        { provide: HandlerStorageService, useValue: mockHandlerStorageService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CocktailsPageComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call cocktailStateService.getCocktailState on ngOnInit', () => {
    component.ngOnInit();
    expect(mockCocktailStateService.getCocktailState).toHaveBeenCalled();
  });

  it('should load data when _loadData is called', () => {
    component['_loadData']();
    expect(mockCocktailService.loadDataCocktails).toHaveBeenCalled();
  });

  it('should set dataSource when _getDataCocktailsFromState is called', () => {
    const mockCocktailState: CocktailState = { cocktails: [{
      idDrink: '1', strDrink: 'Margarita', strIngredient1: 'Tequila', strMeasure1: '50ml', strInstructionsES: 'Mix', strDrinkThumb: '',
      strCategory: null,
      strAlcoholic: null,
      strGlass: null,
      strInstructions: null,
      strInstructionsDE: null,
      strInstructionsIT: null,
      strIngredient2: null,
      strMeasure2: null,
      strCreativeCommonsConfirmed: null,
      dateModified: null
    }], isLoadingResults: false };
    mockCocktailStateService.getCocktailState.mockReturnValue(of(mockCocktailState));

    component['_getDataCocktailsFromState']();
    expect(component.dataSource.data).toHaveLength(1);
    expect(component.isLoadingResults).toBe(false);
  });

  it('should filter data when onFilter is called', () => {
    const filterData = { id: 1, name: 'Margarita', ingredient: 'Tequila' };
    const mockData = [
      { id: 1, 
        name: 'Margarita', 
        ingredients: ['Tequila'], 
        measures: ['50ml'], 
        instructions: 'Mix', 
        image: '', 
        favorite: false
      }
    ];
    component.originalDataSource.data = mockData;

    component.onFilter(filterData);

    expect(component.dataSource.data).toHaveLength(1);
    expect(component.dataSource.data[0].name).toBe('Margarita');
  });

  it('should update the data source after setting filters', () => {
    const filterData = { id: 1, name: 'Margarita', ingredient: 'Tequila' };
    const mockData = [
      { id: 1, 
        name: 'Margarita', 
        ingredients: ['Tequila'], 
        measures: ['50ml'], 
        instructions: 'Mix', 
        image: '', 
        favorite: false
      }
    ];
    component.originalDataSource.data = mockData;

    component.onFilter(filterData);
    expect(component.dataSource.data[0].name).toEqual('Margarita');
  });

  it('should call setCocktailFiltersState when filters are updated', () => {
    const filterData = { id: 1, name: 'Margarita', ingredient: 'Tequila' };
    component.onFilter(filterData);
    expect(mockCocktailFiltersStateService.setCocktailFiltersState).toHaveBeenCalledWith(filterData);
  });

});
