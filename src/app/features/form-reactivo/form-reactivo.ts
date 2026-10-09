import { Component, inject, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { UiCard } from '../../shared/components/ui/ui-card';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

// ═══════════════════════════════════════════════════════════════
// VALIDADOR CUSTOM: función pura que recibe el control y devuelve
// null (válido) o un objeto de error { clave: valor }.
// ═══════════════════════════════════════════════════════════════
function noEspacios(control: AbstractControl): ValidationErrors | null {
  const valor = String(control.value ?? '');
  // /\s/ = cualquier espacio/tab/salto → válido si NO aparece
  return valor.includes(' ') ? { espacios: 'No se permiten espacios' } : null;
}

// Validador con parámetro: factory que devuelve la función validadora
function edadMinima(minima: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    const edad = Number(control.value);
    if (isNaN(edad)) return null;          // otro validador maneja "no número"
    return edad >= minima ? null : { edadMinima: { minima, actual: edad } };
  };
}

// ═══════════════════════════════════════════════════════════════
// REACTIVE FORMS: el formulario se CONSTRUYE en la clase TS.
// Typado, testeable, dinámico. El template solo lo "pinta".
// ═══════════════════════════════════════════════════════════════
@Component({
  selector: 'app-form-reactivo',
  imports: [ReactiveFormsModule, JsonPipe, UiCard],
  templateUrl: './form-reactivo.html',
  styleUrl: './form-reactivo.css',
})
export class FormReactivo {
  // FormBuilder inyectado: atajos para declarar controles con validadores
  private readonly fb = inject(FormBuilder);

  // Declaración en TS: cada control es un FormControl con su lista de validadores
  form = this.fb.group({
    // [valorInicial, [validadores síncronos]]
    usuario: ['', [Validators.required, Validators.minLength(3), noEspacios]],
    email: ['', [Validators.required, Validators.email]],
    edad: [null as number | null, [Validators.required, edadMinima(18)]],
    // Grupo anidado: dirección
    direccion: this.fb.group({
      calle: ['', Validators.required],
      ciudad: ['', Validators.required],
    }),
  });

  enviado = signal(false);

  // Acceso cómodo a controles para el template
  get usuario() { return this.form.get('usuario')!; }
  get email()   { return this.form.get('email')!; }
  get edad()    { return this.form.get('edad')!; }

  alEnviar(): void {
    if (this.form.invalid) {
      // markAllAsTouched: muestra errores de TODOS los campos a la vez
      this.form.markAllAsTouched();
      return;
    }
    this.enviado.set(true);
    console.log('Reactive form enviado:', this.form.value);
  }

  reiniciar(): void {
    this.form.reset();
    this.enviado.set(false);
  }
}
