# Módulo 7 — Inputs / Outputs / Model (signal API)

## Objetivos
Comunicar componentes padre ↔ hijo con la API moderna de signals.

## Comandos
```powershell
ng g c features/io                          # padre
ng g c features/io/tarjeta-tarea            # hijo
```

## Las 3 primitivas de comunicación

### 1) `input()` — padre → hijo
```ts
// Hijo
tarea = input.required<Tarea>();  // obligatorio
mostrarBotones = input(true);     // opcional con default
```
```html
<!-- Padre envía -->
<app-tarjeta-tarea [tarea]="tarea" />
```
- **Solo lectura** dentro del hijo — no puede mutarse.
- `input.required` fuerza al padre a pasar el valor (error en compilación si falta).
- Combina con `computed()` para valores derivados del input.

### 2) `output()` — hijo → padre
```ts
// Hijo
hechaCambiada = output<boolean>();
emitir(): void { this.hechaCambiada.emit(true); }
```
```html
<!-- Padre escucha -->
<app-tarjeta-tarea (hechaCambiada)="manejar($event)" />
```
- `$event` = valor emitido por el hijo.
- El padre **decide qué hacer**: el hijo solo notifica.

### 3) `model()` — two-way binding (input + output en uno)
```ts
// Hijo
seleccionada = model(false);
alternar(): void { this.seleccionada.set(!this.seleccionada()); }
```
```html
<!-- Padre con two-way binding [( )] -->
<app-tarjeta-tarea [(seleccionada)]="seleccionado" />
```
- `model()` crea automáticamente: input `seleccionada` + output `seleccionadaChange`.
- Escribible desde ambos lados → el cambio viaja bidireccionalmente.

## Comparativa rápida

| Primitiva | Dirección | Escribible | Caso de uso |
|---|---|---|---|
| `input()` | padre → hijo | ❌ (solo lectura en hijo) | Mostrar/configurar |
| `output()` | hijo → padre | n/a (evento) | Notificar acciones |
| `model()` | ambos | ✅ | Estado compartido (checkbox, valor de input) |

## Arquitectura del módulo
```
Io (padre) — dueño del estado
  └─ tareas = signal<Tarea[]>     ← fuente de verdad
  └─ computed() → completadas
  └─ @for → tarjeta-tarea (hijo)
         ├─ input: [tarea]
         ├─ output: (hechaCambiada), (eliminar)
         └─ two-way: [(seleccionada)] → model()
```
Patrón: **smart/presentational** — padre = smart (maneja estado), hijo = presentational (solo pinta y emite).

## Errores comunes
| Error | Causa | Fix |
|---|---|---|
| `input is required` | Padre no pasó `input.required` | Agregar binding `[tarea]="..."` |
| Hijo no reacciona a cambio | Padre mutó array in-place | `update()` con nueva referencia |
| `[(modelo)]` no funciona | Falta importar el hijo o nombre mismatch | `model()` define `xChange` automático |
| Hijo muta input directamente | `input().set(...)` — no existe | Usar `output()` o `model()` |

## Ejercicio
1. Agregar `output()` `duplicar` que emita el id → padre inserta copia.
2. Input `tema = input<'claro' | 'oscuro'>('claro')` → cambiar estilo de la tarjeta.
3. `model()` en un `<input>` de texto del hijo → padre muestra valor en vivo.
