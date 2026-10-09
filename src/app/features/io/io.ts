import { Component, computed, signal } from '@angular/core';
import { TarjetaTarea, type Tarea } from './tarjeta-tarea/tarjeta-tarea';
import { UiBadge } from '../../shared/components/ui/ui-badge';

// ═══════════════════════════════════════════════════════════════
// COMPONENTE PADRE: dueño del estado. Envía datos al hijo con
// input() y escucha sus eventos con output().
// ═══════════════════════════════════════════════════════════════
@Component({
  selector: 'app-io',
  // Importar el hijo para usarlo como etiqueta en el template
  imports: [TarjetaTarea, UiBadge],
  templateUrl: './io.html',
  styleUrl: './io.css',
})
export class Io {
  // Estado centralizado en el PADRE: lista de tareas
  tareas = signal<Tarea[]>([
    { id: 1, titulo: 'Aprender signals', prioridad: 'alta', hecha: true },
    { id: 2, titulo: 'Dominar input() y output()', prioridad: 'alta', hecha: false },
    { id: 3, titulo: 'Practicar model() two-way', prioridad: 'media', hecha: false },
  ]);

  // Derived count: cuántas tareas completadas
  completadas = computed(() => this.tareas().filter((t) => t.hecha).length);

  // Estado de selección por tarea — padre escucha cambios del model()
  idsSeleccionados = signal<number[]>([]);

  // El hijo emite → el padre decide QUÉ hacer (única fuente de verdad)
  alCambiarHecha(tareaId: number, hecha: boolean): void {
    this.tareas.update((lista) =>
      lista.map((t) => (t.id === tareaId ? { ...t, hecha } : t)),
    );
  }

  alEliminar(id: number): void {
    this.tareas.update((lista) => lista.filter((t) => t.id !== id));
    // Limpieza: también quitar del set de seleccionados
    this.idsSeleccionados.update((ids) => ids.filter((i) => i !== id));
  }

  // El padre registra qué tarea está seleccionada (separado del hijo)
  alAlternarSeleccion(id: number, seleccionada: boolean): void {
    this.idsSeleccionados.update((ids) =>
      seleccionada ? [...ids, id] : ids.filter((i) => i !== id),
    );
  }
}
