import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';

// App usa RouterOutlet/RouterLink → necesita provider del router en tests.
describe('App (shell raíz)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('crea la app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renderiza la barra de navegación con los enlaces de módulos', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const html = fixture.nativeElement as HTMLElement;
    expect(html.querySelector('nav')).toBeTruthy();
    expect(html.textContent).toContain('Inicio');
    expect(html.textContent).toContain('Signals');
  });
});
