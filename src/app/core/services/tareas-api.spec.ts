import { TestBed } from '@angular/core/testing';
import { TareasApi } from './tareas-api';

describe('TareasApi', () => {
  let service: TareasApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TareasApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
