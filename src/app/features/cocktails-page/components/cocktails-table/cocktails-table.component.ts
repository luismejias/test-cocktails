import {
  AfterViewInit,
  Component,
  inject,
  Input,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogConfig,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { FormattedCocktail } from '../../../../core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DialogDetailComponent } from '../dialog-detail/dialog-detail.component';
import { CONSTANTS, HandlerStorageService } from '../../../../shared';
import { Action } from 'rxjs/internal/scheduler/Action';

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
  ],
  templateUrl: './cocktails-table.component.html',
  styleUrl: './cocktails-table.component.scss',
})
export class CocktailsTableComponent implements AfterViewInit {
  readonly dialog = inject(MatDialog);
  private handlerStorageService = inject(HandlerStorageService);

  @Input() dataSource = new MatTableDataSource<FormattedCocktail>([]);
  displayedColumns: string[] = [
    'id',
    'name',
    'ingredients',
    'image',
    'actions',
  ];
  resultsLength: number = 0;
  originalDataSource = new MatTableDataSource<FormattedCocktail>([]);
  subscription = new Subscription();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  sendAction(element: FormattedCocktail, action: string) {
    if (action === CONSTANTS.DETAIL) {
      this.openDialog(element);
    } else if (action === CONSTANTS.FAVORITES) {
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
        updatedFavorites,
        CONSTANTS.FAVORITES
      );
    }

    console.log(
      'DATA FROM STORAGE => ',
      this.handlerStorageService.getDataFromStorage(CONSTANTS.FAVORITES)
    );
  }

  openDialog(element?: FormattedCocktail): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = element;
    this.dialog.open(DialogDetailComponent, dialogConfig);
  }
}
