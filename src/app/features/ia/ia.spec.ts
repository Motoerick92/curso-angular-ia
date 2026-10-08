import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Ia } from './ia';
import { IaService } from '../../core/services/ia';

describe('Ia (chat)', () => {
  let componente: Ia;
  let fixture: ComponentFixture<Ia>;
  let svc: IaService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Ia] }).compileComponents();
    svc = TestBed.inject(IaService);
    svc.limpiar();
    fixture = TestBed.createComponent(Ia);
    componente = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('crea el componente', () => {
    expect(componente).toBeTruthy();
  });

  it('input de chat deshabilitado sin API key', () => {
    svc.configurarApiKey('');
    svc.limpiar();
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('.input-chat input');
    expect(input.disabled).toBe(true);
  });

  it('input habilitado cuando hay key configurada', () => {
    svc.configurarApiKey('sk-fake');
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('.input-chat input');
    expect(input.disabled).toBe(false);
  });

  it('muestra burbujas por cada mensaje del historial', async () => {
    svc.configurarApiKey('sk-fake');
    // Simulamos turnos ya presentes sin llamar a la API real
    svc['historial'].set([
      { rol: 'user', contenido: 'Hola' },
      { rol: 'assistant', contenido: 'Hola, ¿en qué te ayudo?' },
    ]);
    fixture.detectChanges();
    await fixture.whenStable();
    const burbujas = fixture.nativeElement.querySelectorAll('.burbuja');
    expect(burbujas.length).toBe(2);
  });
});
