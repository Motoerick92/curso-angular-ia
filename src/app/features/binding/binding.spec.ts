import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Binding } from './binding';

describe('Binding', () => {
  let component: Binding;
  let fixture: ComponentFixture<Binding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Binding],
    }).compileComponents();

    fixture = TestBed.createComponent(Binding);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
