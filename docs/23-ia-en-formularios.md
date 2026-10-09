# Módulo 23 — IA aplicada a formularios

## Objetivos
Usar el servicio IA de M21 para autocompletar campos de un reactive form.

## Patrón: prompt estructurado → parseo → patchValue

### 1) Método genérico en el servicio (M21 extendido)
```ts
async generarTexto(instruccion: string, contenido: string): Promise<string> {
  // POST sin tocar el historial del chat — llamada "aislada"
  // system: instrucción de formato
  // user: contenido a procesar
}
```
Devuelve texto crudo; no ensucia el chat de M21/M22.

### 2) Pedir salida JSON estricta
```ts
const system = [
  'Responde SOLO con JSON válido, sin markdown ni backticks.',
  'Formato exacto: {"descripcion":"...","prioridad":"alta"|"media"|"baja"}',
].join(' ');
```

### 3) Parseo defensivo
```ts
// La IA a veces envuelve con ```json...``` — regex extrae el objeto
const match = crudo.match(/\{[\s\S]*\}/);
if (!match) throw new Error('La IA no devolvió JSON');
const sugerido = JSON.parse(match[0]);

// Validar enums cerrados antes de aplicar
const prioridad = ['alta','media','baja'].includes(sugerido.prioridad)
  ? sugerido.prioridad : 'media';
```

### 4) Rellenar el form sin destruir lo del usuario
```ts
this.form.patchValue({ descripcion, prioridad });  // patch = parcial
```
`patchValue` solo toca los campos que le pasas. `setValue` exigiría todos.

## Flujo completo del demo
```
Usuario escribe título → clic "🪄 Generar" → generarTexto()
   → IA devuelve JSON → regex + JSON.parse
   → patchValue rellena descripción y prioridad
   → usuario revisa/edita → "Guardar" → entra al TareasStore de M16
```

## Bonus de tests (Vitest, no Jasmine)
```ts
import { vi } from 'vitest';
vi.spyOn(ia, 'generarTexto').mockResolvedValue('{"descripcion":"X","prioridad":"alta"}');
```
Error real capturado: `spyOn(...).and.resolveTo` es Jasmine — Chrome ya no
es el runner: Angular CLI 22 usa Vitest → `vi.spyOn` + `mockResolvedValue`.

Y el ya conocido: `routerLink` en template de test → `provideRouter([])`.

## Errores comunes
| Error | Causa | Fix |
|---|---|---|
| `NG5002 Unexpected character` | Llaves literales `{ }` en texto del template | Escapar `&#123;` `&#125;` |
| JSON.parse throw | IA puso markdown o texto alrededor | Regex de extracción `\{[\s\S]*\}` |
| Prioridad inválida | IA respondió "urgente" | Validar contra lista cerrada |
| `setValue` borra el título | Usaste setValue con objeto parcial | Usar `patchValue` |

## Ejercicio
1. Botón "Mejorar título" que sugiera 3 títulos alternativos.
2. Generar también checklist (array de strings) y mostrarlo como lista editable.
3. Debounce: si el usuario para de escribir 1s, auto-sugerir descripción.
