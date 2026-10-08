import { httpResource } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

// Modelo que devuelve la API pública de práctica JSONPlaceholder
export interface TareaApi {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// ═══════════════════════════════════════════════════════════════
// SERVICIO HTTP con httpResource: la forma reactiva de Angular 22
// para hacer requests. Devuelve signals, no Observables manuales.
// ═══════════════════════════════════════════════════════════════
@Injectable({ providedIn: 'root' })
export class TareasApi {
  // Cuántas tareas pedir a la API — si cambia, se relanza la request
  readonly limite = signal(5);

  // httpResource: toma una función que devuelve la URL (o undefined para no pedir).
  // Cuando la función lee signals, la request se RELANZA si esos signals cambian.
  // Devuelve: .value() .isLoading() .error() .status()
  readonly tareasResource = httpResource<TareaApi[]>(() => ({
    url: `https://jsonplaceholder.typicode.com/todos`,
    params: { _limit: this.limite().toString() },
  }));

  // Atajo para recargar manualmente (ej: después de crear/editar)
  recargar(): void {
    this.tareasResource.reload();
  }

  pedirMas(): void {
    this.limite.update((n) => n + 5);   // ← cambiar signal relanza la request
  }
}
