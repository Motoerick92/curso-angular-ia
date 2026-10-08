# Módulo 5 — Directivas y Pipes (built-in + custom)

## Objetivos
- Transformar datos en templates con pipes
- Modificar comportamiento de elementos con directivas
- Crear versiones custom de ambas

## Comandos ejecutados
```powershell
ng g c features/pipes-directivas          # componente demo
ng g pipe shared/pipes/truncate           # pipe custom
ng g directive shared/directives/resaltar # directiva custom
```

## PIPES = transformación de datos para la vista
Sintaxis: `{{ valor | pipe:arg1:arg2 }}`

### Built-in usados
| Pipe | Sintaxis | Resultado |
|---|---|---|
| `uppercase` | `{{ txt \| uppercase }}` | MAYÚSCULAS |
| `titlecase` | `{{ txt \| titlecase }}` | Primera Letra Mayúscula |
| `currency` | `{{ n \| currency:'USD' }}` | $1,299.50 |
| `date` | `{{ fecha \| date:'short' }}` | formato localizado |
| `slice` | `{{ arr \| slice:0:3 }}` | sub-array |
| `json` | `{{ obj \| json }}` | JSON (debug) |

Otros útiles: `lowercase`, `percent`, `number`, `async` (M15).

### Pipe custom
```ts
@Pipe({ name: 'truncate' })
export class TruncatePipe implements PipeTransform {
  transform(valor: string, largo = 25): string {
    return valor.length <= largo ? valor : valor.slice(0, largo) + '…';
  }
}
```
```html
{{ textoLargo() | truncate }}     <!-- default 25 -->
{{ textoLargo() | truncate:40 }}  <!-- con argumento -->
```
- `pure: true` (default) = eficiente, solo reevalúa si cambia la entrada.
- Para pipes que dependen de estado externo: `pure: false` (cuidado: costoso).

## DIRECTIVAS = comportamiento de elementos

### Built-in estructurales
`@if @for @switch` (M4) son las modernas; las viejas `*ngIf/*ngFor` siguen
existiendo pero son legacy.

### Built-in de atributo
```html
<!-- ngClass: clases condicionales -->
<p [ngClass]="{ 'verde': precio() > 1000, 'grande': true }">
<!-- ngStyle: estilos inline dinámicos -->
<p [ngStyle]="{ 'font-size.px': 20 }">
```

### Directiva custom de atributo
```ts
@Directive({ selector: '[appResaltar]' })
export class Resaltar {
  color = input('#fff740');              // input con signals
  constructor(private el: ElementRef<HTMLElement>) {}

  @HostListener('mouseenter')
  alEntrar() { this.el.nativeElement.style.backgroundColor = this.color(); }

  @HostListener('mouseleave')
  alSalir()  { this.el.nativeElement.style.backgroundColor = 'transparent'; }
}
```
```html
<p appResaltar>Default</p>
<p appResaltar color="#a6e3a1">Personalizado</p>
```
- `ElementRef` = acceso al elemento DOM nativo.
- `@HostListener` = escuchar eventos del elemento sin `(click)` en template.
- Como los componentes, se importan en `imports: []` (standalone).

## Errores comunes
- Olvidar importar el pipe/directiva en `imports` →
  `The pipe 'truncate' could not be found`.
- `pure: false` en pipes complejos → lag de performance.
- Multiplicidad: pipes encadenables: `{{ txt | uppercase | truncate:10 }}`,
  se evalúan de izquierda a derecha.

## Ejercicio
1. Pipe `reverse` que invierta un string.
2. Pipe `pluralizar`: `('tarea', 3) → '3 tareas'`.
3. Directiva `appCopiar`: al hacer click copia el texto del elemento
   al portapapeles con `navigator.clipboard`.
