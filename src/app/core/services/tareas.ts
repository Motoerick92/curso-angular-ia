import { computed, Injectable, signal } from '@angular/core';
import type { Tarea } from '../../features/io/tarjeta-tarea/tarjeta-tarea';

// ═══════════════════════════════════════════════════════════════
// SERVICIO = clase con lógica/estado COMPARTIDO entre componentes.
// providedIn: 'root' → Angular crea UNA SOLA instancia (singleton)
// y la comparte en toda la app.
// ═══════════════════════════════════════════════════════════════
@Injectable({
  providedIn: 'root',
})
export class Tareas {
  // Estado PRIVADO: solo el servicio puede escribirlo
  // (guion bajo = convención de privado)
  private _tareas = signal<Tarea[]>([
    { id: 1, titulo: 'Aprender inyección de dependencias', prioridad: 'alta', hecha: false },
    { id: 2, titulo: 'Compartir estado con servicios', prioridad: 'media', hecha: false },
  ]);

  // Exposición PÚBLICA de solo lectura: .asReadonly()
  // Los componentes LEEN pero NO pueden modificar directamente.
  // Solo el servicio decide cuándo cambiar el estado.
  readonly tareas = this._tareas.asReadonly();

  // Derivados públicos: accesibles desde cualquier componente
  readonly total = computed(() => this._tareas().length);
  readonly completadas = computed(() => this._tareas().filter((t) => t.hecha).length);
  readonly pendientes = computed(() => this.total() - this.completadas());
  readonly hayTareas = computed(() => this.total() > 0);

  // ── Métodos públicos = API del servicio ──
  // Los componentes llaman ESTOS métodos para cambiar estado.
  // El componente nunca hace update() directo.

  agregar(titulo: string, prioridad: Tarea['prioridad'] = 'media'): void {
    const maxId = this._tareas().length
      ? Math.max(...this._tareas().map((t) => t.id))
      : 0;
    const nueva: Tarea = {
      id: maxId + 1,
      titulo: titulo.trim(),
      prioridad,
      hecha: false,
    };
    this._tareas.update((lista) => [...lista, nueva]);
  }

  alternar(id: number): void {
    this._tareas.update((lista) =>
      lista.map((t) => (t.id === id ? { ...t, hecha: !t.hecha } : t)),
    );
  }

  eliminar(id: number): void {
    this._tareas.update((lista) => lista.filter((t) => t.id !== id));
  }

  limpiar(): void {
    this._tareas.set([]);
  }

  restaurarDemo(): void {
    this._tareas.set([
      { id: 1, titulo: 'Aprender inyección de dependencias', prioridad: 'alta', hecha: false },
      { id: 2, titulo: 'Compartir estado con servicios', prioridad: 'media', hecha: false },
    ]);
  }
}
