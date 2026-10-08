# Módulo 9 — Routing: params, lazy loading y guards

## Objetivos
- Rutas con parámetros (`:id`)
- Lazy loading con `loadComponent`
- Proteger rutas con guards funcionales

## Piezas del módulo

### 1) Parámetros de ruta
```ts
// app.routes.ts
{ path: 'tarea/:id', loadComponent: () => ... }
```
```ts
// Componente destino (gracias a withComponentInputBinding)
id = input.required<string>();   // ← el :id de la URL llega como input
```
```html
<!-- Navegar con parámetro -->
<a [routerLink]="['/tarea', tarea.id]">Ver detalle</a>
```
`withComponentInputBinding` (en `app.config.ts`) convierte params de URL
en inputs del componente automáticamente.

### 2) Lazy loading
```ts
{
  path: 'admin',
  loadComponent: () => import('./features/admin/admin').then(m => m.Admin),
}
```
- El componente NO va en el bundle inicial.
- Webpack/Vite genera chunk separado: `chunk-XXX.js | admin | 2.51 kB`.
- Se descarga solo al visitar la ruta → app inicial más liviana.

### 3) Guards funcionales
```ts
export const authGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  if (auth.logueado()) return true;           // deja pasar
  return router.createUrlTree(['/']);          // redirige
};
```
```ts
{ path: 'admin', ..., canActivate: [authGuard] }
```
- `CanActivateFn` = función moderna (antes eran clases).
- `inject()` disponible dentro porque corre en contexto de inyección.
- Retornar `UrlTree` = redirección sin side effects.

### 4) Ruta wildcard
```ts
{ path: '**', redirectTo: '' }   // URL desconocida → home (siempre AL FINAL)
```

## Servicio Auth (soporte del módulo)
```ts
@Injectable({ providedIn: 'root' })
export class Auth {
  private _usuario = signal<string | null>(null);
  readonly logueado = computed(() => this._usuario() !== null);
  logIn(n: string) { this._usuario.set(n); }
  logOut() { this._usuario.set(null); }
}
```
Login/logout visible en el shell (`app.html`) — patrón que seguiremos
usando al conectar backend real.

## Probar en video
1. `/servicios` → "Ver detalle" → URL cambia a `/tarea/1`.
2. Sin login: clic en "Admin 🔒" → rebota a home (guard).
3. Escribir nombre → Entrar → "Admin 🔒" ahora sí abre.
4. F12 → Network → al entrar a /admin se descarga `chunk-*.js` extra (lazy).

## Errores comunes
| Error | Causa | Fix |
|---|---|---|
| Param `undefined` en componente | Falta `withComponentInputBinding` | Agregar en `provideRouter` |
| Guard nunca corre | `canActivate` mal escrito o ruta sin guard | Revisar array `canActivate: []` |
| Wildcard captura rutas válidas | `**` declarado ANTES de las otras | Dejarlo SIEMPRE al final |
| Lazy chunk no aparece | `component:` en vez de `loadComponent` | Usar `import()` dinámico |

## Ejercicio
1. Guard `rolesGuard` que además exija `auth.usuario() === 'admin'`.
2. Ruta `/tarea/:id` con botón "siguiente tarea" usando `Router.navigate`.
3. Breadcrumb en el detalle mostrando el id actual.
