import { Routes } from '@angular/router';
import { LoginPageComponent } from '../pages/login.page/login.page.component';


import { WelcomePageComponent } from '../pages/Welcome.page/Welcome.page.component';
import { HomePageComponent } from '../pages/Home-page/Home-page.component';
import { adminGuard } from './guards/admin.guard';
import { UnauthorizedComponent } from '../pages/unauthorized/unauthorized.component';
import { NotAuthenticatedGuard } from './guards/not-authenticated.guard';
import { FichajeCardComponent } from '../pages/empleados/fichaje-card/fichaje-card.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: WelcomePageComponent },
  {
    path: 'login', component: LoginPageComponent, canMatch: [NotAuthenticatedGuard]
  },
  {
    path: 'ficha',
    component: FichajeCardComponent,
    canMatch: [authGuard],
  },
  {
    path: 'home',
    component: HomePageComponent,
    loadChildren: () => import('../pages/Home-page/home.routes').then(m => m.homeRoutes),
    canMatch: [adminGuard],
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
  },
  { path: '**', redirectTo: '' },
];
