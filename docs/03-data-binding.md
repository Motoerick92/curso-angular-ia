# Módulo 3 — Data Binding

## Objetivos
Dominar las 4 formas en que clase TypeScript y template HTML se comunican.

## Los 4 tipos de binding

| Tipo | Sintaxis | Dirección | Uso típico |
|---|---|---|---|
| Interpolación | `{{ expresión }}` | clase → template (texto) | Mostrar valores |
| Property binding | `[prop]="exp"` | clase → template (DOM) | `disabled`, `src`, `value` |
| Event binding | `(evento)="fn()"` | template → clase | `click`, `input`, `submit` |
| Two-way binding | `[(ngModel)]` | bidireccional | Inputs de formularios |

Comando:
```powershell
ng g c features/binding
```

## Código clave

### Property binding
```html
<!-- El DOM recibe el valor del signal -->
<input [value]="nombre()" [disabled]="botonDeshabilitado()" />
<img [src]="urlImagen()" />
```

### Event binding
```html
<!-- El clic ejecuta el método de la clase -->
<button (click)="contarClic()">Clic aquí</button>
```
```ts
contarClic(): void {
  this.clics.update((n) => n + 1); // signals: update() muta seguro
}
```

### Two-way binding con signals (patrón Angular 22)
```html
<!-- ngModel + ngModelChange = [(ngModel)] descompuesto -->
<input [ngModel]="nombre()" (ngModelChange)="nombre.set($event)" />
```
- `$event` = valor emitido por el evento.
- Requiere importar `FormsModule` en el componente.
- Con signals se usa el patrón separado `[ngModel]` + `(ngModelChange)`
  para control total del set.

## Navegación SPA (bonus del módulo)
```html
<nav>
  <a routerLink="/" routerLinkActive="activo">Inicio</a>
  <a routerLink="/binding" routerLinkActive="activo">Binding</a>
</nav>
```
- `routerLink`: navega sin recargar página.
- `routerLinkActive`: agrega clase CSS (`.activo` en `app.css`) a la ruta actual.
- Importar `RouterLink` y `RouterLinkActive` en el componente.

## Errores comunes
- Usar `[(ngModel)]` sin importar `FormsModule` →
  `Can't bind to 'ngModel' since it isn't a known property`.
- Olvidar los paréntesis en signals: `nombre` (función) vs `nombre()` (valor).
- Usar `#` en routerLink (`routerLink="#/ruta"`) — SPA moderna no usa hash por defecto.

## Ejercicio
1. Input adicional "apellido" con two-way → mostrar nombre completo.
2. Botón que resetee `clics` a 0.
3. Deshabilitar input de nombre cuando clics > 10.
