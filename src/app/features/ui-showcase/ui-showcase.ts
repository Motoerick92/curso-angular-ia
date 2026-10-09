import { Component, signal } from '@angular/core';
import { UiCard } from '../../shared/components/ui/ui-card';
import { UiButton } from '../../shared/components/ui/ui-button';
import { UiBadge } from '../../shared/components/ui/ui-badge';
import { UiInput } from '../../shared/components/ui/ui-input';
import { UiSkeleton } from '../../shared/components/ui/ui-skeleton';

// Vitrina del design system: todas las piezas UI en una sola pantalla.
@Component({
  selector: 'app-ui-showcase',
  standalone: true,
  imports: [UiCard, UiButton, UiBadge, UiInput, UiSkeleton],
  template: `
    <h1 class="text-3xl font-bold mb-6">🎨 UI Kit — Design System</h1>

    <!-- Botones -->
    <ui-card titulo="Botones" etiqueta="3 variantes">
      <div class="flex gap-3 flex-wrap">
        <ui-button variant="primary" (click)="incrementar()">
          Primary ({{ contador() }})
        </ui-button>
        <ui-button variant="secondary">Secondary</ui-button>
        <ui-button variant="ghost">Ghost</ui-button>
        <ui-button variant="primary" [loading]="true">Cargando…</ui-button>
        <ui-button variant="primary" [disabled]="true">Deshabilitado</ui-button>
      </div>
    </ui-card>

    <!-- Badges -->
    <ui-card titulo="Badges" etiqueta="5 tonos">
      <div class="flex gap-2 flex-wrap">
        <ui-badge tonalidad="primario">Primario</ui-badge>
        <ui-badge tonalidad="acento">Acento</ui-badge>
        <ui-badge tonalidad="exito">Éxito</ui-badge>
        <ui-badge tonalidad="alerta">Alerta</ui-badge>
        <ui-badge tonalidad="muted">Muted</ui-badge>
      </div>
    </ui-card>

    <!-- Inputs -->
    <ui-card titulo="Inputs" etiqueta="label flotante">
      <div class="grid gap-4 max-w-md">
        <ui-input etiqueta="Tu nombre" [(valor)]="nombre" />
        <ui-input etiqueta="Email" type="email" [(valor)]="email" />
      </div>
      @if (nombre()) {
        <p class="mt-3 text-sm text-text-muted">
          Two-way funciona: escribiste <b class="text-accent-soft">{{ nombre() }}</b>
        </p>
      }
    </ui-card>

    <!-- Skeletons -->
    <ui-card titulo="Skeletons" etiqueta="loading">
      <div class="grid gap-4 md:grid-cols-2">
        <ui-skeleton forma="tarjeta" />
        <div>
          <ui-skeleton forma="texto" [lineas]="4" />
        </div>
      </div>
    </ui-card>

    <!-- Cards anidadas -->
    <ui-card titulo="Cards con variante" etiqueta="elevada" variant="elevada">
      <p class="text-text-muted">Variante <b>elevada</b> = sombra más fuerte</p>
    </ui-card>
  `,
})
export class UiShowcase {
  contador = signal(0);
  nombre = signal('');
  email = signal('');

  incrementar(): void {
    this.contador.update((n) => n + 1);
  }
}
