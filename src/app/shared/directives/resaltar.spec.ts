import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Resaltar } from './resaltar';

// Anfitrión con la directiva aplicada (color default y custom)
@Component({
  imports: [Resaltar],
  template: `
    <p appResaltar class="a">Con color default</p>
    <p appResaltar color="#a6e3a1" class="b">Con color verde</p>
  `,
})
class AnfitrionResaltar {}

describe('Resaltar (directiva de atributo)', () => {
  let fixture: ComponentFixture<AnfitrionResaltar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AnfitrionResaltar] }).compileComponents();
    fixture = TestBed.createComponent(AnfitrionResaltar);
    fixture.detectChanges();
  });

  const simularMouseEnter = (selector: string): HTMLElement => {
    const el = fixture.nativeElement.querySelector(selector) as HTMLElement;
    el.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();
    return el;
  };

  it('aplica el color default al entrar el mouse', () => {
    const el = simularMouseEnter('.a');
    expect(el.style.backgroundColor).toBe('rgb(255, 247, 64)');  // #fff740
  });

  it('aplica el color personalizado con el input color', () => {
    const el = simularMouseEnter('.b');
    expect(el.style.backgroundColor).toBe('rgb(166, 227, 161)'); // #a6e3a1
  });

  it('limpia el fondo al salir el mouse', () => {
    const el = simularMouseEnter('.a');
    el.dispatchEvent(new Event('mouseleave'));
    fixture.detectChanges();
    expect(el.style.backgroundColor).toBe('transparent');
  });
});
