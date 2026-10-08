# Módulo 13 — RxJS esencial

## Objetivos
Entender observables, operadores clave y cómo conviven con signals
en Angular moderno.

## ¿Qué es un Observable?
Stream de valores a lo largo del tiempo. A diferencia de un signal
(valor actual), un observable es un FLUJO. Angular los usa para
HTTP, eventos de forms, router, WebSockets.

## El pipeline del buscador (patrón clásico)

```ts
this.busqueda.valueChanges.pipe(
  debounceTime(300),          // ① pausa tras dejar de teclear
  distinctUntilChanged(),     // ② ignora repetidos
  filter(q => q.length >= 2), // ③ solo con 2+ caracteres
  tap(() => this.buscando.set(true)), // ④ side effect (spinner)
  switchMap(q => this.http.get<UsuarioApi[]>(...)), // ⑤ request cancelable
  takeUntilDestroyed(this.destroyRef),              // ⑥ auto-unsubscribe
).subscribe({
  next: (datos) => { ... },
  error: () => { ... },
});
```

## Operadores clave explicados
| Operador | Qué hace | Analogía |
|---|---|---|
| `debounceTime(300)` | Espera 300ms de silencio | Portero que espera a que paren de tocar |
| `distinctUntilChanged()` | Ignora valores iguales al anterior | Anti spam de Enter repetido |
| `filter(fn)` | Solo deja pasar lo que cumple la condición | Colador |
| `tap(fn)` | Side effect sin modificar el stream | Mirón que anota pero no toca |
| `switchMap(fn)` | Cambia a otro observable, CANCELA el anterior | Solo el último importa |
| `takeUntilDestroyed(ref)` | Auto-desuscribe al destruir componente | Limpieza automática |

## Por qué `switchMap` y no `map` o `mergeMap`
- `mergeMap`: ejecuta TODAS las requests (race condition: pueden llegar desordenadas).
- `switchMap`: cancela la anterior → solo la última respuesta pinta. Perfecto para búsquedas.
- `concatMap`: encola — una a la vez en orden.
- `exhaustMap`: ignora nuevas mientras corre una — ideal para "botón guardar".

## RxJS + Signals: la convivencia moderna
```
valueChanges (Observable)   →   RxJS procesa   →   signals muestran
     stream de teclas            debounce etc.       template reactivo
```
Regla práctica: **RxJS orquesta, signals muestran**.

## takeUntilDestroyed (¡IMPORTANTE!)
```ts
private destroyRef = inject(DestroyRef);
// ...
.pipe(..., takeUntilDestroyed(this.destroyRef))
.subscribe(...)
```
- Sin esto: al salir de la página la suscripción SIGUE activa (memory leak).
- Moderno: dentro de `inject()` context, no necesita ni constructor.

## Errores comunes
| Error | Causa | Fix |
|---|---|---|
| Request por cada tecla | Falta `debounceTime` | Agregarlo al inicio |
| Llegan respuestas viejas | Usaste `map` + subscribe anidado | Cambiar a `switchMap` |
| Componente destruido pero sigue emitiendo | Falta `takeUntilDestroyed` | Agregarlo antes de subscribe |
| No entra al subscribe | `valueChanges` sin FormControl enlazado | Asegurar `[formControl]` en template |

## Ejercicio
1. Agregar `catchError` que muestre mensaje amable si la API falla.
2. Contador visual de cuántas requests se cancelaron (switchMap pierde).
3. Hacer lo mismo con 2 campos: `nombre` y `ciudad`, combinados con `combineLatest`.
