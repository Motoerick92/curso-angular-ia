# Módulo 17 — Change detection OnPush y optimización

## Objetivos
Render granular: que la app no se re-dibuje entera al cambiar una cosa.

## Estrategias usadas (en orden de impacto)

### 1) `ChangeDetectionStrategy.OnPush` en componentes hijos
```ts
@Component({
  selector: 'app-item-pesado',
  changeDetection: ChangeDetectionStrategy.OnPush,
  ...
})
export class ItemPesado {
  dato = input.required<{ id: number; titulo: string }>();
}
```
Angular solo reevalúa el template de este componente cuando:
- cambia uno de sus `input()` (referencia nueva o signal nuevo)
- ocurre un evento DOM dentro del propio componente
- un signal que leyó cambió

El tick global del padre NO lo toca si su `dato` no cambió.

### 2) `track` en `@for` — reconciliación estable
```html
@for (item of items(); track item.id) { ... }
```
- Angular identifica cada fila por `id` y solo mueve lo que cambió.
- Sin `track` se re-renderiza todo el array (o da error según versión).
- Regla: **nunca** uses `$index` como track en listas mutables.

### 3) Inmutabilidad = nueva referencia solo para lo que cambió
```ts
this.items.update((arr) =>
  arr.map((it) => it.id === objetivo.id ? { ...it, titulo: 'nuevo' } : it),
);
```
- Filas intactas = misma referencia → OnPush las salta.
- Fila editada = nueva referencia → solo ella re-renderiza.

### 4) `computed()` para derivaciones
```ts
total = computed(() => this.items().length);
```
- Angular memoriza el resultado y solo recalcula si cambia la dependencia.
- Evita `{ { items().length } }` evaluado en cada ciclo.

## Técnica de debug: contador de renders
En `item-pesado.html`:
```html
<span>{{ registrarRender() }}</span>
```
y en el hijo:
```ts
registrarRender(): string {
  this.rendersInternos.update((n) => n + 1);
  return `renders: ${this.rendersInternos()}`;
}
```
- **Funciona porque el template llama método → detección en cada evaluación.**
- Signal interno sube SOLO si Angular evaluó ese template.
- Demo en vivo: los ítems sin cambios quedan quietos, el renombrado sube.

## Medición real
- F12 → Performance → record → clic en "Renombrar" → ver frame
  duración y qué se pinta.
- Angular DevTools (extensión de Chrome) para ver árbol de componentes.

## Errores comunes
| Error | Causa | Fix |
|---|---|---|
| Hijos no actualizan | Mutaste objeto in-place con OnPush | Spread para nueva referencia |
| Todo re-renderiza igual | Sin `track` en @for | Agregar track por id |
| Computeds se recalculan siempre | Leyeron un signal que cambia cada tick | Derivar solo de dependencias estables |
| Set interval deja leak | Falta cleanup | `DestroyRef.onDestroy(() => clearInterval(...))` |

## Ejercicio
1. Modo "lento": agrega `heavy()` que haga un cálculo caro y ponlo detrás
   de un computed para que solo corra al cambiar el input.
2. Contador global de renders: log de cuántos templates se evaluaron
   por tick (suma de `rendersInternos` de todos los items).
3. Cambiar a mutación in-place en `renombrarAleatorio` y ver cómo
   OnPush deja de actualizar visualmente (bug clásico).
