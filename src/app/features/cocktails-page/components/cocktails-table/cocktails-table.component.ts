import {
  AfterViewInit,
  Component,
  inject,
  Input,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { FormattedCocktail } from '../../../../core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DialogDetailComponent } from '../dialog-detail/dialog-detail.component';
import { CONSTANTS, HandlerStorageService } from '../../../../shared';
import { NgStyle } from '@angular/common';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';

@Component({
  selector: 'app-cocktails-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    NgxSkeletonLoaderModule,
    NgStyle,
  ],
  templateUrl: './cocktails-table.component.html',
  styleUrl: './cocktails-table.component.scss',
})
export class CocktailsTableComponent implements AfterViewInit {
  readonly dialog = inject(MatDialog);
  breakpointObserver = inject(BreakpointObserver);
  private handlerStorageService = inject(HandlerStorageService);
  @Input() dataSource = new MatTableDataSource<FormattedCocktail>([]);
  displayedColumns: string[] = [
    'id',
    'name',
    'ingredients',
    'favorites',
    'image',
    'actions',
  ];
  resultsLength: number = 0;
  originalDataSource = new MatTableDataSource<FormattedCocktail>([]);
  subscription = new Subscription();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.handlerStorageService
      .getData$(CONSTANTS.FAVORITES)
      .subscribe((favorites) => {
        this.dataSource.data = this.dataSource.data.map((cocktail) => ({
          ...cocktail,
          favorite: favorites.some((fav) => fav.id === cocktail.id),
        }));
      });

    this.handlerStorageService.refreshData(CONSTANTS.FAVORITES);

    this.breakpointObserver.observe('(max-width: 700px)').subscribe(result => {
      if(result.matches){
        this.displayedColumns = [          
          'name',          
          'favorites',
          'actions',]
      } else {
        this.displayedColumns = [
          'id',
          'name',
          'ingredients',
          'favorites',
          'image',
          'actions',
        ];
      }
  });
  }

  sendAction(element: FormattedCocktail, description: string) {
    if (description === CONSTANTS.DETAIL) {
      this.openDialog(element);
    } else if (description === CONSTANTS.FAVORITES) {
      this.handlerFavorites(element);
    }
  }

  handlerFavorites(element: FormattedCocktail) {
    const currentFavorites = this.handlerStorageService.getDataFromStorage(
      CONSTANTS.FAVORITES
    );
    const isAlreadyInFavorite = currentFavorites.some(
      (favorite: FormattedCocktail) => favorite.id === element.id
    );

    if (!isAlreadyInFavorite) {
      const updatedFavorites = [...currentFavorites, element];
      this.handlerStorageService.setDataInStorage(
        CONSTANTS.FAVORITES,
        updatedFavorites
      );
    } else {
      // Elimina de favoritos si ya está añadido
      const updatedFavorites = currentFavorites.filter(
        (favorite: FormattedCocktail) => favorite.id !== element.id
      );
      this.handlerStorageService.setDataInStorage(
        CONSTANTS.FAVORITES,
        updatedFavorites
      );
    }
  }

  openDialog(element?: FormattedCocktail): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = element;
    this.dialog.open(DialogDetailComponent, dialogConfig);
  }
}
