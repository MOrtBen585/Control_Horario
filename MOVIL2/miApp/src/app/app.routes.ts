import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage) },

  { path: 'ficha', loadComponent: () => import('./pages/fichaje/fichaje.page').then(m => m.FichajePage) }
];

export default routes;
