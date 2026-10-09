import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';
import { Auth } from './core/services/auth';

// Item del sidebar: módulo del curso ruteable
interface EnlaceModulo {
  ruta: string;
  nombre: string;
  icono: string;      // emoji simple (luego se cambia por lucide)
  exacto?: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly auth = inject(Auth);
  private readonly destroyRef = inject(DestroyRef);

  // ── Buscador del topbar (RxJS, patrón del M13) ──
  readonly busqueda = new FormControl('', { nonNullable: true });
  readonly textoBusqueda = signal('');

  // Catálogo de módulos: única fuente del sidebar
  readonly modulos: EnlaceModulo[] = [
    { ruta: '/',              nombre: 'Inicio',       icono: '🏠', exacto: true },
    { ruta: '/binding',       nombre: 'Binding',      icono: '🔗' },
    { ruta: '/control-flow',  nombre: 'Control Flow', icono: '🧭' },
    { ruta: '/pipes-directivas', nombre: 'Pipes y Directivas', icono: '🧪' },
    { ruta: '/signals',       nombre: 'Signals',      icono: '⚡' },
    { ruta: '/io',            nombre: 'Input/Output', icono: '📦' },
    { ruta: '/servicios',     nombre: 'Servicios',    icono: '🧰' },
    { ruta: '/http',          nombre: 'HTTP',         icono: '🌐' },
    { ruta: '/form-template', nombre: 'Form Template',icono: '📝' },
    { ruta: '/form-reactivo', nombre: 'Form Reactivo',icono: '🧾' },
    { ruta: '/rxjs',          nombre: 'RxJS',         icono: '🌀' },
    { ruta: '/comunicacion',  nombre: 'Comunicación', icono: '💬' },
    { ruta: '/async-pipe',    nombre: 'Async Pipe',   icono: '🚰' },
    { ruta: '/store',         nombre: 'Store',        icono: '🗄️' },
    { ruta: '/optimizacion',  nombre: 'Optimización', icono: '🚀' },
    { ruta: '/directivas-custom', nombre: 'Dir. Custom', icono: '🧩' },
    { ruta: '/ia',            nombre: 'Chat IA',      icono: '🤖' },
    { ruta: '/ia-form',       nombre: 'IA Form',      icono: '🪄' },
    { ruta: '/dashboard',     nombre: 'Dashboard',    icono: '🏆' },
    { ruta: '/ui-kit',        nombre: 'UI Kit',       icono: '🎨' },
    { ruta: '/admin',         nombre: 'Admin',        icono: '🔒' },
  ];

  // Filtrado reactivo del sidebar según el buscador
  readonly modulosVisibles = computed(() => {
    const q = this.textoBusqueda().toLowerCase().trim();
    if (!q) return this.modulos;
    return this.modulos.filter((m) => m.nombre.toLowerCase().includes(q));
  });

  // Inicial del usuario para el avatar
  readonly inicialUsuario = computed(() => {
    const u = this.auth.usuario();
    return u ? u.charAt(0).toUpperCase() : '?';
  });

  constructor() {
    // Pipeline RxJS del buscador: debounce → signal → computed filtra
    this.busqueda.valueChanges.pipe(
      debounceTime(200),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe((texto) => this.textoBusqueda.set(texto));
  }
}
