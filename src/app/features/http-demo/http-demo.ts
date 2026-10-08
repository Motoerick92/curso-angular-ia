import { Component, inject } from '@angular/core';
import { TareasApi } from '../../core/services/tareas-api';

// Componente delgado: toda la lógica HTTP está en el servicio.
// Aquí solo inyectamos y conectamos signals con el template.
@Component({
  selector: 'app-http-demo',
  imports: [],
  templateUrl: './http-demo.html',
  styleUrl: './http-demo.css',
})
export class HttpDemo {
  protected readonly api = inject(TareasApi);
}
