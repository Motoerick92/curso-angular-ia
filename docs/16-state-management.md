# Módulo 16 — State management con store de signals

## Objetivos
Evolucionar el servicio de M8 a un patrón "store" listo para escalar.

## Diferencias vs servicio plano (M8)
| Servicio plano (M8) | Store (M16) |
|---|---|
| Array signal como estado | Estado desnormalizado `{ entidades, orden, filtro }` |
| Métodos genéricos (`alternar`) | Acciones con intención de negocio |
| Computeds sueltos | Selectores tipados reutilizables |
| Sin filtro / buscador | Filtro reactivo en el estado |

## Estado desnormalizado
```ts
interface EstadoTareas {
  entidades: Record<number, Tarea>;  // acceso O(1) por id
  orden: number[];                   // orden de visualización
  filtro: 'todas' | 'pendientes' | 'hechas';
}
```
**Por qué:**
- Actualizar un ítem no requiere recorrer el array (O(1) por id).
- Reordenar no toca los datos (solo el array `orden`).
- Filtros se derivan, no se duplican.

## Acciones (única puerta de mutación)
```ts
agregar(titulo)  → valida, calcula id, update inmutable
alternar(id)     → remapea solo la clave del id
eliminar(id)     → destructuring para quitar clave + orden
establecerFiltro(f) → cambio puntual
```
Cada acción hace `update()` con spread → nueva referencia → computed reactiva.

## Selectores = computeds compartidos
```ts
lista        → array plano derivado de entidades+orden
visibles     → aplica filtro activo
total        → orden.length
completadas  → filter hecha
```
Un solo lugar donde se calcula; todos los componentes leen lo mismo.
Re-render granular: solo lo que cambió.

## Uso desde componente
```ts
protected readonly store = inject(TareasStore);

// Solo lectura:
store.visibles()
store.filtroActual()

// Mutación SOLO vía acciones:
store.agregar('texto')
store.alternar(3)
store.eliminar(3)
store.establecerFiltro('pendientes')
```

## Cuándo pasar a librería real (NgRx SignalStore, etc.)
- Necesitas undo/redo, time-travel, middleware.
- Estado anidado complejo con side effects en cadena.
- Equipos grandes que necesitan convenciones fuertes.
Para este curso y apps medianas → store con signals caseros basta.

## Errores comunes
| Error | Causa | Fix |
|---|---|---|
| Filtro no actualiza lista | Filtro fuera del estado → no dispara computed | Meter filtro dentro del signal |
| Tarea duplicada al agregar | Update hizo push al array en lugar de otro objeto | Siempre spread en entidades+orden |
| Selector recalcula todo el array | Acceso por find() en loop | Usar entidades por id |
| Componente muta store | Expusiste signal privado | `asReadonly()` + acciones claras |

## Ejercicio
1. Acción `editarTitulo(id, nuevoTitulo)` con validación.
2. Selector `porcentajeCompletado` y barra de progreso en el template.
3. Acción `cargarDesdeLocalStorage()` + `effect` que guarde automáticamente.
