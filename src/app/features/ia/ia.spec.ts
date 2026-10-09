import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Ia } from './ia';
import { IaService } from '../../core/services/ia';

// Spec actualizado para el rebuild UI del M25 (selectores nuevos).
describe('Ia (chat) — tras rebuild UI', () => {
  let componente: Ia;
  let fixture: ComponentFixture<Ia>;
  let svc: IaService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Ia] }).compileComponents();
    svc = TestBed.inject(IaService);
    svc.limpiar();
    svc.configurarApiKey('');            // partimos sin key
    fixture = TestBed.createComponent(Ia);
    componente = fixture.componentInstance;
    await fixture.whenStable();
  });

  // Helper: input del chat (placeholder distintivo)
  const inputChat = (): HTMLInputElement | null =>
    fixture.nativeElement.querySelector('input[placeholder*="Escribe"]');

  it('crea el componente', () => {
    expect(componente).toBeTruthy();
  });

  it('input del chat deshabilitado sin API key', async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    expect(inputChat()?.disabled).toBe(true);
  });

  it('input habilitado cuando hay key configurada', async () => {
    svc.configurarApiKey('sk-fake');
    fixture.detectChanges();
    await fixture.whenStable();
    expect(inputChat()?.disabled).toBe(false);
  });

  it('burbujas: texto de historial visible en el DOM', async () => {
    svc.configurarApiKey('sk-fake');
    svc['historial'].set([
      { rol: 'user', contenido: 'Hola IA' },
      { rol: 'assistant', contenido: 'Hola humano' },
    ]);
    fixture.detectChanges();
    await fixture.whenStable();
    const html = fixture.nativeElement.textContent as string;
    expect(html).toContain('Hola IA');
    expect(html).toContain('Hola humano');
  });
});
