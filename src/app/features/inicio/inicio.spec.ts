import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Inicio } from './inicio';

// Spec actualizado para el hero rediseñado (M25). Antes asumía textos
// del diseño viejo; ahora valida hero, badge, CTA y estado completado.
describe('Inicio (rediseñado M25)', () => {
  let componente: Inicio;
  let fixture: ComponentFixture<Inicio>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Inicio],
      providers: [provideRouter([])],   // el hero usa routerLink
    }).compileComponents();

    fixture = TestBed.createComponent(Inicio);
    componente = fixture.componentInstance;
    el = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('muestra el título hero del curso', () => {
    const h1 = el.querySelector('h1');
    expect(h1?.textContent).toContain('Curso Angular 22 + IA');
  });

  it('badge muestra 24 módulos', () => {
    expect(el.textContent).toContain('24 módulos');
  });

  it('empieza sin tarjeta de completado', () => {
    expect(el.textContent).not.toContain('Ejercicio marcado');
  });

  it('alternarCompletado muestra la tarjeta de éxito', async () => {
    // Llamada directa al método del componente (evita el detalle fino
    // del click en <ui-button> cuyo output también se llama "click").
    componente.alternarCompletado();
    // Zoneless: tick() fuerza el ciclo de render inmediato
    TestBed.tick();

    expect(el.textContent).toContain('Ejercicio marcado');
  });
});
