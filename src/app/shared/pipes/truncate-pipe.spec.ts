import { TruncatePipe } from './truncate-pipe';

// Test de PIPE puro: no necesita TestBed — es una clase sin inyección.
describe('TruncatePipe', () => {
  let pipe: TruncatePipe;

  beforeEach(() => {
    pipe = new TruncatePipe();
  });

  it('devuelve intacto un texto que cabe', () => {
    expect(pipe.transform('hola', 10)).toBe('hola');
  });

  it('corta y agrega puntos suspensivos si supera el largo', () => {
    expect(pipe.transform('hola mundo cruel', 8)).toBe('hola mun…');
  });

  it('usa el largo por defecto de 25 sin argumento', () => {
    const texto = 'a'.repeat(30);
    expect(pipe.transform(texto)).toBe('a'.repeat(25) + '…');
  });

  it('borde: texto exactamente igual al largo no se corta', () => {
    expect(pipe.transform('12345', 5)).toBe('12345');
  });
});
