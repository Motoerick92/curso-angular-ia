import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Tareas } from '../../core/services/tareas';
import { UiCard } from '../../shared/components/ui/ui-card';
import { UiBadge } from '../../shared/components/ui/ui-badge';

// Página de DETALLE: lee el id de la URL (/tarea/2) y pide datos al servicio.
@Component({
  selector: 'app-tarea-detalle',
  imports: [RouterLink, UiCard, UiBadge],
  templateUrl: './tarea-detalle.html',
  styleUrl: './tarea-detalle.css',
})
export class TareaDetalle {
  private readonly tareasSvc = inject(Tareas);

  // withComponentInputBinding (en app.config.ts) mapea el :id de la URL
  // directo a este input → el componente recibe el parámetro como string
  id = input.required<string>();

  // computed: deriva la tarea real del servicio usando el id de la URL
  tarea = computed(() => this.tareasSvc.tareas().find((t) => t.id === Number(this.id())));
}
