import { Component, computed, inject, signal } from '@angular/core';
import { Repetir } from '../../shared/directives/repetir';
import { SiRol } from '../../shared/directives/si-rol';
import { Auth } from '../../core/services/auth';

// Componente que DEMASUESTRA las directivas estructurales custom.
@Component({
  selector: 'app-directivas-custom',
  imports: [Repetir, SiRol],
  templateUrl: './directivas-custom.html',
  styleUrl: './directivas-custom.css',
})
export class DirectivasCustom {
  protected readonly auth = inject(Auth);

  // Controla cuántas veces se repite el bloque (demo de appRepetir)
  repeticiones = signal(3);

  // Roles disponibles en la app (demo)
  roles = signal(['admin', 'editor', 'erick']);

  // computed del usuario actual — combo con auth.usuario()
  usuarioActual = computed(() => this.auth.usuario());

  aumentar(): void { this.repeticiones.update((n) => n + 1); }
  disminuir(): void { this.repeticiones.update((n) => Math.max(0, n - 1)); }
}
