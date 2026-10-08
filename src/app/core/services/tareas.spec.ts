import { TestBed } from '@angular/core/testing';
import { Tareas } from './tareas';

// Test de SERVICIO con inject(): TestBed crea el contexto de inyección.
describe('Tareas (servicio singleton)', () => {
  let servicio: Tareas;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    servicio = TestBed.inject(Tareas);
  });

  it('empieza con 2 tareas de demo', () => {
    expect(servicio.total()).toBe(2);
    expect(servicio.completadas()).toBe(0);
  });

  it('agregar() incrementa el total y crea id correcto', () => {
    servicio.agregar('Nueva tarea de prueba');
    expect(servicio.total()).toBe(3);
    expect(servicio.tareas().at(-1)?.id).toBe(3);
  });

  it('alternar() voltea el estado hecha', () => {
    servicio.alternar(1);
    expect(servicio.tareas().find((t) => t.id === 1)?.hecha).toBe(true);
    expect(servicio.completadas()).toBe(1);
  });

  it('eliminar() quita la tarea y actualiza derivados', () => {
    servicio.eliminar(1);
    expect(servicio.total()).toBe(1);
    expect(servicio.tareas().some((t) => t.id === 1)).toBe(false);
  });

  it('pendientes = total - completadas (siempre coherente)', () => {
    servicio.alternar(1);
    servicio.alternar(2);
    expect(servicio.pendientes()).toBe(0);
  });
});
