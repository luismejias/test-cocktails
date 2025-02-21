import { Injectable } from '@angular/core';
import { CocktailFiltersState } from '../../models/coctail-filters-state.interface';
import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';
const initialState: CocktailFiltersState = {
  id: 0,
  name: '',
  ingredient: ''
};
@Injectable({
  providedIn: 'root'
})
export class CocktailFiltersStateService {
 private CocktailFiltersStateSubject$ = new BehaviorSubject<CocktailFiltersState>(
    initialState
  );

  private CocktailFiltersState$ = this.CocktailFiltersStateSubject$.asObservable();

  select<K>(fnMap: (state: CocktailFiltersState) => K): Observable<K> {
    return this.CocktailFiltersState$.pipe(
      map((source) => fnMap(source)),
      distinctUntilChanged()
    );
  }

  getCurrentState<K extends keyof CocktailFiltersState>(key: K): CocktailFiltersState[K] {
    return this.CocktailFiltersStateSubject$.getValue()[key];
  }

  setCocktailFiltersState(state: {id: number, name: string, ingredient: string }): void {
    this.updateState({ ...state });
  }

  updateState(partialState: Partial<CocktailFiltersState>): void {
    const currentState = this.CocktailFiltersStateSubject$.getValue();
    const newState = {
      ...currentState,
      ...partialState,
    };
    this.CocktailFiltersStateSubject$.next(newState);
  }
}
