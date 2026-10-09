import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';

// ═══════════════════════════════════════════════════════════════
// UI-INPUT: campo de texto con label flotante y focus ring indigo.
//
// Uso:
//   <ui-input etiqueta="Nombre" [(valor)]="nombre" placeholder="..." />
//
// model() = two-way binding listo (M7). Sin forms module: control manual.
// ═══════════════════════════════════════════════════════════════
@Component({
  selector: 'ui-input',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label class="group relative block">
      <!-- Input visual: oscuro, borde slate, ring indigo al focus -->
      <input
        [type]="type()"
        [placeholder]="placeholder()"
        [value]="valor()"
        (input)="alEscribir($event)"
        [disabled]="disabled()"
        class="peer w-full rounded-md border border-border bg-bg-panel px-4 pt-5 pb-1.5
               text-sm text-text placeholder-transparent
               transition-all duration-200
               focus:border-primary focus:ring-2 focus:ring-primary/40 focus:outline-none
               disabled:opacity-50" />

      <!-- Label flotante: sube cuando hay foco o contenido (peer-*) -->
      <span class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2
                   text-sm text-text-muted transition-all duration-200
                   peer-focus:top-2.5 peer-focus:text-xs peer-focus:text-primary-soft
                   @[true]:top-2.5"
            [class]="valor() ? 'top-2.5! text-xs!' : ''">
        {{ etiqueta() }}
      </span>
    </label>
  `,
})
export class UiInput {
  etiqueta = input.required<string>();
  placeholder = input(' ');
  type = input<'text' | 'email' | 'password' | 'number'>('text');
  disabled = input(false);

  // model: [(valor)] desde el padre
  valor = model('');

  alEscribir(evento: Event): void {
    // InputEvent → extraemos el valor del elemento nativo
    const el = evento.target as HTMLInputElement;
    this.valor.set(el.value);
  }
}
