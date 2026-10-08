# Módulo 18 — Directivas estructurales custom

## Objetivos
Entender cómo funcionan `*ngIf`/`*ngFor` por dentro y crear las nuestras.

## Los 3 ingredientes
| Pieza | Rol |
|---|---|
| `TemplateRef` | La plantilla capturada por el asterisco |
| `ViewContainerRef` | Ancla del DOM donde insertar copias |
| `effect()` | Re-render reactivo cuando cambia el input |

## *appRepetir — repetir plantilla N veces
```ts
@Directive({ selector: '[appRepetir]' })
export class Repetir {
  veces = input.required<number>({ alias: 'appRepetir' }); // nombre = uso

  constructor(
    private tpl: TemplateRef<unknown>,
    private vcr: ViewContainerRef,
  ) {
    effect(() => {
      this.vcr.clear();
      for (let i = 0; i < this.veces(); i++) {
        this.vcr.createEmbeddedView(this.tpl, { $implicit: i });
      }
    });
  }
}
```
Uso:
```html
<p *appRepetir="repeticiones(); let i = $implicit">Copia #{{ i }}</p>
```
- `let i = $implicit` toma el índice del contexto embebido.
- El `alias` del input DEBE coincidir con el selector.

## *appSiRol — visibilidad por rol
```ts
@Directive({ selector: '[appSiRol]' })
export class SiRol {
  private auth = inject(Auth);                 // reutiliza M9
  rolesPermitidos = input.required<string[]>({ alias: 'appSiRol' });

  constructor(tpl: TemplateRef<unknown>, vcr: ViewContainerRef) {
    effect(() => {
      const usuario = this.auth.usuario();
      const mostrar = usuario !== null && this.rolesPermitidos().includes(usuario);
      vcr.clear();
      if (mostrar) vcr.createEmbeddedView(this.tpl);
    });
  }
}
```
Uso:
```html
<div *appSiRol="['admin', 'erick']">Contenido restringido</div>
```
Patrón: directiva decide visibilidad, servicio decide el "quién".

## Cómo el asterisco se descompone internamente
```html
<p *appRepetir="3; let i = $implicit">Hola</p>
```
Angular lo traduce (conceptual) a:
```html
<ng-template [appRepetir]="3" let-i="$implicit">
  <p>Hola</p>
</ng-template>
```
- `ng-template` por sí solo no se renderiza.
- La directiva decide cuándo y cuántas veces mostrarlo.

## Errores comunes
| Error | Causa | Fix |
|---|---|---|
| `Can't bind to 'appRepetir'` | Input sin alias correcto o sin importar | Alias debe = selector |
| Bucle infinito / render loco | Escribiste signal dentro de effect sin leerlo | Leer SOLO dependencias; clear luego create |
| No se ve nada | "Nunca se crearon vistas" | Llamar `createEmbeddedView` siempre al menos una vez |
| `{` rompe el template | Carácter literal en texto | Escapar como `&#123;` `&#125;` |

## Ejercicio
1. `*appCada(segundos)` rendering condicional por tiempo con setInterval.
2. `*appSiNo` = inversa de ngIf — ejercicio trivial para memorizar el patrón.
3. Directiva `*appSoloDesktop` que muestra solo si `innerWidth > 768px`.
