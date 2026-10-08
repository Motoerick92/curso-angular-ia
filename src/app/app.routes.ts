import { Routes } from '@angular/router';
import { Inicio } from './features/inicio/inicio';
import { Binding } from './features/binding/binding';

// Mapa de rutas de la aplicación
export const routes: Routes = [
  { path: '', component: Inicio },        // /        → Módulo 2
  { path: 'binding', component: Binding }, // /binding → Módulo 3
];
