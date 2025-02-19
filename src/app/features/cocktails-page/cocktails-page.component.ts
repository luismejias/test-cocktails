import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { CocktailService, Cocktails, Drink } from '../../core';
import { CocktailsTableComponent } from './components/';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    CocktailsTableComponent,

  ],
  templateUrl: './cocktails-page.component.html',
  styleUrl: './cocktails-page.component.scss',
})
export class CocktailsPageComponent implements OnInit {
  private cocktailService = inject(CocktailService);
  dataSource = new MatTableDataSource<Drink>([]);
  readonly searchQuery = new FormControl('', [Validators.required]);

  ngOnInit() {
    this.onSearch();
    this.cocktailService.getByName('').subscribe((cocktails: Cocktails) => {
      if (cocktails.drinks.length > 0) {
        this.dataSource.data = cocktails.drinks;
      }
    });
  }

  onSearch(): void {
    this.searchQuery.valueChanges.subscribe((value) => {
      console.log({ value });
    });
  }

  viewDetails(id: string): void {
    console.log('Ver detalles de cóctel con ID:', id);
    // Implementar navegación a detalle del cóctel
  }
}
