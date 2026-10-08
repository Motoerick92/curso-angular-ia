# Módulo 14 — Comunicación entre componentes

## Objetivos
Elegir el patrón correcto según la "distancia" entre componentes.

## Tabla de decisión

| Relación | Patrón | Ejemplo del curso |
|---|---|---|
| Padre → hijo (datos) | `input()` | M7: `[tarea]="tarea"` |
| Hijo → padre (eventos) | `output()` | M7: `(hechaCambiada)="..."` |
| Two-way entre padre-hijo | `model()` | M7: `[(seleccionada)]` |
| Padre invoca método del hijo | `viewChild()` | **M14**: `hijo()?.resetear()` |
| Hermanos / rutas distintas | Servicio + signals | **M14**: `Puente` service |
| Estado global de la app | Servicio singleton | M8: `Tareas`, M9: `Auth` |

## Patrón ①: Servicio puente
```ts
@Injectable({ providedIn: 'root' })
export class Puente {
  private _mensaje = signal<string>('(nada)');
  readonly mensaje = this._mensaje.asReadonly();
  enviar(t: string) { this._mensaje.set(t); }
}
```
Cualquier componente lo inyecta con `inject(Puente)` y lee/escribe el mismo estado.
Sobrevive a cambios de ruta porque es singleton.

## Patrón ②: viewChild()
```ts
export class Comunicacion {
  // Referencia al componente hijo QUE ESTÁ EN ESTE template
  private readonly hijo = viewChild(ContadorHijo);

  resetearDesdeElPadre(): void {
    this.hijo()?.resetear();  // llamada directa al método del hijo
  }
}
```
- `viewChild(Componente)` = signal con la instancia del hijo.
- `?.` porque puede ser `undefined` (hijo dentro de un @if, por ejemplo).
- Tip: usar solo cuando input/output no son prácticos (reset, focus, etc.).

## Patrón ③: Servicios globales (repaso)
- `Auth` (M9) — sesión visible en toda la app desde cualquier ruta.
- `Tareas` (M8) — lista compartida entre `/servicios` y `/tarea/:id`.
- Ambos con `providedIn: 'root'` → misma instancia siempre.

## Errores comunes
| Error | Causa | Fix |
|---|---|---|
| viewChild es undefined | El hijo está dentro de un `@if` false | Usar `?.` o `viewChild.required` |
| Estado se pierde al cambiar de ruta | Servicio declarado en `providers` del componente | Pasar a `providedIn: 'root'` |
| Dos instancias del servicio | Está en providers de módulo/feature y en root | Solo una declaración |
| Hijo que muta input del padre | Sin output — "rompe" flujo | Usar output + padre decide |

## Ejercicio
1. Crear segundo componente que inyecte `Puente` en OTRA ruta → comprobar
   que el mensaje sobrevive a la navegación.
2. `viewChild` con `afterNextRender` para enfocar un input al cargar.
3. Servicio `Tareas` expone mensaje de "última acción" → mostrarlo en el shell.
