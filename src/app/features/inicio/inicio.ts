import { Component } from '@angular/core';

// @Component: decorador que convierte esta clase TS en un componente Angular.
// En Angular 22 TODO es standalone por defecto → no existe NgModule.
@Component({
  selector: 'app-inicio',        // etiqueta HTML para usarlo: <app-inicio />
  imports: [],                   // dependencias que este componente usa (componentes, pipes...)
  templateUrl: './inicio.html',  // archivo de vista (HTML)
  styleUrl: './inicio.css',      // estilos encapsulados: solo afectan a este componente
})
export class Inicio {
  // Propiedades públicas → visibles desde el template vía interpolación {{ }}
  titulo = 'Curso Angular 22 + IA';
  moduloActual = 2;
  completado = false;

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
    this.completado = !this.completado;
  }
}
