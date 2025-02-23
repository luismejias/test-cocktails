import { Component, inject, OnInit } from '@angular/core';
import {
  CocktailFiltersState,
  CocktailFiltersStateService,
  CocktailService,
  CocktailState,
  CocktailStateService,
  Drink,
  FormattedCocktail,
} from '../../core';
import {
  CocktailFiltersComponent,
  CocktailsTableComponent,
} from './components/';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CONSTANTS, HandlerStorageService, NotFoundComponent } from '../../shared';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CocktailsTableComponent,
    CocktailFiltersComponent,
    NgxSkeletonLoaderModule,
    NotFoundComponent
  ],
  templateUrl: './cocktails-page.component.html',
  styleUrl: './cocktails-page.component.scss',
})
export class CocktailsPageComponent implements OnInit {
  private cocktailService = inject(CocktailService);
  private cocktailStateService = inject(CocktailStateService);
  private cocktailFiltersStateService = inject(CocktailFiltersStateService);
  private handlerStorageService = inject(HandlerStorageService);
  dataSource = new MatTableDataSource<FormattedCocktail>([]);
  originalDataSource = new MatTableDataSource<FormattedCocktail>([]);
  cocktails$!: Observable<CocktailState>;
  isLoadingResults: boolean = false;

  ngOnInit() {
    this.cocktailFiltersStateService
      .getCocktailFiltersState()
      .subscribe((res) => {
        console.log('estado de los filtros => ', res);
      });
    this._loadData();
    this._getDataCocktailsFromState();
  }

  onFilter(filterFormValueChanged: CocktailFiltersState): void {
    this.cocktailFiltersStateService.setCocktailFiltersState(
      filterFormValueChanged
    );

    const { id, name, ingredient } = filterFormValueChanged;

    this.dataSource.data = this.originalDataSource.data.filter((drink) => {
      return (
        drink.name &&
        drink.name.toLowerCase().includes(name.toLowerCase() || '') &&
        drink.id &&
        drink.id
          ?.toString()
          .toLowerCase()
          .includes(id?.toString().toLowerCase() || '') &&
        drink.ingredients.some((base) =>
          base.toLowerCase().includes(ingredient.toLowerCase())
        )
      );
    });
  }

  private _loadData() {
    this.cocktailService.loadDataCocktails();
  }

  private _getDataCocktailsFromState() {
    this.cocktailStateService.getCocktailState().subscribe((res) => {
      this.originalDataSource.data = this._formatCocktailData(res.cocktails);
      this.isLoadingResults = res.isLoadingResults;
      this.dataSource.data = this._formatCocktailData(res.cocktails);
    });
  }

  private _formatCocktailData(drinks: Drink[]): FormattedCocktail[] {
    this.handlerStorageService.getDataFromStorage(CONSTANTS.FAVORITES);
    return drinks.map((drink) => {
      const ingredients: string[] = Object.entries(drink)
        .filter(
          ([key, value]) =>
            key.startsWith('strIngredient') &&
            typeof value === 'string' &&
            value.trim() !== ''
        )
        .map(([_, value]) => value as string);

      const measures: string[] = Object.entries(drink)
        .filter(
          ([key, value]) =>
            key.startsWith('strMeasure') &&
            typeof value === 'string' &&
            value.trim() !== ''
        )
        .map(([_, value]) => value as string);
      const currentFavorites = this.handlerStorageService.getDataFromStorage(
        CONSTANTS.FAVORITES
      );
      const isAlreadyInFavorite = currentFavorites.some(
        (favorite: FormattedCocktail) =>
          favorite.id.toString() === drink.idDrink
      );

      return {
        id: drink.idDrink ? parseInt(drink.idDrink, 10) : 0,
        name: drink.strDrink ?? '',
        ingredients,
        measures,
        instructions: drink.strInstructionsES,
        favorite: isAlreadyInFavorite,
        image: drink.strDrinkThumb ?? '',
        actions: [
          { label: CONSTANTS.VIEW_DETAIL, description: CONSTANTS.DETAIL },
          {
            label: CONSTANTS.ADD_OR_DELETE_FAVORITES,
            description: CONSTANTS.FAVORITES,
          },
        ],
      };
    });
  }
}
