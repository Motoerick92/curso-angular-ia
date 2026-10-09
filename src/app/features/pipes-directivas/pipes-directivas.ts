import { Component, signal } from '@angular/core';
// Pipes built-in viven en @angular/common
import { CurrencyPipe, DatePipe, JsonPipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
// NgClass y NgStyle = directivas built-in (clases y estilos dinámicos)
import { NgClass, NgStyle } from '@angular/common';
import { TruncatePipe } from '../../shared/pipes/truncate-pipe';
import { Resaltar } from '../../shared/directives/resaltar';
import { UiCard } from '../../shared/components/ui/ui-card';
import { UiBadge } from '../../shared/components/ui/ui-badge';

@Component({
  selector: 'app-pipes-directivas',
  // Standalone: importar SOLO lo que el template usa (pipes y directivas incluidos)
  imports: [
    // Pipes built-in
    CurrencyPipe, DatePipe, JsonPipe, SlicePipe, TitleCasePipe, UpperCasePipe,
    // Directivas built-in
    NgClass, NgStyle,
    // Nuestros customs
    TruncatePipe, Resaltar,
    // UI kit (M25)
    UiCard, UiBadge,
  ],
  templateUrl: './pipes-directivas.html',
  styleUrl: './pipes-directivas.css',
})
export class PipesDirectivas {
  // Datos crudos para demo de pipes
  precio = signal(1299.5);
  hoy = signal(new Date());
  textoLargo = signal('Angular es un framework de desarrollo frontend mantenido por Google que permite construir aplicaciones SPA robustas.');
  frase = signal('bienvenido al curso de angular');
  objetoDemo = signal({ id: 1, usuario: 'erick', activo: true });
  tecnologias = signal(['Angular', 'TypeScript', 'RxJS', 'Signals', 'Vite']);
}
