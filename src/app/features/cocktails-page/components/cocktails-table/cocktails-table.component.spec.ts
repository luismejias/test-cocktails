import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocktailsTableComponent } from './cocktails-table.component';

describe('CocktailsTableComponent', () => {
  let component: CocktailsTableComponent;
  let fixture: ComponentFixture<CocktailsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CocktailsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CocktailsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
