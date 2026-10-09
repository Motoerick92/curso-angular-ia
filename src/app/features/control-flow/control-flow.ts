import { Component, signal } from '@angular/core';
import { UiCard } from '../../shared/components/ui/ui-card';
import { UiBadge } from '../../shared/components/ui/ui-badge';

// Modelo simple de tarea para los ejemplos de @for
interface Tarea {
  id: number;
  titulo: string;
  prioridad: 'alta' | 'media' | 'baja';
  hecha: boolean;
}

@Component({
  selector: 'app-control-flow',
  imports: [UiCard, UiBadge],
  templateUrl: './control-flow.html',
  styleUrl: './control-flow.css',
})
export class ControlFlow {
  // Tabs disponibles para el @switch
  readonly pestanas = ['lista', 'stats', 'config'] as const;
  // ── Estado para demo de @if ──
  mostrarDetalle = signal(false);

  // ── Estado para demo de @for: lista de tareas ──
  tareas = signal<Tarea[]>([
    { id: 1, titulo: 'Instalar Angular CLI', prioridad: 'alta', hecha: true },
    { id: 2, titulo: 'Aprender interpolación', prioridad: 'media', hecha: true },
    { id: 3, titulo: 'Dominar data binding', prioridad: 'media', hecha: true },
    { id: 4, titulo: 'Control flow moderno', prioridad: 'alta', hecha: false },
    { id: 5, titulo: 'Signals a fondo', prioridad: 'baja', hecha: false },
  ]);

  // ── Estado para demo de @switch: pestaña activa ──
  pestana = signal<'lista' | 'stats' | 'config'>('lista');

  alternarDetalle(): void {
    this.mostrarDetalle.update((v) => !v);
  }

  // Cambia pestaña para el @switch
  irA(pestaña: 'lista' | 'stats' | 'config'): void {
    this.pestana.set(pestaña);
  }

  // Marca/desmarca una tarea: immutabilidad con map()
  alternarTarea(id: number): void {
    this.tareas.update((lista) =>
      lista.map((t) => (t.id === id ? { ...t, hecha: !t.hecha } : t)),
    );
  }

  // Agrega tarea nueva (para ver @for reaccionar)
  agregarTarea(): void {
    const nuevoId = Math.max(...this.tareas().map((t) => t.id)) + 1;
    this.tareas.update((lista) => [
      ...lista,
      { id: nuevoId, titulo: `Tarea nueva ${nuevoId}`, prioridad: 'baja', hecha: false },
    ]);
  }

  // Vacía la lista → dispara el @empty del @for
  vaciarLista(): void {
    this.tareas.set([]);
  }
}
