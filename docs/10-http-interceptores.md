# Módulo 10 — HttpClient, httpResource e Interceptores

## Objetivos
- Habilitar HTTP global con `provideHttpClient`
- Consumir API real (JSONPlaceholder) con `httpResource`
- Interceptar requests con `HttpInterceptorFn`

## Setup
```ts
// app.config.ts
provideHttpClient(withInterceptors([authInterceptor]))
```
Sin esto, cualquier uso de HTTP falla con "No provider for HttpClient".

## httpResource: HTTP reactivo nativo de Angular 22
```ts
limite = signal(5);

tareasResource = httpResource<TareaApi[]>(() => ({
  url: 'https://jsonplaceholder.typicode.com/todos',
  params: { _limit: this.limite().toString() },  // lee signal → relanza request
}));
```

### El resource expone 4 signals
| Signal | Contenido |
|---|---|
| `.value()` | Datos tipados (o `undefined` mientras carga) |
| `.isLoading()` | `true` durante la request |
| `.error()` | Objeto error si falló |
| `.status()` | `'idle' \| 'loading' \| 'resolved' \| 'error'` |

### Ventaja clave
Si la función devuelta lee signals, cambiar esos signals **relanza la
request automáticamente** — sin `subscribe`, sin código extra.

## Template con @let + estados del resource
```html
@if (api.tareasResource.isLoading()) { <p>Cargando…</p> }

@let error = api.tareasResource.error();
@if (error) { <p>❌ {{ error.message }}</p> }

@let tareas = api.tareasResource.value();
@if (tareas) { @for (t of tareas; track t.id) { ... } }
```
`@let` = variable local de template (Angular 18.1+). Evita repetir
`api.tareasResource.value()` por todas partes.

## Interceptor funcional
```ts
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(Auth);

  // HttpRequest es INMUTABLE → clonar para modificar
  const modificada = req.clone({
    setHeaders: { 'X-Usuario': auth.usuario() ?? '' },
  });

  return next(modificada);   // pasar al siguiente paso del pipeline
};
```
- Recibe TODAS las requests salientes.
- Usos: auth headers, logs, retry global, cache, manejo central de errores.
- Orden importa: `withInterceptors([a, b])` → a corre antes que b.

## Patrones de manejo de errores
1. **En el resource**: `.error()` en el template (lo que usamos).
2. **En el interceptor**: `catchError` de RxJS para lógica global (401 → logout).
3. **En el consumidor**: efecto que reaccione a `error()`.

## Errores comunes
| Error | Causa | Fix |
|---|---|---|
| `No provider for HttpClient` | Falta `provideHttpClient()` | Agregar en `app.config.ts` |
| Request no se relanza | Leíste el signal FUERA de la función | Leer DENTRO de `httpResource(() => ...)` |
| Interceptor no corre | No registrado en `withInterceptors` | Agregar al array |
| Header no llega | Mutaste `req` en vez de `req.clone()` | Siempre clonar |

## Ejercicio
1. Interceptor que agregue `console.time`/`timeEnd` para medir latencias.
2. Botón "Pedir menos" que baje el límite (mínimo 5).
3. Dropdown de usuario (`userId`) y filtrar por él como param.
