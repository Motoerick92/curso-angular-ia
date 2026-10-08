import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Optimizacion } from './optimizacion';

describe('Optimizacion', () => {
  let component: Optimizacion;
  let fixture: ComponentFixture<Optimizacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Optimizacion],
    }).compileComponents();

    fixture = TestBed.createComponent(Optimizacion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
