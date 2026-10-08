import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IaService } from '../../core/services/ia';

// UI del chat: todo el estado vive en el servicio; esto solo lo pinta.
@Component({
  selector: 'app-ia',
  imports: [FormsModule],
  templateUrl: './ia.html',
  styleUrl: './ia.css',
})
export class Ia {
  protected readonly ia = inject(IaService);

  // Binding two-way del input de config y del chat
  textoApiKey = '';
  textoModelo = this.ia.modelo();

  guardarConfig(): void {
    this.ia.configurarApiKey(this.textoApiKey);
    this.ia.configurarModelo(this.textoModelo);
  }

  enviar(texto: string, input: HTMLInputElement): void {
    void this.ia.preguntar(texto);
    input.value = '';
    input.focus();
  }
}
