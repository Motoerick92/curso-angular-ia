import { TestBed } from '@angular/core/testing';
import { Puente } from './puente';

describe('Puente', () => {
  let service: Puente;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Puente);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
