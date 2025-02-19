import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocktailsPageComponent } from './cocktails-page.component';

describe('CocktailsPageComponent', () => {
  let component: CocktailsPageComponent;
  let fixture: ComponentFixture<CocktailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CocktailsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CocktailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
