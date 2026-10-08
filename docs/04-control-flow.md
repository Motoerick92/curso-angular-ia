# Módulo 4 — Control Flow moderno (@if, @for, @switch)

## Objetivos
Reemplazar las directivas estructurales viejas (`*ngIf`, `*ngFor`, `*ngSwitch`)
por la sintaxis de bloques nativa de Angular 17+.

## Comandos ejecutados
```powershell
ng g c features/control-flow
ng build --configuration development
```

## Los 3 bloques

### @if / @else if / @else
```html
@if (mostrarDetalle()) {
  <div>Visible solo si la condición es verdadera.</div>
} @else {
  <div>Bloque alternativo.</div>
}
```
- El bloque **se crea y destruye** en el DOM (no es `display:none`).
- Soporta `@else if` para cadenas de condiciones.

### @for / @empty
```html
@for (tarea of tareas(); track tarea.id) {
  <li>#{{ $index }} — {{ tarea.titulo }}</li>
} @empty {
  <li>Lista vacía.</li>
}
```
- **`track` es OBLIGATORIO**: Angular lo usa para reconciliación eficiente
  (solo re-renderiza lo que cambió). Usa un id único, no `$index`.
- Variables implícitas: `$index`, `$first`, `$last`, `$even`, `$odd`, `$count`.
- `@empty`: bloque que solo se pinta si la colección está vacía.

### @switch / @case / @default
```html
@switch (pestana()) {
  @case ('lista') { <div>Vista lista</div> }
  @case ('stats') { <div>Vista stats</div> }
  @default { <div>Fallback</div> }
}
```
- Solo un `@case` se renderiza.
- `@default` es opcional (nada se pinta si no coincide y no hay default).

## Bonus del módulo
- **`[class.hecha]="condición"`**: class binding condicional.
- **Inmutabilidad con signals**: `update()` + `map()`/`spread` en vez de
  mutar arrays directamente — dispara re-render correcto.

## ERROR CLÁSICO aprendido en este módulo
Escribir `@` literal en el texto del template rompe el compilador:
```
NG5002: Incomplete block "if". If you meant to write the @ character,
you should use the "&#64;" HTML entity instead.
```
Solución: escapar como `&#64;` → `&#64;if`, `&#64;for`, `&#64;switch`
cuando son TEXTO, no bloque.

## Errores comunes
- Olvidar `track` en `@for` → error de compilación.
- Usar `track $index` → render ineficiente y bugs al reordenar.
- Mezclar sintaxis vieja `*ngIf` con nueva (funciona pero es inconsistente).

## Ejercicio
1. En el `@for`, agregar `@if ($even)` para sombrear filas pares.
2. Crear `@switch` con 4ta pestaña sin `@case` → verificar que `@default` salta.
3. Agregar botón "Restaurar" que reponga la lista tras vaciarla.
