import { Pipe, PipeTransform } from '@angular/core';

// PIPE CUSTOM: función pura de transformación para templates.
// @Pipe declara el nombre con el que se usa en HTML: {{ texto | truncate:20 }}
// pure: true (default) = solo se reevalúa si cambia la entrada (eficiente).
@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  // transform(): método obligatorio del contrato PipeTransform.
  // ENTRADA: valor original + argumentos opcionales (van tras ":" en el template)
  // SALIDA: valor transformado que pinta el template
  transform(valor: string, largo = 25): string {
    // Si el texto cabe, se devuelve intacto
    if (valor.length <= largo) return valor;
    // Si no, corta y agrega puntos suspensivos
    return valor.slice(0, largo) + '…';
  }
}
