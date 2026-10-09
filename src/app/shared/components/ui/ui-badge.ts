import { ChangeDetectionStrategy, Component, input } from '@angular/core';

// ═══════════════════════════════════════════════════════════════
// UI-BADGE: pastilla de estado/categoría.
//
// Uso: <ui-badge tonalidad="exito">Hecha</ui-badge>
// Pensado para: estados de tareas, módulos del curso, prioridades.
// ═══════════════════════════════════════════════════════════════
@Component({
  selector: 'ui-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span [class]="clases()">
      <!-- Punto indicador de color -->
      <span [class]="'w-1.5 h-1.5 rounded-full ' + puntoClases()"></span>
      <ng-content />
    </span>
  `,
})
export class UiBadge {
  tonalidad = input<'primario' | 'acento' | 'exito' | 'alerta' | 'muted'>('primario');

  clases(): string {
    const base =
      'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 ' +
      'text-xs font-medium ';
    switch (this.tonalidad()) {
      case 'exito':   return base + 'bg-emerald-500/15 text-emerald-300';
      case 'alerta':  return base + 'bg-amber-500/15 text-amber-300';
      case 'acento':  return base + 'bg-accent/15 text-accent-soft';
      case 'muted':   return base + 'bg-slate-500/15 text-text-muted';
      default:        return base + 'bg-primary/15 text-primary-soft';
    }
  }

  puntoClases(): string {
    switch (this.tonalidad()) {
      case 'exito':   return 'bg-emerald-400';
      case 'alerta':  return 'bg-amber-400';
      case 'acento':  return 'bg-accent';
      case 'muted':   return 'bg-slate-400';
      default:        return 'bg-primary-soft';
    }
  }
}
