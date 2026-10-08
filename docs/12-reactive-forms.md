# Módulo 12 — Reactive Forms + validadores custom

## Objetivos
Formularios construidos y validados EN TYPESCRIPT (no en el template).
Más tipados, testeables y potentes para casos complejos.

## Setup
```ts
imports: [ReactiveFormsModule]   // NO FormsModule
```

## Construcción con FormBuilder
```ts
private fb = inject(FormBuilder);

form = this.fb.group({
  usuario: ['', [Validators.required. Validators.minLength(3), noEspacios]],
  email: ['', [Validators.required, Validators.email]],
  edad: [null, [Validators.required, edadMinima(18)]],
  direccion: this.fb.group({   // ← grupo anidado
    calle: ['', Validators.required],
    ciudad: ['', Validators.required],
  }),
});
```
Formato: `[valorInicial, [validadores]]`.

## Template: el HTML solo CONECTA
```html
<form [formGroup]="form">                       <!-- grupo principal -->
  <input formControlName="usuario" />           <!-- control simple -->
  <fieldset formGroupName="direccion">          <!-- grupo anidado -->
    <input formControlName="calle" />
  </fieldset>
</form>
```
No `ngModel`, no `name` — solo `formControlName`.

## Validadores custom

### Función pura (sin parámetros)
```ts
function noEspacios(control: AbstractControl): ValidationErrors | null {
  return control.value.includes(' ')
    ? { espacios: 'No se permiten espacios' }   // ← objeto de error
    : null;                                      // ← null = válido
}
```

### Factory con parámetros
```ts
function edadMinima(minima: number) {
  return (control: AbstractControl) => {
    const edad = Number(control.value);
    return edad >= minima ? null : { edadMinima: { minima, actual: edad } };
  };
}
```
Uso: `edadMinima(18)` dentro del array de validadores.

## Leer errores desde el template
```ts
get usuario() { return this.form.get('usuario')!; }
```
```html
@if (usuario.touched && usuario.errors?.['espacios']) { <small>¡Sin espacios!</small> }
@let err = usuario.errors?.['edadMinima'];
@if (err) { Mínimo {{ err.minima }} (tienes {{ err.actual }}) }
```

## Estados útiles del FormGroup
| Propiedad | Significado |
|---|---|
| `.valid` / `.invalid` | Todos los controles válidos |
| `.touched` / `.dirty` | Interacción del usuario |
| `.value` | Objeto con todos los valores |
| `.markAllAsTouched()` | Mostrar todos los errores a la vez |
| `.reset()` | Volver a valores iniciales |

## Reactive vs Template-Driven
| | Reactive (M12) | Template-driven (M11) |
|---|---|---|
| Validadores | Funciones en TS | Atributos HTML |
| Testing | Fácil (TS puro) | Difícil |
| Dinamismo | Agregar/quitar controles | Complicado |
| Recomendado | Casi siempre en producción | Forms muy simples |

## Errores comunes
| Error | Causa | Fix |
|---|---|---|
| `Can't bind to 'formGroup'` | Falta `ReactiveFormsModule` | Importarlo |
| Validador nunca corre | Lo declaraste como `noEspacios()` en vez de `noEspacios` | Sin paréntesis: función, no llamada |
| `form.value` siempre null | Olvidaste `[formGroup]="form"` en el `<form>` | Conectar en template |
| Errores no aparecen al submit | Solo tocó uno | `form.markAllAsTouched()` antes |

## Ejercicio
1. Validador custom `passwordFuerte`: mínimo 8 chars, al menos 1 número.
2. Dos passwords: `confirmar` debe coincidir con `password` (validador de grupo).
3. Control deshabilitado: `{ value: '', disabled: true }` y observar que no entra en `.value` (usa `.getRawValue()`).
