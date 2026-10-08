import { Directive, ElementRef, HostListener, input } from '@angular/core';

// DIRECTIVA DE ATRIBUTO CUSTOM: modifica comportamiento/apariencia
// del elemento donde se aplica. Se usa como atributo: <p appResaltar>
@Directive({
  selector: '[appResaltar]',   // corchetes = atributo
})
export class Resaltar {
  // input() = nueva API de signals para inputs de directiva/componente.
  // Permite personalizar: <p appResaltar color="pink">
  color = input('#fff740'); // amarillo post-it por defecto

  // ElementRef = referencia directa al elemento DOM donde vive la directiva
  constructor(private el: ElementRef<HTMLElement>) {}

  // HostListener: escucha eventos del elemento anfitrión
  @HostListener('mouseenter')
  alEntrar(): void {
    // Acceso directo al estilo del elemento nativo
    this.el.nativeElement.style.backgroundColor = this.color();
  }

  @HostListener('mouseleave')
  alSalir(): void {
    this.el.nativeElement.style.backgroundColor = 'transparent';
  }
}
