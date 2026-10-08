# Módulo 15 — Pipe `async` y estado simple con observables

## Objetivos
- Conectar Observables al template sin subscribe manual
- Entender `BehaviorSubject` como "estado actual" en RxJS
- Decidir cuándo usar async pipe vs signals

## Pipe `async` en 3 líneas
```html
{{ reloj$ | async }}
```
Qué hace Angular detrás:
1. Se suscribe al observable
2. Pinta el último valor emitido
3. Re-renderiza cuando llega uno nuevo
4. Se **desuscribe solo** al destruir el componente

Requisito: importar `AsyncPipe` en el componente (standalone).

## BehaviorSubject = estado actual en el mundo observable
```ts
private postId$ = new BehaviorSubject(1);   // arranca con valor 1
postId$.next(5);                            // emite nuevo valor
postId$.getValue();                         // último valor (raro usar así)
```
- A diferencia de `Subject` puro, siempre tiene valor inicial.
- Nuevos suscriptores reciben el último dato inmediatamente.
- Patrón clásico: "fuente de verdad reactiva" dentro de un servicio.

## Combinando: subject + switchMap → datos
```ts
post$ = this.postId$.pipe(
  switchMap((id) => this.http.get<Post>(`/posts/${id}`)),
  catchError(() => of(fallbackPost)),
);
```
- `switchMap` cancela la request anterior si cambia el id rápido.
- `catchError` + `of(...)` = el stream nunca se rompe, devuelve fallback.

## @let + async para vista limpia
```html
@let post = post$ | async;
@if (post) { <p>{{ post.title }}</p> } @else { <p>Cargando…</p> }
```
Evita repetir `post$ | async` muchas veces (cada una sería una suscripción extra).

## async pipe vs signals — cuándo cuál
| Escenario | Recomendado |
|---|---|
| Estado local simple (contador, form) | signals |
| Flujo de eventos (teclas, scroll, WS) | observables + async pipe |
| Estado compartido global | servicio + signals (M8/M14) |
| HTTP one-shot sin reactividad | `httpResource` (M10) |
| Streams cancelables / debounce | observables (M13) |

Regla: usa async pipe para leer observables en template; si el valor
se convierte en estado de la app, mígralo a signal o httpResource.

## Errores comunes
| Error | Causa | Fix |
|---|---|---|
| Template en blanco | Olvidaste `\| async` | Agregar al binding |
| Múltiples requests al cargar | Dos `async` al mismo observable HTTP | Usar `@let` con una sola subs |
| `undefined` al inicio | Observable no emitió todavía se muestra como null | `@if` con else "Cargando…" |
| Escribir a BehaviorSubject desde template | Rompes unidireccionalidad | Llamar método del componente |

## Ejercicio
1. Reloj extra: `map` del timer a formato `mm:ss`.
2. Botones ±1 que llamen a `postId$.next(postId$.getValue() ± 1)`.
3. Crear observable frío con `interval(2000)` y pararlo con un botón
   (`takeUntil(stop$)` donde `stop$` es otro Subject).
