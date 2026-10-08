import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TareaDetalle } from './tarea-detalle';
import { Tareas } from '../../core/services/tareas';

describe('TareaDetalle', () => {
  let componente: TareaDetalle;
  let fixture: ComponentFixture<TareaDetalle>;
  let servicio: Tareas;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TareaDetalle],
      providers: [provideRouter([])],
    }).compileComponents();
    servicio = TestBed.inject(Tareas);
    fixture = TestBed.createComponent(TareaDetalle);
    componente = fixture.componentInstance;
    // Simulamos la URL: /tarea/2  (withComponentInputBinding inyecta el param)
    fixture.componentRef.setInput('id', '2');
    await fixture.whenStable();
  });

  it('encuentra la tarea del servicio por el id de la URL', () => {
    expect(componente.tarea()?.titulo).toContain('Compartir estado');
  });

  it('muestra mensaje de no encontrada si el id no existe', async () => {
    fixture.componentRef.setInput('id', '9999');
    await fixture.whenStable();
    const html = fixture.nativeElement as HTMLElement;
    expect(html.textContent).toContain('no encontrada');
  });
});
