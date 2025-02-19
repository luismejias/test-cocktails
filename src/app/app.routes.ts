
import { Routes } from '@angular/router';
export const appRoutes: Routes = [
  {
    path: 'cocktails',
    loadComponent: () => import('./features/cocktails-page/cocktails-page.component').then((c)=> c.CocktailsPageComponent),
    title: 'Cocktails page',
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'cocktails',
  },
];
