import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Tareas } from '../../core/services/tareas';
import { TarjetaTarea } from '../io/tarjeta-tarea/tarjeta-tarea';

// ═══════════════════════════════════════════════════════════════
// DEMOSTRACIÓN: inyectamos el servicio y leemos el estado compartido.
// NADA del estado vive aquí — solo lo "consume".
// ═══════════════════════════════════════════════════════════════
@Component({
  selector: 'app-servicios',
  imports: [TarjetaTarea, RouterLink],
  templateUrl: './servicios.html',
  styleUrl: './servicios.css',
})
export class Servicios {
  // inject(): forma moderna de inyección de dependencias.
  // Alternativa: constructor(private tareas: Tareas).
  // inject() es más limpio y funciona fuera del constructor.
  protected readonly tareasSvc = inject(Tareas);

  // Métodos DELEGACIÓN: el componente traduce eventos del hijo
  // a llamadas al servicio. El servicio decide qué hacer.
  alAgregar(titulo: string): void {
    if (!titulo.trim()) return;               // validación mínima
    this.tareasSvc.agregar(titulo, 'media');
  }

  alCambiarHecha(id: number, hecha: boolean): void {
    // El servicio ya sabe cómo alternar — pasamos el id y el nuevo estado
    this.tareasSvc.alternar(id);
  }

  alEliminar(id: number): void {
    this.tareasSvc.eliminar(id);
  }

  alLimpiar(): void {
    this.tareasSvc.limpiar();
  }

  alRestaurar(): void {
    this.tareasSvc.restaurarDemo();
  }
}
