import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreDemo } from './store-demo';

describe('StoreDemo', () => {
  let component: StoreDemo;
  let fixture: ComponentFixture<StoreDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(StoreDemo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
