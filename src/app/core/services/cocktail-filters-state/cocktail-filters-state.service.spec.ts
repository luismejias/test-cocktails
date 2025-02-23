import { TestBed } from '@angular/core/testing';
import { CocktailFiltersStateService } from './cocktail-filters-state.service';
import { CocktailFiltersState } from '../../models/coctail-filters-state.interface';

// Mock del estado inicial
const initialState: CocktailFiltersState = {
  id: 0,
  name: '',
  ingredient: '',
};

describe('CocktailFiltersStateService', () => {
  let service: CocktailFiltersStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CocktailFiltersStateService],
    });

    service = TestBed.inject(CocktailFiltersStateService);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Limpiar los mocks entre las pruebas
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the initial state when getCocktailFiltersState is called', (done) => {
    service.getCocktailFiltersState().subscribe((state) => {
      expect(state).toEqual(initialState);
      done();
    });
  });

  it('should return the current state for a specific key using getCurrentState', () => {
    const currentName = service.getCurrentState('name');
    expect(currentName).toBe(initialState.name); // El valor inicial de 'name' es ''
  });

  it('should update the state correctly when setCocktailFiltersState is called', () => {
    const newState: CocktailFiltersState = { id: 1, name: 'Margarita', ingredient: 'Tequila' };
    service.setCocktailFiltersState(newState);

    // Verificamos que el estado se haya actualizado
    service.getCocktailFiltersState().subscribe((state) => {
      expect(state).toEqual(newState);
    });
  });

  it('should emit changes correctly when updateState is called', () => {
    const partialState: Partial<CocktailFiltersState> = { name: 'Pina Colada' };

    service.updateState(partialState);

    service.getCocktailFiltersState().subscribe((state) => {
      expect(state.name).toBe('Pina Colada');
      expect(state.id).toBe(initialState.id); // El resto de los valores deberían mantenerse iguales
      expect(state.ingredient).toBe(initialState.ingredient);
    });
  });

  it('should emit values from select when subscribed', (done) => {
    const newName = 'Bloody Mary';
    service.updateState({ name: newName });

    // Usamos select para obtener solo el 'name' del estado
    service.select((state) => state.name).subscribe((name) => {
      expect(name).toBe(newName);
      done();
    });
  });
});
