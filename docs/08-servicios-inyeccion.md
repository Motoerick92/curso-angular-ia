# Módulo 8 — Servicios e Inyección de Dependencias

## Objetivos
- Centralizar estado y lógica en servicios
- Inyectar dependencias con `inject()`
- Compartir estado entre componentes sin input/output

## Comandos
```powershell
ng g s core/services/tareas      # servicio singleton
ng g c features/servicios        # componente que lo consume
```

## ¿Qué es un servicio en Angular?
Clase TypeScript con `@Injectable` que encapsula:
- **Estado compartido** (signals de tareas)
- **Lógica de negocio** (métodos para agregar, eliminar, etc.)
- **Llamadas HTTP** (M10)

```ts
@Injectable({ providedIn: 'root' })  // ← singleton automático
export class Tareas {
  // ...
}
```

## `providedIn: 'root'` = singleton
- Angular crea UNA instancia y la comparte en toda la app.
- Si 5 componentes inyectan `Tareas`, los 5 reciben el MISMO objeto.
- Cambio en un componente → todos ven el nuevo valor en vivo.

## Inyección moderna: `inject()`
```ts
export class Servicios {
  protected readonly tareasSvc = inject(Tareas);
}
```
- Reemplaza el `constructor(private x: X)`.
- Funciona en propiedades de clase, efectos, guards, interceptores.
- Más limpio y testeable.

## Patrón: encapsulación con signals privados
```ts
private _tareas = signal<Tarea[]>([]);       // 🔒 solo el servicio escribe
readonly tareas = this._tareas.asReadonly(); // 👀 todos leen

agregar(t: string): void {
  this._tareas.update(...);  // única puerta de entrada para mutar
}
```
Regla: el componente **nunca** hace `update()`/`set()` directo.
Siempre pasa por métodos del servicio → flujo unidireccional.

## Derivados computados compartidos
```ts
readonly completadas = computed(() => this._tareas().filter(t => t.hecha).length);
```
- Se calculan UNA vez por instante, no por componente.
- Cualquier componente que lo lea recibe el mismo valor cacheado.

## Arquitectura resultante
```
Tareas (servicio singleton)
   │  estado + métodos
   │
   ├─ Servicios  (consume)
   │     └─ TarjetaTarea  (reutilizado de M7)
   │
   └─ (cualquier otro componente que lo inyecte)
```
Cuando el app siga creciendo, este servicio seguirá siendo la fuente de verdad.

## Errores comunes
| Error | Causa | Fix |
|---|---|---|
| `No provider for Tareas` | Sin `providedIn: 'root'` ni provider manual | Asegurar `@Injectable` |
| Estado no persiste entre rutas | Servicio declarado en componente (providers en componente) | Usar `providedIn: 'root'` |
| Componente muta señal | Acceso a `_tareas` (privada) | Solo usar métodos del servicio |
| Cambios no se reflejan | Olvidaste `update()` inmutable | Spread/map, nunca `push()` directo |

## Ejercicio
1. Agregar método `tareasPendientes(): Tarea[]` y mostrar lista separada.
2. Crear segundo componente que consuma este servicio (ej: Sidebar).
3. Persistir en `localStorage` con `effect()` dentro del servicio.
