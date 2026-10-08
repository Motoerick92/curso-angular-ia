import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Repetir } from './repetir';

// Componente anfitrión de prueba: usa la directiva con un signal
@Component({
  imports: [Repetir],
  template: `<p *appRepetir="veces(); let i = $implicit">Copia {{ i }}</p>`,
})
class AnfitrionRepetir {
  veces = signal(0);
}

describe('Repetir (directiva estructural)', () => {
  let fixture: ComponentFixture<AnfitrionRepetir>;
  let anfitrion: AnfitrionRepetir;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AnfitrionRepetir] }).compileComponents();
    fixture = TestBed.createComponent(AnfitrionRepetir);
    anfitrion = fixture.componentInstance;
  });

  const contarCopias = (): number =>
    fixture.nativeElement.querySelectorAll('p').length;

  it('no pinta nada con 0 repeticiones', async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    expect(contarCopias()).toBe(0);
  });

  it('pinta 3 copias con indices correctos', async () => {
    anfitrion.veces.set(3);
    fixture.detectChanges();
    await fixture.whenStable();

    const ps = fixture.nativeElement.querySelectorAll('p') as NodeListOf<HTMLElement>;
    expect(ps.length).toBe(3);
    expect(ps[0].textContent).toContain('0');
    expect(ps[2].textContent).toContain('2');
  });

  it('re-renderiza al cambiar el signal', async () => {
    anfitrion.veces.set(2);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(contarCopias()).toBe(2);

    anfitrion.veces.set(5);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(contarCopias()).toBe(5);
  });
});
