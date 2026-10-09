import { Component, computed, effect, signal } from '@angular/core';
import { UiCard } from '../../shared/components/ui/ui-card';
import { UiBadge } from '../../shared/components/ui/ui-badge';

// ═══════════════════════════════════════════════════════════
// SIGNALS: sistema de reactividad reactiva granular de Angular.
// Envuelven un valor y avisan a Angular DÓNDE cambió exactamente.
// ═══════════════════════════════════════════════════════════
@Component({
  selector: 'app-signals',
  imports: [UiCard, UiBadge],
  templateUrl: './signals.html',
  styleUrl: './signals.css',
})
export class Signals {
  // ── 1) signal(): estado mutable reactivo ──
  // Es una FUNCIÓN: se LEE llamándola → contador()
  // Se ESCRIBE con .set() o .update()
  contador = signal(0);

  // ── 2) computed(): valor DERIVADO, solo lectura ──
  // Se recalcula SOLO cuando cambia alguna dependencia que leyó.
  // Angular rastrea dependencias automáticamente.
  doble = computed(() => this.contador() * 2);
  esPositivo = computed(() => this.contador() > 0);
  esPar = computed(() => this.contador() % 2 === 0);

  // computed que depende de otro computed — cadena de derivación
  categoria = computed(() => {
    const n = this.contador();
    if (n === 0) return 'cero';
    if (n > 0) return this.esPar() ? 'par positivo' : 'impar positivo';
    return 'negativo';
  });

  // Lista con signals: inmutable updates
  historial = signal<number[]>([]);

  constructor() {
    // ── 3) effect(): efecto secundario reactivo ──
    // Se ejecuta al menos una vez y luego cada vez que cambia
    // cualquier signal leído dentro. Ideal para logs, sync, storage.
    effect(() => {
      // Solo lectura reactiva: cambiar contador dispara esto
      console.log(`[effect] contador cambió a: ${this.contador()}`);
    });
  }

  // set(): reemplaza el valor completo
  incrementar(): void {
    this.contador.update((n) => n + 1);       // update: lee actual, devuelve nuevo
    this.historial.update((h) => [...h, this.contador()]); // spread = nueva referencia
  }

  decrementar(): void {
    this.contador.update((n) => n - 1);
    this.historial.update((h) => [...h, this.contador()]);
  }

  reset(): void {
    this.contador.set(0);                       // set: valor directo
    this.historial.set([]);
  }
}
