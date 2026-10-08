import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

// ═══════════════════════════════════════════════════════════════
// COMPONENTE OnPush: Angular solo revisa su template cuando:
//  1. Cambia una de sus inputs (por referencia o valor de signal)
//  2. Se dispara un evento DENTRO de él
//  3. Un signal que leyó cambió
// Ignora el resto de la app → render granular y rápido.
// ═══════════════════════════════════════════════════════════════
@Component({
  selector: 'app-item-pesado',
  changeDetection: ChangeDetectionStrategy.OnPush,  // ← la clave
  imports: [],
  templateUrl: './item-pesado.html',
})
export class ItemPesado {
  // Input: si el padre pasa el MISMO objeto (misma referencia), no re-renderiza.
  // Si muta y crea uno nuevo → re-render solo de este ítem.
  dato = input.required<{ id: number; titulo: string }>();

  // Contador interno: cuántas veces Angular evaluó este template
  // (lo incrementa un método llamado desde el template — técnica de debug)
  rendersInternos = signal(0);

  // Llamado en cada evaluación del template — deja evidencia del render
  registrarRender(): string {
    this.rendersInternos.update((n) => n + 1);
    return `renders: ${this.rendersInternos()}`;
  }
}
