import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cocktails } from '../../../core';

@Injectable({ providedIn: 'root' })
export class CocktailService {
  private http = inject(HttpClient);
  private apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/';

  getByName(name?: string): Observable<Cocktails> {
    return this.http.get<Cocktails>(`${this.apiUrl}search.php?s=${name || 'a'}`);
  }

  getByIngredient(ingredient: string): Observable<Cocktails> {
    return this.http.get<Cocktails>(`${this.apiUrl}filter.php?i=${ingredient}`);
  }

  getById(id: number): Observable<Cocktails> {
    return this.http.get<Cocktails>(`${this.apiUrl}lookup.php?i=${id}`);
  }
}