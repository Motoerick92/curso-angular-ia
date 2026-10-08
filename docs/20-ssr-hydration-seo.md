# Módulo 20 — SSR, hydration y SEO

## Objetivos
- Agregar SSR a un proyecto cliente-puro
- Entender modos de render (estático vs SSR por request)
- SEO con Title/Meta por ruta

## Instalación (la manera realista)
```powershell
ng add @angular/ssr --skip-confirmation
# Si npm choca por peers (caso real aquí):
$env:npm_config_legacy_peer_deps='true'
ng generate @angular/ssr:ng-add
```
Genera: `main.server.ts`, `server.ts`, `app.config.server.ts`, `app.routes.server.ts`
y actualiza `angular.json` + `app.config.ts`.

## Los 3 modos de render

| Modo | RenderMode | Cuándo se genera HTML | Uso ideal |
|---|---|---|---|
| CSR (cliente) | — | Solo en navegador | Apps internas |
| Prerender | `Prerender` | En build (estático) | Páginas públicas sin params |
| SSR | `Server` | En cada request | Params dinámicos, datos frescos |

## Configuración por ruta
```ts
// app.routes.server.ts
export const serverRoutes: ServerRoute[] = [
  { path: 'tarea/:id', renderMode: RenderMode.Server },  // params → SSR
  { path: 'admin',      renderMode: RenderMode.Server },  // depende de sesión
  { path: '**',         renderMode: RenderMode.Prerender }, // resto estático
];
```

### Error que evitamos
```
The 'tarea/:id' route uses prerendering and includes parameters,
but 'getPrerenderParams' is missing.
```
Causa: default todo a Prerender no sirve para `:id`. Fix: modo Server
para esa ruta (o definir `getPrerenderParams` con lista de ids).

## Qué verifica que SSR funciona
1. `ng build` → prerendered N static routes + chunks server-side.
2. `npm run serve:ssr:curso-angular-ia` → levanta Node server.
3. Abre la página → **View Source** muestra HTML ya poblado
   (no vacío como en CSR).
4. Hydration: Angular se "adhiere" al HTML del server sin re-render — si
   hay diferencias, verías flash o warnings de mismatch.

## SEO con Title y Meta
```ts
private title = inject(Title);
private meta  = inject(Meta);

title.setTitle('Inicio | Curso Angular 22 + IA');
meta.updateTag({ name: 'description', content: '...' });
meta.updateTag({ property: 'og:title', content: '...' });   // OpenGraph (compartir)
```
- Con SSR: el `<title>` y metas vienen en el HTML → crawlers los leen.
- Sin SSR: los reciben tras JS (peor para algunos bots).

## Errores comunes
| Error | Causa | Fix |
|---|---|---|
| Conflicto npm en peers | CLI y paquetes ligeramente desalineados | `npm_config_legacy_peer_deps=true` |
| Prerender falla con :param | Ruta parametrizada en modo estático | Cambiar a `RenderMode.Server` |
| `document is not defined` en server | Código browser-only en constructor | Envolver en `afterNextRender` o `isPlatformBrowser` |
| Hydration mismatch | HTML del server ≠ primer render cliente | Mismo estado inicial en ambos lados |

## Ejercicio
1. Poner `title.setTitle()` también en `/binding` y `/signals`.
2. Agregar meta `og:description` compartido en todos los features
   (reutilizar: crear directiva `appSeo` que reciba config).
3. Prerenderizar `/tarea/1` y `/tarea/2` con `getPrerenderParams`.
