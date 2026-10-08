# Módulo 6 — Signals: reactividad moderna de Angular

## Objetivos
Entender el sistema reactivo de Angular 16+: granular, eficiente y simple.

## Las 3 primitivas

### 1) `signal()` — estado mutable
```ts
contador = signal(0);          // crear con valor inicial
contador();                    // LEER: se llama como función
contador.set(5);               // ESCRIBIR: valor directo
contador.update(n => n + 1);   // ESCRIBIR: basado en valor actual
```
- Tipo inferido automáticamente: `Signal<number>`.
- Cambiar el signal = notificar SOLO a quien lo leyó (granular).

### 2) `computed()` — valor derivado de solo lectura
```ts
doble = computed(() => this.contador() * 2);
```
- Se recalcula **solo cuando cambia una dependencia** que leyó.
- Derivación LAZY: si nadie lo lee, no se calcula.
- Computeds en cadena: un computed puede leer otros computeds.

### 3) `effect()` — efecto secundario reactivo
```ts
effect(() => {
  console.log(`cambió a: ${this.contador()}`);
});
```
- Se ejecuta una vez al crearse + cada vez que cambia dependencia leída.
- Usos: logs, sync a localStorage, analytics, librerías externas.
- ⚠️ NO usar para modificar otros signals (ciclos). Usa computed/update.

## Regla de oro: inmutabilidad con arrays/objetos
```ts
// ❌ MAL: mutar in-place — Angular puede no detectarlo
this.historial().push(nuevo);

// ✅ BIEN: crear nueva referencia
this.historial.update(h => [...h, nuevo]);
```

## En templates
- Leer: `{{ contador() }}` — siempre con paréntesis.
- Escribir desde template: `@if`, `set()`, `update()` en métodos de clase.
- Angular 22 funciona en modo **zoneless**: sin Zone.js, el change
  detection dispara exactamente donde un signal cambia.

## Errores comunes
| Error | Causa | Fix |
|---|---|---|
| Se muestra `[object Signal]` | Falta `()` al leer | `{{ valor() }}`, no `{{ valor }}` |
| No se actualiza la vista | Mutaste array/objeto en-place | `update()` con nueva referencia |
| Loop infinito | effect escribe signal que lee | No escribir desde effect, usa computed |

## Ejercicio
1. Agregar computed `esMultiploDe5` y mostrar badge cuando sea true.
2. Persistir `contador` en localStorage con `effect()` +
   `localStorage.setItem('contador', ...)`. Cargar al iniciar.
3. Contador de longitud del historial con computed (sin length en template).
