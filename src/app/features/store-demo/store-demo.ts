import { Component, inject } from '@angular/core';
import { TareasStore } from '../../core/store/tareas-store';
import { TarjetaTarea } from '../io/tarjeta-tarea/tarjeta-tarea';

// ═══════════════════════════════════════════════════════════════
// Componente "tonto": solo inyecta el store y llama acciones.
// Nunca manipula estado directamente.
// ═══════════════════════════════════════════════════════════════
@Component({
  selector: 'app-store-demo',
  imports: [TarjetaTarea],
  templateUrl: './store-demo.html',
  styleUrl: './store-demo.css',
})
export class StoreDemo {
  // Solo lectura: el componente recibe el store completo
  protected readonly store = inject(TareasStore);

  // Alias para template más legible
  protected readonly visibles = this.store.visibles;
  protected readonly filtro = this.store.filtroActual;

  alAgregar(input: HTMLInputElement): void {
    this.store.agregar(input.value);
    input.value = '';                // limpiar input nativo
    input.focus();                   // devolver foco
  }
}
