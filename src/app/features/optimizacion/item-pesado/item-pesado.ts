import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';

// ═══════════════════════════════════════════════════════════════
// COMPONENTE OnPush: Angular solo revisa su template cuando:
//  1. Cambia su input (por referencia o valor de signal)
//  2. Se dispara un evento DOM DENTRO de él
//  3. Un signal que leyó cambió
// Ignora el resto de la app → render granular y rápido.
// ═══════════════════════════════════════════════════════════════
@Component({
  selector: 'app-item-pesado',
  changeDetection: ChangeDetectionStrategy.OnPush,   // ← la clave
  imports: [],
  templateUrl: './item-pesado.html',
  styleUrl: './item-pesado.css',
})
export class ItemPesado {
  // Input del padre. Con OnPush, si la referencia no cambia,
  // este template NO se reevalúa aunque la app esté "viva".
  dato = input.required<{ id: number; titulo: string }>();

  // Contador PLANO (no signal): se incrementa en ngAfterViewChecked.
  // ・ngAfterViewChecked corre DESPUÉS de cada chequeo del template.
  // ・Prohibido escribir signals durante la renderización → NG0600.
  rendersInternos = 0;

  // Hook del ciclo de vida: cada vez que Angular evaluó este template
  // (porque cambió su input o por un evento interno).
  ngAfterViewChecked(): void {
    this.rendersInternos++;
  }
}
