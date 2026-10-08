import { Routes } from '@angular/router';
import { Inicio } from './features/inicio/inicio';
import { Binding } from './features/binding/binding';
import { ControlFlow } from './features/control-flow/control-flow';
import { PipesDirectivas } from './features/pipes-directivas/pipes-directivas';
import { Signals } from './features/signals/signals';
import { Io } from './features/io/io';
import { Servicios } from './features/servicios/servicios';
import { authGuard } from './core/guards/auth-guard';
import { HttpDemo } from './features/http-demo/http-demo';
import { FormTemplate } from './features/form-template/form-template';
import { FormReactivo } from './features/form-reactivo/form-reactivo';
import { RxjsDemo } from './features/rxjs-demo/rxjs-demo';
import { Comunicacion } from './features/comunicacion/comunicacion';
import { AsyncPipeDemo } from './features/async-pipe/async-pipe';
import { StoreDemo } from './features/store-demo/store-demo';
import { Optimizacion } from './features/optimizacion/optimizacion';
import { DirectivasCustom } from './features/directivas-custom/directivas-custom';

export const routes: Routes = [
  { path: '', component: Inicio },
  { path: 'binding', component: Binding },
  { path: 'control-flow', component: ControlFlow },
  { path: 'pipes-directivas', component: PipesDirectivas },
  { path: 'signals', component: Signals },
  { path: 'io', component: Io },
  { path: 'servicios', component: Servicios },
  { path: 'http', component: HttpDemo },           // Módulo 10: HTTP
  { path: 'form-template', component: FormTemplate }, // Módulo 11: forms template-driven
  { path: 'form-reactivo', component: FormReactivo },  // Módulo 12: reactive forms
  { path: 'rxjs', component: RxjsDemo },               // Módulo 13: RxJS
  { path: 'comunicacion', component: Comunicacion },   // Módulo 14: comunicación
  { path: 'async-pipe', component: AsyncPipeDemo },    // Módulo 15: pipe async
  { path: 'store', component: StoreDemo },             // Módulo 16: state management
  { path: 'optimizacion', component: Optimizacion },   // Módulo 17: OnPush
  { path: 'directivas-custom', component: DirectivasCustom }, // Módulo 18: estructurales

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
