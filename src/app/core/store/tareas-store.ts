import { computed, Injectable, signal } from '@angular/core';
import type { Tarea } from '../../features/io/tarjeta-tarea/tarjeta-tarea';

// ═══════════════════════════════════════════════════════════════
// STORE con signals: M8 (servicio simple) evolucionado a
// patrón "store" completo.
//
// Diferencias clave vs servicio plano:
//  - Estado DESNORMALIZADO en un único objeto (record + array de ids)
//  - Métodos = "acciones" con nombres de intención de negocio
//  - Selectores = computeds tipados listos para consumir
//  - Preparado para escalar: audit log, persistence, filtros, undo
// ═══════════════════════════════════════════════════════════════

// Estado interno: desnormalizado
//  entidades = { [id]: Tarea }  → acceso O(1)
//  orden     = ids[]            → para preservar orden de inserción
interface EstadoTareas {
  entidades: Record<number, Tarea>;
  orden: number[];
  filtro: 'todas' | 'pendientes' | 'hechas';
}

const estadoInicial: EstadoTareas = {
  entidades: {
    1: { id: 1, titulo: 'Migrar servicio a store', prioridad: 'alta', hecha: true },
    2: { id: 2, titulo: 'Aprender selectores computed', prioridad: 'alta', hecha: false },
    3: { id: 3, titulo: 'Filtros reactivos', prioridad: 'media', hecha: false },
  },
  orden: [1, 2, 3],
  filtro: 'todas',
};

@Injectable({ providedIn: 'root' })
export class TareasStore {
  // ── Estado privado: único objeto signal ──
  private readonly _estado = signal<EstadoTareas>(estadoInicial);

  // ── SELECTORES públicos (computed readonly) ──

  // Lista plana ordenada (array derivado de entidades + orden)
  readonly lista = computed(() =>
    this._estado().orden.map((id) => this._estado().entidades[id]),
  );

  // Listas filtradas según el filtro activo
  readonly visibles = computed(() => {
    const tareas = this.lista();
    const filtro = this._estado().filtro;
    if (filtro === 'pendientes') return tareas.filter((t) => !t.hecha);
    if (filtro === 'hechas') return tareas.filter((t) => t.hecha);
    return tareas;
  });

  // Métricas
  readonly total = computed(() => this._estado().orden.length);
  readonly completadas = computed(() => this.lista().filter((t) => t.hecha).length);
  readonly filtroActual = computed(() => this._estado().filtro);

  // Selector de debug: estado crudo en JSON (para el <details> del template)
  readonly debugEstado = computed(() => JSON.stringify(this._estado(), null, 2));

  // ── ACCIONES: únicos puntos de mutación ──

  agregar(titulo: string, prioridad: Tarea['prioridad'] = 'media'): void {
    const texto = titulo.trim();
    if (!texto) return;

    const nuevoId = Math.max(0, ...this._estado().orden) + 1;
    const nueva: Tarea = { id: nuevoId, titulo: texto, prioridad, hecha: false };

    this._estado.update((e) => ({
      ...e,
      entidades: { ...e.entidades, [nuevoId]: nueva },
      orden: [...e.orden, nuevoId],
    }));
  }

  alternar(id: number): void {
    this._estado.update((e) => {
      const tarea = e.entidades[id];
      if (!tarea) return e;
      return {
        ...e,
        entidades: { ...e.entidades, [id]: { ...tarea, hecha: !tarea.hecha } },
      };
    });
  }

  eliminar(id: number): void {
    this._estado.update((e) => {
      const { [id]: _, ...resto } = e.entidades;   // omite la clave `id`
      return { ...e, entidades: resto, orden: e.orden.filter((i) => i !== id) };
    });
  }

  establecerFiltro(filtro: EstadoTareas['filtro']): void {
    this._estado.update((e) => ({ ...e, filtro }));
  }
}
