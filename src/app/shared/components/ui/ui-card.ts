import { ChangeDetectionStrategy, Component, input } from '@angular/core';

// ═══════════════════════════════════════════════════════════════
// UI-CARD: bloque visual reutilizable del design system.
//
// ・Borde sutil + sombra de marca (indigo/fuchsia)
// ・Hover: se "flota" (-translate-y-1) con más sombra
// ・Uso: <ui-card variant="elevada"> ...contenido proyectado... </ui-card>
//
// ng-content = proyección de contenido: el padre mete lo que quiera.
// ═══════════════════════════════════════════════════════════════
@Component({
  selector: 'ui-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush, // render solo si cambia input
  template: `
    <div [class]="clases()">
      <!-- Slot opcional para encabezado -->
      @if (titulo(); as t) {
        <header class="mb-3 flex items-center justify-between">
          <h3 class="text-lg font-semibold text-text">{{ t }}</h3>
          @if (etiqueta(); as e) {
            <span class="rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-medium text-primary-soft">
              {{ e }}
            </span>
          }
        </header>
      }

      <!-- Todo lo que envuelva <ui-card>...</ui-card> cae aquí -->
      <ng-content />
    </div>
  `,
})
export class UiCard {
  // Título opcional (si llega, dibuja header)
  titulo = input<string | null>(null);
  // Etiqueta tipo badge a la derecha del título
  etiqueta = input<string | null>(null);
  // Variante de elevación
  variant = input<'base' | 'elevada' | 'plana'>('base');

  // Clases Tailwind calculadas según la variante
  clases(): string {
    const base =
      'rounded-xl border border-border bg-bg-card text-text shadow-(--shadow) ' +
      'transition-all duration-200 ' +
      'hover:-translate-y-1 hover:bg-bg-card-hover hover:shadow-(--shadow-hover)';

    switch (this.variant()) {
      case 'elevada':  return base + ' p-6 shadow-(--shadow-hover)';
      case 'plana':    return base + ' p-4 shadow-none';
      default:         return base + ' p-5';
    }
  }
}
