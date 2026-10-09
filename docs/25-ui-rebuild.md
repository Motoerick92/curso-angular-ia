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

## Siguiente (al decir "siguiente")
- ui-button, ui-badge, ui-input, ui-skeleton
- Rebuild layout principal (sidebar, topbar)
- Dashboard premium con cards + grid
- Rediseño de cada feature
