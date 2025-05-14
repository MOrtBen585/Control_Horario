import { Routes } from '@angular/router';
import { LoginPageComponent } from '../pages/login.page/login.page.component';


import { authGuard } from './guards/auth.guard';
import { WelcomePageComponent } from '../pages/Welcome.page/Welcome.page.component';
import { HomePageComponent } from '../pages/Home-page/Home-page.component';
import { FichajeEmpleadoComponent } from '../pages/fichaje-empleado/fichaje-empleado.component';

export const routes: Routes = [
  { path: '', component: WelcomePageComponent },
  { path: 'login', component: LoginPageComponent },
  {
    path: 'ficha',
    component: FichajeEmpleadoComponent,
  },
  {
    path: 'home',
    component: HomePageComponent,
    loadChildren: () => import('../pages/Home-page/home.routes').then(m => m.homeRoutes),
    canMatch: [authGuard],
  },
  { path: '**', redirectTo: '' },
];
