import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SiRol } from './si-rol';
import { Auth } from '../../core/services/auth';

// Anfitrión con el bloque condicionado por rol
@Component({
  imports: [SiRol],
  template: `<div *appSiRol="['admin', 'erick']" class="secreto">Secreto</div>`,
})
class AnfitrionRol {}

describe('SiRol (directiva con Auth)', () => {
  let fixture: ComponentFixture<AnfitrionRol>;
  let auth: Auth;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AnfitrionRol] }).compileComponents();
    fixture = TestBed.createComponent(AnfitrionRol);
    // Obtenemos el singleton real de Auth para controlar el estado
    auth = TestBed.inject(Auth);
  });

  const haySecreto = (): boolean =>
    !!fixture.nativeElement.querySelector('.secreto');

  it('oculta el contenido si no hay usuario logueado', async () => {
    auth.logOut();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(haySecreto()).toBe(false);
  });

  it('muestra el contenido si el usuario tiene rol permitido', async () => {
    auth.logIn('admin');
    fixture.detectChanges();
    await fixture.whenStable();
    expect(haySecreto()).toBe(true);
  });

  it('oculta el contenido si el usuario NO tiene rol permitido', async () => {
    auth.logIn('invitado');
    fixture.detectChanges();
    await fixture.whenStable();
    expect(haySecreto()).toBe(false);
  });
});
