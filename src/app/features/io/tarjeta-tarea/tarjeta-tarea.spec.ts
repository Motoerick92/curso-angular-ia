import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TarjetaTarea, type Tarea } from './tarjeta-tarea';

describe('TarjetaTarea', () => {
  let componente: TarjetaTarea;
  let fixture: ComponentFixture<TarjetaTarea>;

  const tareaMock: Tarea = { id: 1, titulo: 'Tarea mock', prioridad: 'alta', hecha: false };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetaTarea],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TarjetaTarea);
    componente = fixture.componentInstance;
    // input.required: hay que setearlo ANTES del primer detectChanges
    fixture.componentRef.setInput('tarea', tareaMock);
    await fixture.whenStable();
  });

  it('se crea y pinta el título del input', async () => {
    await fixture.whenStable();
    const html = fixture.nativeElement as HTMLElement;
    expect(componente).toBeTruthy();
    expect(html.textContent).toContain('Tarea mock');
  });

  it('emite hechaCambiada al pulsar ✓', async () => {
    await fixture.whenStable();
    let emitido: boolean | undefined;
    componente.hechaCambiada.subscribe((v) => (emitido = v));

    componente.alternarHecha();
    expect(emitido).toBe(true);
  });

  it('emite eliminar con el id de la tarea', () => {
    let idEmitido: number | undefined;
    componente.eliminar.subscribe((id) => (idEmitido = id));

    componente.emitirEliminar();
    expect(idEmitido).toBe(1);
  });

  it('model seleccionada alterna y emite', () => {
    let valor: boolean | undefined;
    componente.seleccionada.subscribe((v) => (valor = v));

    componente.alternarSeleccion();
    expect(valor).toBe(true);
  });
});
