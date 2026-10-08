# Módulo 19 — Testing unitario en Angular 22

## Objetivos
- Escribir tests reales (no solo "should create")
- Cubrir: pipe puro, servicio, store, componente, directivas

## Runner
Angular CLI 22 usa **Vitest** por defecto (previamente Karma/Jasmine).

```powershell
ng test                  # modo watch (desarrollo)
ng test --watch=false    # una pasada (CI)
```

## Los 5 niveles de test del módulo

### 1) Pipe puro — sin TestBed
```ts
describe('TruncatePipe', () => {
  const pipe = new TruncatePipe();          // clase normal
  it('corta con default 25', () => {
    expect(pipe.transform('a'.repeat(30))).toBe('a'.repeat(25) + '…');
  });
});
```
Sin inyección de dependencias → `new` directo, cero boilerplate.

### 2) Servicio con `TestBed.inject`
```ts
TestBed.configureTestingModule({});
const servicio = TestBed.inject(Tareas);    // singleton de prueba
servicio.agregar('Nueva');
expect(servicio.total()).toBe(3);
```

### 3) Componente — fixture + DOM
```ts
const fixture = TestBed.createComponent(Inicio);
fixture.detectChanges();                    // dispara render + bindings

const boton = fixture.nativeElement.querySelector('button');
boton.click();                              // evento real
fixture.detectChanges();                    // re-evalúa template
expect(fixture.nativeElement.textContent).toContain('COMPLETADO');
```

### 4) Componente con `input.required`
```ts
fixture.componentRef.setInput('tarea', tareaMock);   // ANTES de detectChanges
await fixture.whenStable();
```
Sin `setInput` previo → `NG0950: Input "tarea" is required`.

### 5) Directivas estructurales — componente anfitrión
```ts
@Component({
  imports: [SiRol],
  template: `<div *appSiRol="['admin']" class="secreto">X</div>`,
})
class Anfitrion {}

// en el test:
const auth = TestBed.inject(Auth);
auth.logIn('admin');
fixture.detectChanges();
```

## Providers necesarios en tests (errores reales de este módulo)
| Error | Significado | Fix |
|---|---|---|
| `NG0201: No provider for ActivatedRoute` | Componente usa RouterLink / ActivatedRoute | `providers: [provideRouter([])]` |
| `NG0950: Input is required` | Falta setInput en `input.required` | `fixture.componentRef.setInput(...)` |
| Specs CLI con `new Resaltar()` | CLI genera tests que asumen constructor vacío | Reescribir con anfitrión TestBed |
| Conflicto de nombres (AsyncPipe) | Clase del componente = nombre de pipe common | Renombrar spec a `AsyncPipeDemo` |

## Estándar de este módulo
- 61 tests ✓ pasando en 33 spec files
- Patrones: `new` puro | TestBed.inject | fixture+DOM | anfitrión para directivas

## Ejercicio
1. Test para `TareasStore.establecerFiltro` con las 3 variantes y
   verificar `.visibles()` cada vez.
2. Test de integración: Servicios agrega tarea → aparece en store.
   (Pista: inyectar ambos y usar los métodos como haría el usuario).
