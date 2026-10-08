import { Routes } from '@angular/router';
import { Inicio } from './features/inicio/inicio';
import { Binding } from './features/binding/binding';
import { ControlFlow } from './features/control-flow/control-flow';
import { PipesDirectivas } from './features/pipes-directivas/pipes-directivas';
import { Signals } from './features/signals/signals';

export const routes: Routes = [
  { path: '', component: Inicio },
  { path: 'binding', component: Binding },
  { path: 'control-flow', component: ControlFlow },
  { path: 'pipes-directivas', component: PipesDirectivas },
  { path: 'signals', component: Signals },   // Módulo 6
];
