import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Servicios } from './servicios';
import { Tareas } from '../../core/services/tareas';

describe('Servicios (integración con Tareas svc)', () => {
  let componente: Servicios;
  let fixture: ComponentFixture<Servicios>;
  let servicio: Tareas;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Servicios],
      providers: [provideRouter([])],
    }).compileComponents();
    servicio = TestBed.inject(Tareas);
    servicio.restaurarDemo();   // estado predecible por test
    fixture = TestBed.createComponent(Servicios);
    componente = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('pinta las tarjetas de las tareas del servicio', () => {
    const html = fixture.nativeElement as HTMLElement;
    const tarjetas = html.querySelectorAll('app-tarjeta-tarea');
    expect(tarjetas.length).toBe(2);   // demo tiene 2 tareas iniciales
  });

  it('agregar vía método actualiza la lista', async () => {
    componente.alAgregar('Tarea desde el test');
    await fixture.whenStable();
    const html = fixture.nativeElement as HTMLElement;
    expect(html.querySelectorAll('app-tarjeta-tarea').length).toBe(3);
  });

  it('estadísticas reflejan completadas al alternar', async () => {
    componente.alCambiarHecha(1, true);
    await fixture.whenStable();
    // El nuevo diseño separa valor y etiqueta — validamos el estado + texto
    expect(servicio.completadas()).toBe(1);
    expect(fixture.nativeElement.textContent).toContain('Hechas');
  });
});
