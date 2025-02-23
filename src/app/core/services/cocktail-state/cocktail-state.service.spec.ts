import { TestBed } from '@angular/core/testing';
import { CocktailStateService } from './cocktail-state.service';
import { Drink } from '../../models/cocktail.interface';

// Mock de estado inicial
const initialState = {
  cocktails: [],
  isLoadingResults: false
};

describe('CocktailStateService', () => {
  let service: CocktailStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CocktailStateService],
    });

    service = TestBed.inject(CocktailStateService);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Limpiar los mocks entre pruebas
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the initial state when getCocktailState is called', (done) => {
    service.getCocktailState().subscribe((state) => {
      expect(state).toEqual(initialState);
      done();
    });
  });

  it('should return the current state for a specific key using getCurrentState', () => {
    const currentCocktails = service.getCurrentState('cocktails');
    expect(currentCocktails).toEqual(initialState.cocktails); // El valor inicial es []
  });

  it('should update the state correctly when setCocktailState is called', () => {
    const newCocktails: Drink[] = [
      { 
        idDrink: '11872',
        strDrink: "Orgasm",
        strDrinkAlternate: null,
        strTags: null,
        strVideo: null,
        strCategory: "Ordinary Drink",
        strIBA: null,
        strAlcoholic: "Alcoholic",
        strGlass: "Cocktail glass",
        strInstructions: "Shake all ingredients with ice, strain into a chilled cocktail glass, and serve.",
        strInstructionsES: "Agite todos los ingredientes con hielo, cuele en una copa de c\u00f3ctel fr\u00eda y sirva.",
        strInstructionsDE: "Alle Zutaten mit Eis sch\u00fctteln, in ein gek\u00fchltes Cocktailglas abseihen und servieren.",
        strInstructionsFR: "Secouez tous les ingr\u00e9dients avec de la glace, filtrez dans un verre \u00e0 cocktail r\u00e9frig\u00e9r\u00e9 et servez.",
        strInstructionsIT: "Shakerare tutti gli ingredienti con ghiaccio, filtrare in una coppetta da cocktail fredda e servire.",
        'strInstructionsZH-HANS': null,
        'strInstructionsZH-HANT': null,
        strDrinkThumb: "https:\/\/www.thecocktaildb.com\/images\/media\/drink\/vr6kle1504886114.jpg",
        strIngredient1: "Creme de Cacao",
        strIngredient2: "Amaretto",
        strIngredient3: "Triple sec",
        strIngredient4: "Vodka",
        strIngredient5: "Light cream",
        strIngredient6: null,
        strIngredient7: null,
        strIngredient8: null,
        strIngredient9: null,
        strIngredient10: null,
        strIngredient11: null,
        strIngredient12: null,
        strIngredient13: null,
        strIngredient14: null,
        strIngredient15: null,
        strMeasure1: "1\/2 oz white ",
        strMeasure2: "1\/2 oz ",
        strMeasure3: "1\/2 oz ",
        strMeasure4: "1\/2 oz ",
        strMeasure5: "1 oz ",
        strMeasure6: null,
        strMeasure7: null,
        strMeasure8: null,
        strMeasure9: null,
        strMeasure10: null,
        strMeasure11: null,
        strMeasure12: null,
        strMeasure13: null,
        strMeasure14: null,
        strMeasure15: null,
        strImageSource: null,
        strImageAttribution: null,
        strCreativeCommonsConfirmed: 'No',
        dateModified: '2017-09-08 16:55:14' },
      { 
        idDrink: '1156',
        strDrink: "Margarita",
        strDrinkAlternate: null,
        strTags: null,
        strVideo: null,
        strCategory: "Ordinary Drink",
        strIBA: null,
        strAlcoholic: "Alcoholic",
        strGlass: "Cocktail glass",
        strInstructions: "Shake all ingredients with ice, strain into a chilled cocktail glass, and serve.",
        strInstructionsES: "Agite todos los ingredientes con hielo, cuele en una copa de c\u00f3ctel fr\u00eda y sirva.",
        strInstructionsDE: "Alle Zutaten mit Eis sch\u00fctteln, in ein gek\u00fchltes Cocktailglas abseihen und servieren.",
        strInstructionsFR: "Secouez tous les ingr\u00e9dients avec de la glace, filtrez dans un verre \u00e0 cocktail r\u00e9frig\u00e9r\u00e9 et servez.",
        strInstructionsIT: "Shakerare tutti gli ingredienti con ghiaccio, filtrare in una coppetta da cocktail fredda e servire.",
        'strInstructionsZH-HANS': null,
        'strInstructionsZH-HANT': null,
        strDrinkThumb: "https:\/\/www.thecocktaildb.com\/images\/media\/drink\/vr6kle1504886114.jpg",
        strIngredient1: "Creme de Cacao",
        strIngredient2: "Amaretto",
        strIngredient3: "Triple sec",
        strIngredient4: "Vodka",
        strIngredient5: "Light cream",
        strIngredient6: null,
        strIngredient7: null,
        strIngredient8: null,
        strIngredient9: null,
        strIngredient10: null,
        strIngredient11: null,
        strIngredient12: null,
        strIngredient13: null,
        strIngredient14: null,
        strIngredient15: null,
        strMeasure1: "1\/2 oz white ",
        strMeasure2: "1\/2 oz ",
        strMeasure3: "1\/2 oz ",
        strMeasure4: "1\/2 oz ",
        strMeasure5: "1 oz ",
        strMeasure6: null,
        strMeasure7: null,
        strMeasure8: null,
        strMeasure9: null,
        strMeasure10: null,
        strMeasure11: null,
        strMeasure12: null,
        strMeasure13: null,
        strMeasure14: null,
        strMeasure15: null,
        strImageSource: null,
        strImageAttribution: null,
        strCreativeCommonsConfirmed: 'No',
        dateModified: '2017-09-08 16:55:14'  }
    ];
    const isLoadingResults = true;
    
    service.setCocktailState(newCocktails, isLoadingResults);

    // Verificamos que el estado se haya actualizado
    service.getCocktailState().subscribe((state) => {
      expect(state.cocktails).toEqual(newCocktails);
      expect(state.isLoadingResults).toBe(isLoadingResults);
    });
  });

  it('should emit changes correctly when updateState is called', () => {
    const partialState = { isLoadingResults: true };
    service.updateState(partialState);

    service.getCocktailState().subscribe((state) => {
      expect(state.isLoadingResults).toBe(true);
      expect(state.cocktails).toEqual(initialState.cocktails); // Los cócteles no deben cambiar
    });
  });

  it('should emit values from select when subscribed', (done) => {
    const newCocktailState = { cocktails: [], isLoadingResults: true };
    service.updateState(newCocktailState);

    // Usamos select para obtener solo el estado de isLoadingResults
    service.select((state) => state.isLoadingResults).subscribe((isLoadingResults) => {
      expect(isLoadingResults).toBe(true);
      done();
    });
  });

});
