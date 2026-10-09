import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IaService } from '../../core/services/ia';
import { TareasStore } from '../../core/store/tareas-store';

// ═══════════════════════════════════════════════════════════════
// IA APLICADA A FORMULARIOS: das un título y la IA genera
// descripción + prioridad sugerida, que se rellenan solos.
// Patrón: pedir JSON estricto → extraer → parsear → patchValue.
// ═══════════════════════════════════════════════════════════════
@Component({
  selector: 'app-ia-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './ia-form.html',
  styleUrl: './ia-form.css',
})
export class IaForm {
  protected readonly ia = inject(IaService);
  protected readonly store = inject(TareasStore);
  private readonly fb = inject(FormBuilder);

  // Reactive form: la IA lo RELLENA con patchValue, no el usuario
  form = this.fb.group({
    titulo: ['', Validators.required],
    descripcion: [''],
    prioridad: this.fb.control<'alta' | 'media' | 'baja'>('media'),
  });

  generando = signal(false);
  guardadoOk = signal(false);
  errorIa = signal<string | null>(null);

  // La IA responde JSON → extraemos y parcheamos el formulario
  async generarConIa(): Promise<void> {
    const titulo = this.form.value.titulo?.trim();
    if (!titulo) {
      this.form.get('titulo')?.markAsTouched();
      return;
    }

    this.generando.set(true);
    this.errorIa.set(null);

    // Instrucción: SOLO JSON, sin texto extra — facilita el parseo
    const system = [
      'Eres un asistente que ayuda a detallar tareas de software.',
      'Responde SOLO con JSON válido, sin markdown ni backticks.',
      'Formato exacto: {"descripcion":"...","prioridad":"alta"|"media"|"baja"}',
    ].join(' ');

    try {
      const crudo = await this.ia.generarTexto(
        system,
        `Tarea: "${titulo}". Genera una descripción breve (máx 2 líneas) y su prioridad.`,
      );

      // La IA puede rodear con ```json ...``` → extraemos el objeto con regex
      const match = crudo.match(/\{[\s\S]*\}/);
      if (!match) throw new Error('La IA no devolvió JSON');

      const sugerido = JSON.parse(match[0]) as { descripcion?: string; prioridad?: string };

      // patchValue: rellena campos sin tocar los demás (titulo queda intacto)
      this.form.patchValue({
        descripcion: sugerido.descripcion ?? '',
        prioridad: ['alta', 'media', 'baja'].includes(sugerido.prioridad ?? '')
          ? (sugerido.prioridad as 'alta' | 'media' | 'baja')
          : 'media',
      });
    } catch (e) {
      this.errorIa.set(e instanceof Error ? e.message : 'Error de IA');
    } finally {
      this.generando.set(false);
    }
  }

  // Guardar: el formulario validado alimenta el store de M16
  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.store.agregar(this.form.value.titulo!, this.form.value.prioridad ?? 'media');
    this.form.reset({ prioridad: 'media' });
    this.guardadoOk.set(true);
    // Oculto el aviso tras 2s
    setTimeout(() => this.guardadoOk.set(false), 2000);
  }
}
