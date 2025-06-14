import { Routes } from '@angular/router';
import { EmpleadosPageComponent } from '../empleados/empleados.page/empleados.page.component';
import { HomePageComponent } from './Home-page.component';
import { WelcomePageInsideComponent } from '../welcome-page-inside/welcome-page-inside.component';
import { ConfiguracionesPageComponent } from '../Configuraciones-page/Configuraciones-page.component';
import { ConveniosPageComponent } from '../Convenios-page/Convenios-page.component';
import { EmpresasPageComponent } from '../Empresas-page/Empresas-page.component';
import { FichajesPageComponent } from '../Fichajes-page/Fichajes-page.component';
import { GastosPageComponent } from '../Gastos-page/Gastos-page.component';
import { GTalentoPageComponent } from '../GTalento-page/GTalento-page.component';
import { HorariosPageComponent } from '../Horarios-page/Horarios-page.component';
import { OfertasPageComponent } from '../Ofertas-page/Ofertas-page.component';
import { SVacacionesPageComponent } from '../SVacaciones-page/SVacaciones-page.component';
import { EquiposPageComponent } from '../Equipos-page/Equipos-page.component';
import { InformesPageComponent } from '../Informes-page/Informes-page.component';
import { VacacionesHorariosPageComponent } from '../Vacaciones-Horarios-page/Vacaciones-Horarios-page.component';
import { CalendariosPageComponent } from '../Calendarios-page/Calendarios-page.component';

export const homeRoutes: Routes = [
  {
    path: '',
    component: WelcomePageInsideComponent,
  },
  {
    path: 'empleados',
    component: EmpleadosPageComponent,
  },
  {
    path: 'SVacas',
    component: SVacacionesPageComponent,
  },
  {
    path: 'VHorarios',
    component: VacacionesHorariosPageComponent,
  },
  {
    path: 'GTalento',
    component: GTalentoPageComponent,
  },
  {
    path: 'ofertas',
    component: OfertasPageComponent,
  },
  {
    path: 'config',
    component: ConfiguracionesPageComponent,
  },
  {
    path: 'empresas',
    component: EmpresasPageComponent,
  },
  {
    path: 'convenios',
    component: ConveniosPageComponent,
  },
  {
    path: 'horarios',
    component: HorariosPageComponent,
  },
  {
    path: 'fichajes',
    component: FichajesPageComponent,
  },
  {
    path: 'gastos',
    component: GastosPageComponent,
  },
  {
    path: 'equipos',
    component: EquiposPageComponent,
  },
  {
    path: 'informes',
    component: InformesPageComponent,
  },
  {
    path: 'calendarios',
    component: CalendariosPageComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
]
