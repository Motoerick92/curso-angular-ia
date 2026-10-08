import { Routes } from '@angular/router';
import { Inicio } from './features/inicio/inicio';

// Mapa de rutas: { path, component }
// path '' = raíz (/) → Angular inyecta <app-inicio /> dentro de <router-outlet />
export const routes: Routes = [
  { path: '', component: Inicio },
];
