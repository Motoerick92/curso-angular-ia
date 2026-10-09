# Bonus — Reconstrucción UI/UX con Tailwind v4

## PASO 0 — Arreglar blanco y negro (Tailwind)

### Comandos ejecutados
```powershell
npm install -D tailwindcss @tailwindcss/postcss postcss --legacy-peer-deps
```

### PostCSS config (Angular 22 lo detecta solo)
`.postcssrc.json` (OJO: JSON puro, **sin comentarios** — ese fue un bug real):
```json
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```

### Tailwind v4 = CSS-first
- **NO hay `tailwind.config.js`**: la config vive en `@theme` dentro del CSS.
- Se activa con `@import "tailwindcss"` en `styles.css`.

### `src/styles.css`
```css
@import url('...google fonts Outfit+Inter...');   /* primero siempre */
@import "tailwindcss";
@import "./app/shared/styles/theme.css";
```
Regla CSS: todos los `@import` van antes que cualquier otra regla
(error real capturado: `All "@import" rules must come first`).

### Verificación del Paso 0
`ng build` → `dist/.../styles.css` pasó de **95 bytes a 14 KB**
⇒ Tailwind procesando bundles. Tests: 74/74 verdes.

---

## PASO 1 — Design system (`src/app/shared/styles/theme.css`)

### Paleta del curso (nada de blanco/negro puro)
- **Indigo 600** `#4f46e5` → primario
- **Fuchsia 500** `#d946ef` → acento
- **Slate 900** `#0f172a` → fondo app
- CSS variables todo: `--primary`, `--accent`, `--bg-app`, `--bg-card`, `--text`, `--radius`, sombras suaves.

### Mapeo a Tailwind v4
```css
@theme inline {
  --color-primary: var(--primary);
  --color-accent:  var(--accent);
  /* ...expone clases: bg-primary, text-accent, etc */
}
```

### Base global en theme.css
- Fondo: gradientes radiales indigo/violeta, `background-attachment: fixed`
- `color-scheme: dark` (inputs nativos oscuros)
- Scrollbar custom slate
- `::selection` fuchsia
- `:focus-visible` anillo accesible

---

## UI KIT — pieza 1: `ui-card`
`src/app/shared/components/ui/ui-card.ts`
- Standalone + OnPush
- Slots: `[titulo]`, `[etiqueta]` + contenido proyectado con `<ng-content>`
- Variantes: `base`, `elevada`, `plana`
- Hover: `-translate-y-1` + sombra más fuerte (`transition-all 200ms`)

Uso:
```html
<ui-card titulo="Mi título" etiqueta="Nuevo">
  <p>Contenido libre</p>
</ui-card>
```

---

## Bugs reales de este rebuild (documentados)
| Error | Causa | Fix |
|---|---|---|
| `JSON.parse position 4` en PostCSS | `.postcssrc.json` con comentarios | JSON puro sin comentarios |
| `@import` warning | Fonts import debajo de tailwind | Imports primero siempre |
| UI en blanco/negro antes | No existía Tailwind ni tema | Paso 0 + 1 completos |

## PASO 3 — Layout premium (app.ts/html/css)
- Sidebar: gradiente slate, iconos emoji, activo con `bg-primary` + sombra
- Topbar: sticky + `backdrop-blur`, buscador RxJS (patrón M13) que filtra el sidebar,
  avatar con gradiente e inicial del usuario
- Main: `max-w-7xl` centrado sobre gradientes radiales
- Lista de 21 módulos reactiva: `computed()` filtra por el texto del buscador

## PASO 4 — Rebuild de features sin tocar lógica
- **Dashboard**: 4 stat-cards con gradiente, barra de progreso animada, grid 2 columnas
  (tareas | coach IA), skeleton durante resumen, empty state con emoji 🔒
- **Inicio**: hero con texto degradado (`bg-clip-text text-transparent`),
  badge superior, CTA primary + secondary, 3 feature cards

### BUG REAL capturado (valioso): zoneless vs propiedades planas
```ts
// ANTES (M2, pre-zoneless):
completado = false;
alternarCompletado() { this.completado = !this.completado; }
```
Síntoma: en tests (y con estado imperativo fuera de eventos), el cambio
NO se refleja en el DOM. Angular 22 es **zoneless**: solo re-renderiza con
signals, eventos o marcado manual.

Fix idiomático:
```ts
completado = signal(false);
alternarCompletado() { this.completado.update((v) => !v); }
```
Y en template: `{{ completado() }}` / `@if (completado())`.

Lección para el curso: en zoneless, **todo estado reactivo debe ser signal**.
El compilador de templates no falla con props planas — pero la app deja de
ser reactiva silenciosamente. Este bug apareció en los tests porque allí
llamamos el método imperativamente sin un evento DOM que dispare CD.

## PASO 4 — Rebuild TODAS las features (completado en batches)
| Batch | Páginas | Notas |
|---|---|---|
| 1 | dashboard (premium), inicio (hero) | `31e81dd` |
| 2 | store, servicios, http, rxjs, async-pipe, optimizacion | `3718c5b` |
| 3 | form-template, form-reactivo, pipes-directivas, control-flow, comunicacion, directivas-custom, ia chat, ia-form, admin, tarea-detalle | `3f9eb19` |

Bugs reales capturados en el rebuild:
- Props planas con zoneless no re-renderizan en tests (fix M25: signal en inicio).
- `@for`/`@else`/llaves `{ }` literales en texto rompen el parser de template → `&#64;` / `&#123;` `&#125;`.
- Specs con selectores viejos (`.input-chat`) rompen al rediseñar → selectors por placeholder/texto.

## Nota para el video
Todo el Paso 4 mantuvo la LÓGICA intacta (signals, services, store, formularios).
Solo cambió HTML + clases Tailwind + imports de piezas del UI kit en los .ts.

## Siguiente (al decir "siguiente")
- ui-button, ui-badge, ui-input, ui-skeleton
- Rebuild layout principal (sidebar, topbar)
- Dashboard premium con cards + grid
- Rediseño de cada feature
