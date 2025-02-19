import { Component, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe, JsonPipe } from '@angular/common';
import { Drink } from '../../../../core';

@Component({
  selector: 'app-cocktails-table',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatIconModule],
  templateUrl: './cocktails-table.component.html',
  styleUrl: './cocktails-table.component.scss',
})
export class CocktailsTableComponent {
  @Input() dataSource = new MatTableDataSource<Drink>();
  displayedColumns: string[] = ['id', 'name', 'ingredients', 'actions'];
  isLoadingResults: boolean = true;
  isRateLimitReached: boolean = false;
  resultsLength: number = 0;
  originalDataSource = new MatTableDataSource<Drink>();
  subscription = new Subscription();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {    
    this.dataSource.paginator = this.paginator;
  }
}
