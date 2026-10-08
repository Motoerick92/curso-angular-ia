# Módulo 2 — Componentes standalone, templates e interpolación

## Objetivos
- Entender qué es un componente standalone
- Crear componente con CLI
- Usar interpolación `{{ }}` en templates
- Conectar componente a una ruta

## Comandos ejecutados

```powershell
# Generar componente (crea .ts, .html, .css, .spec.ts)
ng generate component features/inicio   # alias: ng g c features/inicio

ng build --configuration development    # verificar compilación
```

## Teoría

- **Componente standalone**: unidad UI autocontenida. Declara sus
  dependencias en `imports`. Angular 22 ya no usa `NgModule`.
- **Decorador `@Component`**: metadata que liga clase ↔ template ↔ estilos.
  - `selector`: etiqueta HTML (`<app-inicio />`).
  - `imports`: qué otros standalone usa este componente.
- **Interpolación `{{ expresión }}`**: evalúa la expresión TS y la pinta
  como texto. Acepta:
  - Propiedades: `{{ titulo }}`
  - Getters: `{{ progreso }}`
  - Métodos: `{{ saludar() }}`
  - Ternarios: `{{ completado ? 'sí' : 'no' }}`
  - Navegación segura: `{{ usuario?.nombre }}`
- **Change detection**: al mutar propiedades, Angular re-renderiza solo.
- **Rutas**: `app.routes.ts` mapea `path` → componente; `<router-outlet />`
  es el hueco donde se inyecta.

## Archivos del módulo

| Archivo | Rol |
|---|---|
| `src/app/features/inicio/inicio.ts` | Componente: props, getter, métodos |
| `src/app/features/inicio/inicio.html` | 5 ejemplos de interpolación |
| `src/app/app.routes.ts` | Ruta `''` → `Inicio` |
| `src/app/app.html` | Shell mínimo con `<router-outlet />` |

## Reglas de interpolación
- ✅ Expresiones simples: props, métodos, ternarios, operadores.
- ❌ Prohibido: asignaciones (`=`), `++`, `new`, sentencias multilínea.
- La interpolación **escapa HTML siempre** (anti-XSS). Para HTML crudo:
  `[innerHTML]` (con precaución).

## Errores comunes
- Componente no importado en `imports` de quien lo usa → no renderiza.
- Ruta no registrada → pantalla en blanco sin error visible.
- Propiedad/método **privado** usado en template → error de compilación.

## Ejercicio
1. Agregar propiedad `alumno` y mostrarla con `{{ alumno }}`.
2. Crear método `doble(n: number)` y pintar `{{ doble(21) }}`.
3. Agregar botón que incremente `moduloActual` y ver cambio en vivo.
