import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Inicio } from './inicio';

// Test de COMPONENTE: TestBed + fixture + DOM real.
// Aquí probamos que la interpolación y los eventos funcionan.
describe('Inicio', () => {
  let componente: Inicio;
  let fixture: ComponentFixture<Inicio>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Inicio] }).compileComponents();
    fixture = TestBed.createComponent(Inicio);
    componente = fixture.componentInstance;
    el = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('muestra el título por interpolación', () => {
    const h1 = el.querySelector('h1');
    expect(h1?.textContent).toContain('Curso Angular 22 + IA');
  });

  it('empieza como "en curso" (completado = false)', () => {
    expect(el.textContent).toContain('en curso');
  });

  it('clic en el botón alterna completado → template reacciona', () => {
    const boton = el.querySelector('button') as HTMLButtonElement;

    // Simulamos clic → Angular detecta el evento y re-renderiza
    boton.click();
    fixture.detectChanges();

    expect(el.textContent).toContain('COMPLETADO');

    // Clic de nuevo → vuelve atrás
    boton.click();
    fixture.detectChanges();
    expect(el.textContent).toContain('en curso');
  });

  it('getter progreso muestra el formato correcto', () => {
    expect(el.textContent).toContain('Módulo 2 de 24');
  });
});
