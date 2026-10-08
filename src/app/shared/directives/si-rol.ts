import { Directive, TemplateRef, ViewContainerRef, effect, inject, input } from '@angular/core';
import { Auth } from '../../core/services/auth';

// ═══════════════════════════════════════════════════════════════
// DIRECTIVA ESTRUCTURAL con lógica de DOMINIO:
// muestra el contenido SOLO si el usuario logueado coincide
// con uno de los roles permitidos.
// Uso: <p *appSiRol="['admin','erick']">Solo admins</p>
//
// Esta vez la directiva INYECTA el servicio Auth: separación de
// preocupaciones — la lógica de permisos vive en el servicio,
// la condición de visibilidad en la directiva.
// ═══════════════════════════════════════════════════════════════
@Directive({
  selector: '[appSiRol]',
})
export class SiRol {
  private auth = inject(Auth);
  private tpl: TemplateRef<unknown>;
  private vcr: ViewContainerRef;

  rolesPermitidos = input.required<string[]>({ alias: 'appSiRol' });

  constructor(tpl: TemplateRef<unknown>, vcr: ViewContainerRef) {
    this.tpl = tpl;
    this.vcr = vcr;

    effect(() => {
      // Levanta los signals que cambian: usuario() y la decisión de mostrar
      const usuario = this.auth.usuario();
      const mostrar = usuario !== null && this.rolesPermitidos().includes(usuario);

      this.vcr.clear();                        // siempre limpia antes
      if (mostrar) {
        this.vcr.createEmbeddedView(this.tpl); // inserta la vista
      }
    });
  }
}
