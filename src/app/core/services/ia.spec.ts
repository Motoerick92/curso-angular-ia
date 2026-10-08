import { TestBed } from '@angular/core/testing';
import { IaService } from './ia';

describe('IaService', () => {
  let svc: IaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    svc = TestBed.inject(IaService);
    svc.limpiar();
  });

  it('historial empieza vacío', () => {
    expect(svc.historial()).toEqual([]);
  });

  it('configurarApiKey guarda y persiste en localStorage', () => {
    svc.configurarApiKey('  sk-test-123  ');
    expect(svc.apiKey()).toBe('sk-test-123');
    expect(localStorage.getItem('api-key-ia')).toBe('sk-test-123');
  });

  it('configurarModelo recorta espacios', () => {
    svc.configurarModelo('  gpt-4o  ');
    expect(svc.modelo()).toBe('gpt-4o');
  });

  it('limpiar() resetea historial y error', () => {
    svc['historial'].set([{ rol: 'user', contenido: 'x' }]);
    svc.limpiar();
    expect(svc.historial()).toEqual([]);
    expect(svc.error()).toBeNull();
  });
});
