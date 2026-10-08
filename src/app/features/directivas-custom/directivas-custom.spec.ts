import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DirectivasCustom } from './directivas-custom';

describe('DirectivasCustom', () => {
  let component: DirectivasCustom;
  let fixture: ComponentFixture<DirectivasCustom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DirectivasCustom],
    }).compileComponents();

    fixture = TestBed.createComponent(DirectivasCustom);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
