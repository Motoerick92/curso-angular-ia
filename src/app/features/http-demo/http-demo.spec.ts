import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpDemo } from './http-demo';

describe('HttpDemo', () => {
  let component: HttpDemo;
  let fixture: ComponentFixture<HttpDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(HttpDemo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
