import { Component, computed, signal } from '@angular/core';
import { ItemPesado } from './item-pesado/item-pesado';

// ═══════════════════════════════════════════════════════════════
// DEMO de optimización:
// ・@if @for con track — reconciliación eficiente de listas
// ・OnPush en hijos — template NO se reevalúa sin cambio de input
// ・computed() — derivar en vez de recalcular en cada render
// ═══════════════════════════════════════════════════════════════
@Component({
  selector: 'app-optimizacion',
  imports: [ItemPesado],
  templateUrl: './optimizacion.html',
  styleUrl: './optimizacion.css',
})
export class Optimizacion {
  // Estado: lista grande para render
  items = signal(
    Array.from({ length: 200 }, (_, i) => ({
      id: i + 1,
      titulo: `Elemento ${i + 1}`,
    })),
  );

  // Tick global: se mueve cada 500ms — empuja change detection
  // sin cambiar las referencias de los items
  tick = signal(0);

  // computed sobre la lista: derivado estable
  total = computed(() => this.items().length);

  constructor() {
    // Simula "actividad" que re-dispara change detection en la app
    setInterval(() => this.tick.update((n) => n + 1), 500);
  }

  // Mutación INMUTABLE: nuevo array + nuevo objeto del ítem
  // → solo ese item re-renderiza (track lo identifica, OnPush lo limita)
  renombrarAleatorio(): void {
    const lista = this.items();
    const idx = Math.floor(Math.random() * lista.length);
    const objetivo = lista[idx];
    this.items.update((arr) =>
      arr.map((it) =>
        it.id === objetivo.id ? { ...it, titulo: `Elemento ${it.id} ✏️` } : it,
      ),
    );
  }
}
