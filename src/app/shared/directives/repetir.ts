import { Directive, TemplateRef, ViewContainerRef, effect, input } from '@angular/core';

// ═══════════════════════════════════════════════════════════════
// DIRECTIVA ESTRUCTURAL custom: repite una plantilla N veces.
// Uso en template: <p *appRepetir="3; let i = $implicit">#{{ i }}</p>
//
// TemplateRef   = la plantilla capturada (el contenido del tag).
// ViewContainerRef = el lugar del DOM donde se insertan las copias.
// effect()      = re-renderiza automáticamente si cambia el input.
// ═══════════════════════════════════════════════════════════════
@Directive({
  selector: '[appRepetir]',
})
export class Repetir {
  // Nombre del input DEBE coincidir con el selector de la directiva
  veces = input.required<number>({ alias: 'appRepetir' });

  constructor(
    private tpl: TemplateRef<unknown>,         // el "asterisco" lo captura
    private vcr: ViewContainerRef,             // dónde insertar las copias
  ) {
    // effect: cada vez que veces() cambia, re-renderiza todo el bloque
    effect(() => {
      this.vcr.clear();                        // borra las copias anteriores

      for (let i = 0; i < this.veces(); i++) {
        // Crea una vista embebida con contexto mínimo: $implicit = índice
        this.vcr.createEmbeddedView(this.tpl, { $implicit: i });
      }
    });
  }
}
