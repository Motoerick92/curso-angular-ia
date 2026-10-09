import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiCard } from '../../shared/components/ui/ui-card';
import { UiBadge } from '../../shared/components/ui/ui-badge';

// Demostración de los 4 tipos de data binding en Angular:
// 1) Interpolación      {{ }}         → clase → template (texto)
// 2) Property binding   [prop]="exp"  → clase → template (propiedad DOM)
// 3) Event binding      (event)="fn()"→ template → clase (eventos)
// 4) Two-way binding    [(ngModel)]   → bidireccional (clase ↔ template)
@Component({
  selector: 'app-binding',
  // FormsModule es OBLIGATORIO para usar [(ngModel)]
  imports: [FormsModule, UiCard, UiBadge],
  templateUrl: './binding.html',
  styleUrl: './binding.css',
})
export class Binding {
  // Signal con el nombre del alumno: fuente de verdad para el input
  nombre = signal('Erick');

  // Estado del botón (ejemplo de property binding)
  botonDeshabilitado = signal(false);

  // Contador de clics (ejemplo de event binding)
  clics = signal(0);

  // URL de imagen (property binding en [src])
  urlImagen = signal('https://angular.dev/assets/images/press-kit/angular_icon_gradient.gif');

  // Event binding: el template llama este método cuando ocurre un evento
  contarClic(): void {
    // update() muta el signal de forma segura
    this.clics.update((n) => n + 1);
  }

  alternarBoton(): void {
    this.botonDeshabilitado.update((v) => !v);
  }
}
