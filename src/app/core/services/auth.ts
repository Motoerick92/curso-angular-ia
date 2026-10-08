import { computed, Injectable, signal } from '@angular/core';

// Servicio de autenticación SIMULADO (sin backend todavía).
// Demuestra el patrón; en M21 las llamadas serán HTTP reales.
@Injectable({ providedIn: 'root' })  // singleton: misma sesión en toda la app
export class Auth {
  // Estado privado: nadie puede "loguearse" sin pasar por login()
  private _usuario = signal<string | null>(null);

  // Lectura pública reactiva
  readonly usuario = this._usuario.asReadonly();
  readonly logueado = computed(() => this._usuario() !== null);

  logIn(nombre: string): void {
    this._usuario.set(nombre.trim() || 'invitado');
  }

  logOut(): void {
    this._usuario.set(null);
  }
}
