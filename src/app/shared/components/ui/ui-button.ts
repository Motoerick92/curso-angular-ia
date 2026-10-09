import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

// ═══════════════════════════════════════════════════════════════
// UI-BUTTON: botón del design system con 3 variantes.
//
// Uso:
//   <ui-button variant="primary" (click)="accion()">Guardar</ui-button>
//   <ui-button variant="secondary">Cancelar</ui-button>
//   <ui-button variant="ghost">Ver más</ui-button>
// ═══════════════════════════════════════════════════════════════
@Component({
  selector: 'ui-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button [type]="type()"
            [disabled]="disabled() || loading()"
            [class]="clases()"
            (click)="click.emit()">
      <!-- Spinner simple cuando está cargando -->
      @if (loading()) {
        <span class="animate-spin inline-block">⏳</span>
      }
      <!-- ng-content = el texto/hijos que envuelva el botón -->
      <ng-content />
    </button>
  `,
})
export class UiButton {
  // Variante visual: gradiente marca, sólido suave o transparente
  variant = input<'primary' | 'secondary' | 'ghost'>('primary');
  type = input<'button' | 'submit'>('button');
  disabled = input(false);
  loading = input(false);       // muestra ⏳ y deshabilita

  // Evento limpio: el padre escucha (click) como siempre
  click = output<void>();

  clases(): string {
    // Clases comunes a todas las variantes
    const base =
      'inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 ' +
      'text-sm font-medium transition-all duration-200 cursor-pointer ' +
      'focus-visible:outline-2 focus-visible:outline-accent ' +
      'disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 ';

    switch (this.variant()) {
      case 'primary':
        // Gradiente de marca: indigo → fuchsia
        return base +
          'bg-(image:--gradient-brand) text-white shadow-(--shadow) ' +
          'hover:shadow-(--shadow-hover) hover:-translate-y-0.5';
      case 'secondary':
        // Superficie slate con borde, hover hacia indigo
        return base +
          'bg-bg-panel text-text border border-border ' +
          'hover:border-primary hover:text-white';
      case 'ghost':
        // Solo texto, fondo transparente hasta hover
        return base +
          'bg-transparent text-primary-soft hover:bg-primary/10';
    }
  }
}
