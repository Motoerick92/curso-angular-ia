import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemPesado } from './item-pesado';

describe('ItemPesado', () => {
  let componente: ItemPesado;
  let fixture: ComponentFixture<ItemPesado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ItemPesado] }).compileComponents();
    fixture = TestBed.createComponent(ItemPesado);
    componente = fixture.componentInstance;
    // input.required: setear antes de detectChanges
    fixture.componentRef.setInput('dato', { id: 42, titulo: 'Ítem de prueba' });
    await fixture.whenStable();
  });

  it('renderiza id y título del input', () => {
    const html = fixture.nativeElement as HTMLElement;
    expect(html.textContent).toContain('42');
    expect(html.textContent).toContain('Ítem de prueba');
  });

  it('contador de renders sube tras ngAfterViewChecked', async () => {
    expect(componente.rendersInternos).toBeGreaterThan(0);
  });
});
