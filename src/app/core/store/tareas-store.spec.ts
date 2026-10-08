import { TestBed } from '@angular/core/testing';
import { TareasStore } from './tareas-store';

describe('TareasStore', () => {
  let service: TareasStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TareasStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
