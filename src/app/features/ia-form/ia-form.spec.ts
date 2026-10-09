import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { IaForm } from './ia-form';
import { IaService } from '../../core/services/ia';
import { vi } from 'vitest';   // el runner es Vitest (no Jasmine)

describe('IaForm (IA + reactive forms)', () => {
  let componente: IaForm;
  let fixture: ComponentFixture<IaForm>;
  let ia: IaService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IaForm],
      providers: [provideRouter([])],   // template usa routerLink
    }).compileComponents();

    ia = TestBed.inject(IaService);
    ia.configurarApiKey('');            // sin key por defecto en tests
    fixture = TestBed.createComponent(IaForm);
    componente = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('crea el componente con formulario vacío', () => {
    expect(componente).toBeTruthy();
    expect(componente.form.value.titulo).toBe('');
  });

  it('generarConIa no llama sin título', async () => {
    // Sin título: marcaría touched y saldría sin llamar a la API
    await componente.generarConIa();
    expect(componente.generando()).toBe(false);
    expect(componente.form.get('titulo')?.touched).toBe(true);
  });

  it('manual parsea JSON válido y parchea el formulario', async () => {
    componente.form.patchValue({ titulo: 'Mi tarea' });

    // Simulamos una respuesta AI con JSON v alienado en texto
    const mockJson = '{"descripcion":"Desc generada","prioridad":"alta"}';
    vi.spyOn(ia, 'generarTexto').mockResolvedValue(mockJson);

    await componente.generarConIa();

    expect(componente.form.value.descripcion).toBe('Desc generada');
    expect(componente.form.value.prioridad).toBe('alta');
  });

  it('marca error si la IA no devuelve JSON', async () => {
    componente.form.patchValue({ titulo: 'Test' });
    vi.spyOn(ia, 'generarTexto').mockResolvedValue('Sin JSON aquí');

    await componente.generarConIa();
    expect(componente.errorIa()).toContain('no devolvió JSON');
  });
});
