import { Component, computed, input, model, output } from '@angular/core';

// MODELO compartido: definido aquí para que padre e hijo usen el mismo tipo
export interface Tarea {
  id: number;
  titulo: string;
  prioridad: 'alta' | 'media' | 'baja';
  hecha: boolean;
}

// ═══════════════════════════════════════════════════════════════
// COMPONENTE HIJO: recibe datos (input), emite eventos (output),
// y soporta two-way binding (model).
// ═══════════════════════════════════════════════════════════════
@Component({
  selector: 'app-tarjeta-tarea',
  imports: [],
  templateUrl: './tarjeta-tarea.html',
  styleUrl: './tarjeta-tarea.css',
})
export class TarjetaTarea {
  // ── input(): dato que ENTRA del padre (solo lectura dentro del hijo) ──
  // input.required = obligatorio en template del padre: [tarea]="..."
  tarea = input.required<Tarea>();

  // ── input opcional con valor por defecto ──
  mostrarBotones = input(true);           // padre puede omitirlo

  // ── computed sobre el input: se recalcula si el padre cambia el valor ──
  clasePrioridad = computed(() => `prioridad-${this.tarea().prioridad}`);

  // ── output(): evento que SALE hacia el padre ──
  // El padre lo escucha: (hecha)="manejarHecha($event)"
  hechaCambiada = output<boolean>();

  eliminar = output<number>();            // emite el id de la tarea

  // ── model(): input + output en uno → two-way binding [(seleccionada)] ──
  seleccionada = model(false);

  alternarHecha(): void {
    // emit(): dispara el evento hacia el padre con el nuevo valor
    this.hechaCambiada.emit(!this.tarea().hecha);
  }

  emitirEliminar(): void {
    this.eliminar.emit(this.tarea().id);
  }

  alternarSeleccion(): void {
    // model siempre es escribible → el padre recibe el cambio en vivo
    this.seleccionada.set(!this.seleccionada());
  }
}
