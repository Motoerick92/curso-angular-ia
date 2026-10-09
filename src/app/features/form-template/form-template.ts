import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { UiCard } from '../../shared/components/ui/ui-card';

// Datos del formulario: un simple objeto (no signals por campo,
// porque ngModel muta el objeto directamente)
interface FormularioContacto {
  nombre: string;
  email: string;
  edad: number | null;
  tema: 'claro' | 'oscuro';
  aceptaTerminos: boolean;
}

// ═══════════════════════════════════════════════════════════════
// TEMPLATE-DRIVEN: la lógica del form vive en el TEMPLATE.
// ngModel hace two-way binding, ngForm rastrea validaciones.
// Ideal para formularios simples.
// ═══════════════════════════════════════════════════════════════
@Component({
  selector: 'app-form-template',
  imports: [FormsModule, JsonPipe, UiCard],   // FormsModule = obligatorio para ngModel/ngForm
  templateUrl: './form-template.html',
  styleUrl: './form-template.css',
})
export class FormTemplate {
  // Modelo: objeto simple que ngModel muta con two-way binding
  modelo = signal<FormularioContacto>({
    nombre: '',
    email: '',
    edad: null,
    tema: 'claro',
    aceptaTerminos: false,
  });

  // Flag para mostrar éxito al enviar
  enviado = signal(false);

  // $event no se usa aquí: ngForm pasa directamente
  alEnviar(): void {
    this.enviado.set(true);
    console.log('Formulario enviado:', this.modelo());
  }

  reiniciar(): void {
    this.modelo.set({
      nombre: '',
      email: '',
      edad: null,
      tema: 'claro',
      aceptaTerminos: false,
    });
    this.enviado.set(false);
  }
}
