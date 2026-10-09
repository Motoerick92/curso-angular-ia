import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AsyncPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UiCard } from '../../shared/components/ui/ui-card';
import { UiBadge } from '../../shared/components/ui/ui-badge';
import { UiSkeleton } from '../../shared/components/ui/ui-skeleton';
import { BehaviorSubject, of, timer } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// ═══════════════════════════════════════════════════════════════
// PIPE ASYNC: conecta Observables directo al template.
// subscribe automático + unsubscribe automático al destruir.
// Alternativa a guardar el valor en signals manualmente.
// ═══════════════════════════════════════════════════════════════
@Component({
  selector: 'app-async-pipe',
  imports: [AsyncPipe, ReactiveFormsModule, UiCard, UiBadge, UiSkeleton],
  templateUrl: './async-pipe.html',
  styleUrl: './async-pipe.css',
})
export class AsyncPipeDemo {
  private readonly http = inject(HttpClient);

  // ── BehaviorSubject: observable que guarda el último valor ──
  //   Ideal para "estado actual" en RxJS: los suscriptores nuevos
  //   reciben el último dato inmediatamente.
  private readonly postId$ = new BehaviorSubject(1);  // arranca en 1

  // Control para cambiar el id desde el template
  readonly idControl = new FormControl(1, { nonNullable: true });

  // ── Timer observable: emite un número cada segundo ──
  //   Demo simple: ver async pipe "suscribirse" y recibir valores.
  readonly reloj$ = timer(0, 1000);   // empieza al t=0, repite cada 1000ms

  // ── Pipeline derivado: cada vez que postId$ emite, pedimos ese post ──
  readonly post$ = this.postId$.pipe(
    switchMap((id) =>
      this.http.get<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`),
    ),
    // Si la API falla, devolvemos un post falso en vez de romper el stream
    catchError(() =>
      of({ userId: 0, id: 0, title: 'Error al cargar', body: 'Revisá la conexión.' } as Post),
    ),
  );

  // El id actual también como observable, para mostrarlo con async pipe
  readonly postIdActual$ = this.postId$.asObservable();

  cambiarId(id: number): void {
    if (id >= 1 && id <= 100) this.postId$.next(id);   // next: emite nuevo valor
  }
}
