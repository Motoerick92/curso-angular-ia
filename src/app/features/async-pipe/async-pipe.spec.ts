import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsyncPipe } from './async-pipe';

describe('AsyncPipe', () => {
  let component: AsyncPipe;
  let fixture: ComponentFixture<AsyncPipe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsyncPipe],
    }).compileComponents();

    fixture = TestBed.createComponent(AsyncPipe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
