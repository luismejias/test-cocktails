import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';
import { Drink } from '../../models/cocktail.interface';
export interface CocktailState {
  cocktails: Drink[];
  isLoadingResults: boolean
}

const initialState: CocktailState = {
  cocktails: [],
  isLoadingResults: false
};

@Injectable({
  providedIn: 'root',
})
export class CocktailStateService {
  private cocktailStateSubject$ = new BehaviorSubject<CocktailState>(
    initialState
  );

  private cocktailState$ = this.cocktailStateSubject$.asObservable();

  select<K>(fnMap: (state: CocktailState) => K): Observable<K> {
    return this.cocktailState$.pipe(
      map((source) => fnMap(source)),
      distinctUntilChanged()
    );
  }

  getCurrentState<K extends keyof CocktailState>(key: K): CocktailState[K] {
    return this.cocktailStateSubject$.getValue()[key];
  }
  
  getCocktailState(): Observable<CocktailState> {
      return this.cocktailState$;
    }

  setCocktailState(cocktails: Drink[], isLoadingResults?: boolean): void {
    this.updateState({cocktails, isLoadingResults } );
  }

  updateState(partialState: Partial<CocktailState>): void {
    const currentState = this.cocktailStateSubject$.getValue();
    const newState = {
      ...currentState,
      ...partialState,
    };
    this.cocktailStateSubject$.next(newState);
  }
}
