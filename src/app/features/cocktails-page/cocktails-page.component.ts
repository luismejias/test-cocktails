import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { CocktailStateService } from '../../core';
import { CocktailsTableComponent } from './components/';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    CocktailsTableComponent
  ],
  templateUrl: './cocktails-page.component.html',
  styleUrl: './cocktails-page.component.scss',
})
export class CocktailsPageComponent implements OnInit {
  private cocktailStateService = inject(CocktailStateService);
  readonly searchQuery = new FormControl('', [Validators.required]);

  ngOnInit() {
    this.onSearch();
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
