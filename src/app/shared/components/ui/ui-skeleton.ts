import { ChangeDetectionStrategy, Component, input } from '@angular/core';

// ═══════════════════════════════════════════════════════════════
// UI-SKELETON: placeholder animado mientras carga contenido.
// Mejor UX que un spinner vacío: sugiere la forma del contenido.
//
// Uso:
//   <ui-skeleton forma="tarjeta" />
//   <ui-skeleton forma="texto" [lineas]="3" />
// ═══════════════════════════════════════════════════════════════
@Component({
  selector: 'ui-skeleton',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @switch (forma()) {
      @case ('tarjeta') {
        <div class="rounded-xl border border-border bg-bg-card p-5">
          <div class="h-4 w-1/3 rounded bg-slate-700 animate-pulse"></div>
          <div class="mt-3 space-y-2">
            <div class="h-3 rounded bg-slate-700 animate-pulse"></div>
            <div class="h-3 w-5/6 rounded bg-slate-700 animate-pulse"></div>
            <div class="h-3 w-2/3 rounded bg-slate-700 animate-pulse"></div>
          </div>
        </div>
      }
      @case ('texto') {
        <div class="space-y-2">
          @for (i of lineasArray(); track i) {
            <div class="h-3 rounded bg-slate-700 animate-pulse"
                 [class]="i === lineas() - 1 ? 'w-2/3' : 'w-full'"></div>
          }
        </div>
      }
      @case ('circulo') {
        <div class="h-12 w-12 rounded-full bg-slate-700 animate-pulse"></div>
      }
    }
  `,
})
export class UiSkeleton {
  forma = input<'tarjeta' | 'texto' | 'circulo'>('texto');
  lineas = input(3);   // solo aplica a forma="texto"

  // Array auxiliar para el @for del template
  lineasArray(): number[] {
    return Array.from({ length: this.lineas() }, (_, i) => i);
  }
}
