import { Component, DestroyRef, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs';
import type { Observable } from 'rxjs';

interface UsuarioApi {
  id: number;
  name: string;
  email: string;
  username: string;
}

// ═══════════════════════════════════════════════════════════════
// RxJS = streams de datos + operadores para transformarlos.
// Patrón clásico: buscador que pega a API con debounce.
// ═══════════════════════════════════════════════════════════════
@Component({
  selector: 'app-rxjs-demo',
  imports: [ReactiveFormsModule],
  templateUrl: './rxjs-demo.html',
  styleUrl: './rxjs-demo.css',
})
export class RxjsDemo {
  private readonly http = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);

  // FormControl sin formGroup: para controles aislados
  readonly busqueda = new FormControl('', { nonNullable: true });

  // Estado reactivo con signals (RxJS produce, signals muestran)
  resultados = signal<UsuarioApi[]>([]);
  buscando = signal(false);
  contadorRequests = signal(0);

  constructor() {
    this.busqueda.valueChanges.pipe(
      // ① Espera 300ms de silencio → no dispara request por tecla
      debounceTime(300),
      // ② Ignora si el valor no cambió realmente
      distinctUntilChanged(),
      // ③ Solo trabajamos con 2+ caracteres
      filter((q) => q.trim().length >= 2),
      // ④ tap: side effect (activar spinner ANTES de la request)
      tap(() => this.buscando.set(true)),
      // ⑤ switchMap: cambia de stream. Si llega tecla nueva, CANCELA
      //    la request anterior y queda solo con la última.
      switchMap((q): Observable<UsuarioApi[]> => {
        this.contadorRequests.update((n) => n + 1);
        return this.http.get<UsuarioApi[]>(
          `https://jsonplaceholder.typicode.com/users?username_like=${encodeURIComponent(q)}`,
        );
      }),
      // ⑥ takeUntilDestroyed: al destruir el componente, unsubscribe solo.
      //    Sin esto: memory leaks y "set en componente destruido".
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      // subscribe() = "conectar la manguera": aquí llegan los datos
      next: (datos) => {
        this.resultados.set(datos);
        this.buscando.set(false);
      },
      error: () => {
        this.resultados.set([]);
        this.buscando.set(false);
      },
    });
  }
}
