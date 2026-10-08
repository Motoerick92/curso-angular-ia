import { Routes } from '@angular/router';
import { Inicio } from './features/inicio/inicio';
import { Binding } from './features/binding/binding';
import { ControlFlow } from './features/control-flow/control-flow';
import { PipesDirectivas } from './features/pipes-directivas/pipes-directivas';
import { Signals } from './features/signals/signals';
import { Io } from './features/io/io';
import { Servicios } from './features/servicios/servicios';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: '', component: Inicio },
  { path: 'binding', component: Binding },
  { path: 'control-flow', component: ControlFlow },
  { path: 'pipes-directivas', component: PipesDirectivas },
  { path: 'signals', component: Signals },
  { path: 'io', component: Io },
  { path: 'servicios', component: Servicios },

  // RUTA CON PARÁMETRO: :id llega como input (via withComponentInputBinding)
  // LAZY LOADING: loadComponent descarga el chunk SOLO al visitar la ruta
  {
    path: 'tarea/:id',
    loadComponent: () =>
      import('./features/tarea-detalle/tarea-detalle').then((m) => m.TareaDetalle),
  },

  // RUTA PROTEGIDA: authGuard decide si deja pasar
  {
    path: 'admin',
    loadComponent: () => import('./features/admin/admin').then((m) => m.Admin),
    canActivate: [authGuard],
  },

  // Wildcard: cualquier URL desconocida → home
  { path: '**', redirectTo: '' },
];
