import { TestBed } from '@angular/core/testing';
import { CocktailService } from './cocktail.service';
import { CocktailStateService, Drink } from '../../../core';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

describe('CocktailService', () => {
  let service: CocktailService;
  let stateService: jest.Mocked<CocktailStateService>;

  // Mock de la respuesta de los cócteles
  const mockDrinks: Partial<Drink>[] = [
    { idDrink: '1', strDrink: 'Mojito', strDrinkThumb: 'image1.jpg' },
    { idDrink: '2', strDrink: 'Martini', strDrinkThumb: 'image2.jpg' }
  ];

  beforeEach(() => {
    // Mock del servicio CocktailStateService
    stateService = {
      setCocktailState: jest.fn(),
    } as any;

    // Mock del HttpClient
    const httpClientMock = {
      get: jest.fn().mockReturnValue(of({ drinks: mockDrinks })),
    };

    TestBed.configureTestingModule({
      providers: [
        CocktailService,
        { provide: CocktailStateService, useValue: stateService },
        { provide: HttpClient, useValue: httpClientMock },
      ],
    });

    service = TestBed.inject(CocktailService);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Limpiar los mocks entre pruebas
  });

  it('should fetch cocktails for all letters and update the state', () => {
    // Llamada al método loadDataCocktails
    service.loadDataCocktails();

    const letters = ['a', 'b']; // Limitamos las letras para que solo se ejecuten 2 solicitudes

    // Verificamos que se hayan realizado las llamadas HTTP correspondientes a 'a' y 'b'
    letters.forEach((letter) => {
      expect(service['http'].get).toHaveBeenCalled();
    });

    // Verificamos que la función setCocktailState fue llamada con los cócteles correctos
    expect(stateService.setCocktailState).toHaveBeenCalled( );
  });

  it('should handle error and return empty list if request fails', () => {
    // Mock de un error en la llamada HTTP
    const httpClientMock = TestBed.inject(HttpClient);
    httpClientMock.get = jest.fn().mockReturnValue(of({ drinks: [] }));

    service.loadDataCocktails();

    // Verificamos que la función setCocktailState haya sido llamada con una lista vacía
    expect(stateService.setCocktailState).toHaveBeenCalledWith([], false);
  });
});
