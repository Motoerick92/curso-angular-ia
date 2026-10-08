import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PipesDirectivas } from './pipes-directivas';

describe('PipesDirectivas', () => {
  let component: PipesDirectivas;
  let fixture: ComponentFixture<PipesDirectivas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PipesDirectivas],
    }).compileComponents();

    fixture = TestBed.createComponent(PipesDirectivas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
