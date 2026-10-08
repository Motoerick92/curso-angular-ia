import { Injectable, signal } from '@angular/core';

// ═══════════════════════════════════════════════════════════════
// SERVICIO PUENTE: permite que dos componentes se comuniquen
// SIN relación padre-hijo directa (ej: sidebar ↔ contenido).
// Mismo patrón que Auth y Tareas: singleton con signals.
// ═══════════════════════════════════════════════════════════════
@Injectable({ providedIn: 'root' })
export class Puente {
  private _mensaje = signal<string>('(nada todavía)');
  readonly mensaje = this._mensaje.asReadonly();

  enviar(texto: string): void {
    this._mensaje.set(texto.trim() || '(vacío)');
  }
}
