import { TestBed } from '@angular/core/testing';
import { TareasStore } from './tareas-store';

// Test del STORE: validar acciones y selectores en conjunto.
describe('TareasStore', () => {
  let store: TareasStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    store = TestBed.inject(TareasStore);
  });

  it('lista deriva de entidades+orden con orden preservado', () => {
    expect(store.lista().map((t) => t.id)).toEqual([1, 2, 3]);
  });

  it('agregar() inserta en entidades y orden', () => {
    store.agregar('Cuarta tarea', 'alta');
    expect(store.total()).toBe(4);
    expect(store.lista().at(-1)?.titulo).toBe('Cuarta tarea');
  });

  it('filtro pendientes solo muestra no hechas', () => {
    store.establecerFiltro('pendientes');
    expect(store.visibles().every((t) => !t.hecha)).toBe(true);
    expect(store.visibles().length).toBe(store.total() - store.completadas());
  });

  it('filtro hechas muestra solo completadas', () => {
    store.establecerFiltro('hechas');
    expect(store.visibles().every((t) => t.hecha)).toBe(true);
  });

  it('eliminar() remueve de entidades + orden sin romper filtro', () => {
    store.eliminar(1);
    expect(store.total()).toBe(2);
    expect(store.lista().some((t) => t.id === 1)).toBe(false);
  });
});
