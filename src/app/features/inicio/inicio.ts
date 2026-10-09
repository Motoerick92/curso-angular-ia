import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
// Title / Meta: servicios DOM del framework para SEO
import { Title, Meta } from '@angular/platform-browser';
// Piezas del design system (M25)
import { UiCard } from '../../shared/components/ui/ui-card';
import { UiButton } from '../../shared/components/ui/ui-button';
import { UiBadge } from '../../shared/components/ui/ui-badge';

// @Component: decorador que convierte esta clase TS en un componente Angular.
// En Angular 22 TODO es standalone por defecto → no existe NgModule.
@Component({
  selector: 'app-inicio',        // etiqueta HTML para usarlo: <app-inicio />
  imports: [UiCard, UiButton, UiBadge, RouterLink], // dependencias que este componente usa
  templateUrl: './inicio.html',  // archivo de vista (HTML)
  styleUrl: './inicio.css',      // estilos encapsulados: solo afectan a este componente
})
export class Inicio {
  // Propiedades públicas → visibles desde el template vía interpolación {{ }}
  titulo = 'Curso Angular 22 + IA';
  moduloActual = 2;
  // M25 fix zoneless: estado como signal — sin Zone.js una propiedad
  // plana NO dispara change detection si la mutas imperativamente
  completado = signal(false);

  // Getter: propiedad derivada, se recalcula en cada ciclo de change detection
  get progreso(): string {
    return `Módulo ${this.moduloActual} de 24`;
  }

  // Método de instancia: también se puede invocar desde el template
  saludar(): string {
    return `Bienvenido al ${this.titulo}`;
  }

  // Método que muta estado: Angular detecta el cambio y actualiza la vista solo
  alternarCompletado(): void {
    this.completado.update((v) => !v);
  }

  // SEO por ruta: cada página setea su título y meta tags.
  // Con SSR, estos tags llegan renderizados en el HTML inicial.
  constructor() {
    const title = inject(Title);
    const meta = inject(Meta);
    title.setTitle('Inicio | Curso Angular 22 + IA');
    meta.updateTag({ name: 'description', content: 'Curso completo de Angular 22 con signals, control flow e IA.' });
    meta.updateTag({ property: 'og:title', content: 'Curso Angular 22 + IA' });
  }
}
