import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';
export interface cocktailState {
  cocktail: unknown;
}

const initialState: cocktailState = {
  cocktail: {},
};

@Injectable({
  providedIn: 'root',
})
export class CocktailStateService {
  private cocktailStateSubject$ = new BehaviorSubject<cocktailState>(
    initialState
  );

  private cocktailState$ = this.cocktailStateSubject$.asObservable();

  select<K>(fnMap: (state: cocktailState) => K): Observable<K> {
    return this.cocktailState$.pipe(
      map((source) => fnMap(source)),
      distinctUntilChanged()
    );
  }

  getCurrentState<K extends keyof cocktailState>(key: K): cocktailState[K] {
    return this.cocktailStateSubject$.getValue()[key];
  }

  setcocktailState(cocktail: unknown): void {
    this.updateState({ cocktail });
  }

  updateState(partialState: Partial<cocktailState>): void {
    const currentState = this.cocktailStateSubject$.getValue();
    const newState = {
      ...currentState,
      ...partialState,
    };
    this.cocktailStateSubject$.next(newState);
  }
}
