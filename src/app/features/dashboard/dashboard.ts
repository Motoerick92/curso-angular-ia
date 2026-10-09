import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { TareasStore } from '../../core/store/tareas-store';
import { IaService } from '../../core/services/ia';
import { Auth } from '../../core/services/auth';
import { TarjetaTarea } from '../io/tarjeta-tarea/tarjeta-tarea';

// ═══════════════════════════════════════════════════════════════
// PROYECTO FINAL — Dashboard "Mi Productividad IA".
// Consolida el curso en UN solo componente:
//   M6  signals/computed        → progreso, stats
//   M8/M16 servicio + store     → tareas globales
//   M21 IA service              → generar resumen del día
//   M9  auth                    → panel visible solo logueado
//   M20 Title/Meta              → SEO del dashboard
// ═══════════════════════════════════════════════════════════════
@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, TarjetaTarea],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  protected readonly store = inject(TareasStore);
  protected readonly ia = inject(IaService);
  protected readonly auth = inject(Auth);

  resumenIa = signal<string | null>(null);
  resumenCargando = signal(false);

  // Progreso % derivado: 0-100, muestra skill de compute sobre observables locales
  readonly progreso = computed(() => {
    const total = this.store.total();
    return total === 0 ? 0 : Math.round((this.store.completadas() / total) * 100);
  });

  readonly estadoAnimo = computed(() => {
    const p = this.progreso();
    if (p === 100) return '🏆 Todo completado';
    if (p >= 70) return '🚀 Excelente avance';
    if (p >= 40) return '💪 Vas bien';
    return '🌱 Recién empezando';
  });

  constructor() {
    // SEO del proyecto final
    const title = inject(Title);
    const meta = inject(Meta);
    title.setTitle('Dashboard | Mi Productividad IA');
    meta.updateTag({ name: 'description', content: 'Dashboard final del curso Angular 22 con IA integrada.' });
  }

  // Llama a la IA pedagógica: resume el estado actual de las tareas
  async generarResumen(): Promise<void> {
    this.resumenCargando.set(true);
    try {
      const tareas = this.store.lista()
        .map((t) => `- [${t.hecha ? 'x' : ' '}] (${t.prioridad}) ${t.titulo}`)
        .join('\n');

      const texto = await this.ia.generarTexto(
        'Eres coach de productividad. Resume el estado brevemente (3 bullets) ' +
        'y da UN tip accionable. Español neutro, tono motivador.',
        tareas || '(sin tareas todavía)',
      );
      this.resumenIa.set(texto);
    } catch (e) {
      this.resumenIa.set(`❌ ${e instanceof Error ? e.message : 'error'}`);
    } finally {
      this.resumenCargando.set(false);
    }
  }
}
