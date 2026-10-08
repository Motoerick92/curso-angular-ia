import { Component, inject } from '@angular/core';
import { Auth } from '../../core/services/auth';

// Página PROTEGIDA: solo llegas aquí si authGuard te deja pasar (logueado)
@Component({
  selector: 'app-admin',
  imports: [],
  templateUrl: './admin.html',
})
// NOTA: este componente se carga con LAZY LOADING (loadComponent en routes).
// Su código NO va en el bundle inicial — se descarga al visitar /admin.
export class Admin {
  protected readonly auth = inject(Auth);
}
