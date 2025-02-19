import { Component, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cocktails-table',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatIconModule, DatePipe],
  templateUrl: './cocktails-table.component.html',
  styleUrl: './cocktails-table.component.scss',
})
export class CocktailsTableComponent {
  @Input() dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = [
    'id',
    'name',
    'biography',
    'image',
    'appearance',
    'house',
    'edit',
    'delete',
  ];
  isLoadingResults: boolean = true;
  isRateLimitReached: boolean = false;
  resultsLength: number = 0;
  originalDataSource = new MatTableDataSource<any>(['id',
    'name',
    'biography',
    'image',
    'appearance',
    'house',
    'edit',
    'delete',]);
  subscription = new Subscription();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
