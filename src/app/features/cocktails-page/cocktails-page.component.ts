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
import { CONSTANTS } from '../../shared';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CocktailsTableComponent, CocktailFiltersComponent, NgxSkeletonLoaderModule],
  templateUrl: './cocktails-page.component.html',
  styleUrl: './cocktails-page.component.scss',
})
export class CocktailsPageComponent implements OnInit {
  private cocktailService = inject(CocktailService);
  private cocktailStateService = inject(CocktailStateService);
  private cocktailFiltersStateService = inject(CocktailFiltersStateService);
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

      return {
        id: drink.idDrink ? parseInt(drink.idDrink, 10) : 0,
        name: drink.strDrink ?? '',
        ingredients,
        measures,
        instructions: drink.strInstructionsES,
        image: drink.strDrinkThumb ?? '',
        actions: [
          { label: CONSTANTS.VIEW_DETAIL, action: CONSTANTS.DETAIL },
          { label: CONSTANTS.ADD_FAVORITES, action: CONSTANTS.FAVORITES },
        ],
      };
    });
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
}
