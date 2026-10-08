import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemPesado } from './item-pesado';

describe('ItemPesado', () => {
  let component: ItemPesado;
  let fixture: ComponentFixture<ItemPesado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemPesado],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemPesado);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
