import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TareaDetalle } from './tarea-detalle';

describe('TareaDetalle', () => {
  let component: TareaDetalle;
  let fixture: ComponentFixture<TareaDetalle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TareaDetalle],
    }).compileComponents();

    fixture = TestBed.createComponent(TareaDetalle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
