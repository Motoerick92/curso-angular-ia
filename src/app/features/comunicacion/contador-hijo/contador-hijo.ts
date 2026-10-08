import { Component, signal } from '@angular/core';

// Componente CONTROLADO de forma externa:
// No recibe @Input — el padre lo manipula con viewChild().
// Útil cuando el padre necesita invocar métodos del hijo
// (ej: resetear, enfocar, animar) desde su propia lógica.
@Component({
  selector: 'app-contador-hijo',
  imports: [],
  templateUrl: './contador-hijo.html',
})
export class ContadorHijo {
  valor = signal(0);
  vecesReseteado = signal(0);   // para demostrar que el padre llamó el método

  sumar(): void {
    this.valor.update((n) => n + 1);
  }

  // Este método lo va a llamar el PADRE con viewChild()
  resetear(): void {
    this.valor.set(0);
    this.vecesReseteado.update((n) => n + 1);
  }
}
