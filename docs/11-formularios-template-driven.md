# Módulo 11 — Formularios Template-Driven

## Objetivos
Formularios donde la lógica de validación vive en el HTML,
con `ngModel` y `ngForm`.

## Requisito previo
```ts
imports: [FormsModule]   // obligatorio en el componente
```

## Piezas clave

### ngModel (two-way binding en inputs)
```html
<input name="nombre" [(ngModel)]="modelo().nombre" required minlength="3" />
```
- `name` es OBLIGATORIO: es la clave que usa `ngForm`.
- `[(ngModel)]` muta el objeto del componente en cada tecla.

### ngForm (referencia al form completo)
```html
<form #formulario="ngForm" (ngSubmit)="alEnviar()">
  <button [disabled]="formulario.invalid">Enviar</button>
</form>
```
Estados disponibles: `valid`, `invalid`, `touched`, `dirty`, `submitted`, `pristine`.

### Validaciones nativas (HTML5 que Angular entiende)
| Atributo | Error detectado |
|---|---|
| `required` | `errors.required` |
| `minlength="3"` | `errors.minlength` |
| `type="email" email` | `errors.email` |
| `type="number" min="18"` | `errors.min` |
| `max="99"` | `errors.max` |

### Mostrar errores en UI
```html
<input name="nombre" #nombre="ngModel" [(ngModel)]="modelo().nombre" required />
@if (nombre.touched && nombre.errors?.['required']) {
  <small class="error">Campo obligatorio.</small>
}
```
- `#nombre="ngModel"` crea referencia al control local.
- `.touched` evita mostrar errores antes de que el usuario interactúe.

### Clases CSS automáticas que Angular agrega
| Clase | Significado |
|---|---|
| `ng-valid` / `ng-invalid` | Estado de validación |
| `ng-touched` / `ng-untouched` | Usuario visitó el campo |
| `ng-dirty` / `ng-pristine` | Valor modificado o no |

```css
input.ng-touched.ng-invalid { border-color: red; }
input.ng-valid { border-color: green; }
```

### resetForm
`formulario.resetForm()` reinicia valores Y estados (touched/dirty).
Mejor que solo vaciar el modelo.

## Template-driven vs Reactive (M12)
| | Template-driven | Reactive |
|---|---|---|
| Lógica en | HTML | Clase TS |
| Escala | Forms simples | Forms complejos/dinámicos |
| Testeo | Más difícil | Directo en TS |
| Validadores custom | Directivas | Funciones TS |

## Errores comunes
| Error | Causa | Fix |
|---|---|---|
| `Can't bind to 'ngModel'` | Falta `FormsModule` en imports | Importarlo |
| Errores no aparecen | Campo no tiene `name` | Todo ngModel requiere name |
| Submit dispara recarga | Falta `novalidate` en form | Agregarlo + manejar en ngSubmit |
| reset limpia pero estados siguen sucios | Solo vaciaste el modelo | Usar `formulario.resetForm()` |

## Ejercicio
1. Agregar campo "teléfono" con `pattern="[0-9]{9}"`.
2. Agregar dirección con `minlength="10"`.
3. Botón "Pre-llenar datos demo" que llene el modelo con valores de prueba.
