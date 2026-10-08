import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContadorHijo } from './contador-hijo';

describe('ContadorHijo', () => {
  let component: ContadorHijo;
  let fixture: ComponentFixture<ContadorHijo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContadorHijo],
    }).compileComponents();

    fixture = TestBed.createComponent(ContadorHijo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
