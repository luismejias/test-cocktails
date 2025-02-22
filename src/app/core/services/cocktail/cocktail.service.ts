import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, forkJoin, map, of } from 'rxjs';
import { CocktailStateService, Drink } from '../../../core';

@Injectable({ providedIn: 'root' })
export class CocktailService {
  private http = inject(HttpClient);
  private cocktailStateService = inject(CocktailStateService);
  private apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/';

  loadDataCocktails(): void {
    this.cocktailStateService.setCocktailState([],  true);
    const letters = Array.from({ length: 26 }, (_, i) =>
      String.fromCharCode(i + 97)
    );
    const requests = letters.map((letter) =>
      this.http
        .get<{ drinks: Drink[] }>(`${this.apiUrl}search.php?f=${letter}`)
        .pipe(
          catchError(() => of({ drinks: [] })) // Maneja errores sin cancelar todo
        )
    );

    forkJoin(requests)
      .pipe(
        map((responses) =>
          responses.reduce(
            (acc, response) => acc.concat((response.drinks || []) as never),
            []
          )
        )
      )
      .subscribe({
        next: (cocktails: Drink[]) => {
          this.cocktailStateService.setCocktailState(cocktails,  false);
        },
        error: (error) => console.error('Error loading cocktails:', error),
      });
  }
}
