import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocktailFiltersComponent } from './cocktail-filters.component';

describe('CocktailFiltersComponent', () => {
  let component: CocktailFiltersComponent;
  let fixture: ComponentFixture<CocktailFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CocktailFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CocktailFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
