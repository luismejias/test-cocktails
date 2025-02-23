import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CocktailsTableComponent } from './cocktails-table.component';
import { MatDialog } from '@angular/material/dialog';
import { HandlerStorageService } from '../../../../shared';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BreakpointObserver } from '@angular/cdk/layout';
import { of } from 'rxjs';
import { CONSTANTS } from '../../../../shared';
import { FormattedCocktail } from '../../../../core';
const element = 
{
  id: 1,
  name: 'Margarita',
  ingredients: '',
  measures: '',
  instructions: '',
  favorite: false,
  image: ''
} as unknown as FormattedCocktail;
describe('CocktailsTableComponent', () => {
  let component: CocktailsTableComponent;
  let fixture: ComponentFixture<CocktailsTableComponent>;
  let mockHandlerStorageService: { refreshData: any; setDataInStorage: any; getDataFromStorage: any; getData$?: jest.Mock<any, any, any>; };
  let mockBreakpointObserver: { observe: any; };
  let mockMatDialog: { open: any; };

  beforeEach(async () => {
    mockHandlerStorageService = {
      getData$: jest.fn().mockReturnValue(of([])),
      refreshData: jest.fn(),
      getDataFromStorage: jest.fn().mockReturnValue([]),
      setDataInStorage: jest.fn(),
    };

    mockBreakpointObserver = {
      observe: jest.fn().mockReturnValue(of({ matches: false })),
    };

    mockMatDialog = {
      open: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [
        CocktailsTableComponent,
        MatTableModule,
        MatPaginatorModule,
        MatDialogModule,
        MatButtonModule,
      ],
      providers: [
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: HandlerStorageService, useValue: mockHandlerStorageService },
        { provide: BreakpointObserver, useValue: mockBreakpointObserver },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CocktailsTableComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call handlerStorageService.refreshData in ngAfterViewInit', () => {
    component.ngAfterViewInit();
    expect(mockHandlerStorageService.refreshData).toHaveBeenCalledWith(CONSTANTS.FAVORITES);
  });

  it('should call dialog.open when sendAction is called with DETAIL', () => {
    component.sendAction(element, CONSTANTS.DETAIL);
    expect(mockMatDialog.open).toHaveBeenCalled();
  });

  it('should add element to favorites if not already in favorites', () => {
    component.handlerFavorites(element);
    expect(mockHandlerStorageService.setDataInStorage).toHaveBeenCalledWith(
      CONSTANTS.FAVORITES,
      [element]
    );
  });

  it('should remove element from favorites if already in favorites', () => {
    mockHandlerStorageService.getDataFromStorage.mockReturnValue([element]);
    component.handlerFavorites(element);
    expect(mockHandlerStorageService.setDataInStorage).toHaveBeenCalledWith(
      CONSTANTS.FAVORITES,
      []
    );
  });

  it('should update displayed columns when screen width changes', () => {
    // Simulate small screen size (width <= 700px)
    mockBreakpointObserver.observe.mockReturnValue(of({ matches: true }));
    component.ngAfterViewInit();
    expect(component.displayedColumns).toEqual(['name', 'favorites', 'actions']);
  });

  it('should not update displayed columns when screen width is larger than 700px', () => {
    // Simulate large screen size (width > 700px)
    mockBreakpointObserver.observe.mockReturnValue(of({ matches: false }));
    component.ngAfterViewInit();
    expect(component.displayedColumns).toEqual([
      'id',
      'name',
      'ingredients',
      'favorites',
      'image',
      'actions',
    ]);
  });
});
