import { Routes } from '@angular/router';
import { Inicio } from './features/inicio/inicio';
import { Binding } from './features/binding/binding';
import { ControlFlow } from './features/control-flow/control-flow';
import { PipesDirectivas } from './features/pipes-directivas/pipes-directivas';

// Mapa de rutas de la aplicación
export const routes: Routes = [
  { path: '', component: Inicio },                       // /            → Módulo 2
  { path: 'binding', component: Binding },               // /binding     → Módulo 3
  { path: 'control-flow', component: ControlFlow },      // /control-flow → Módulo 4
  { path: 'pipes-directivas', component: PipesDirectivas }, // /pipes-directivas → Módulo 5
];
