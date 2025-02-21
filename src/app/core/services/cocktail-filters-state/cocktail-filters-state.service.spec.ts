import { TestBed } from '@angular/core/testing';

import { CocktailFiltersStateService } from './cocktail-filters-state.service';

describe('CocktailFiltersStateService', () => {
  let service: CocktailFiltersStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CocktailFiltersStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
