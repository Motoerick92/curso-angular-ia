import { Component, inject, viewChild } from '@angular/core';
import { Puente } from '../../core/services/puente';
import { ContadorHijo } from './contador-hijo/contador-hijo';

// ═══════════════════════════════════════════════════════════════
// PADRE que muestra 3 formas de comunicación:
//  ① Servicio compartido (puente) — entre cualquier nivel
//  ② viewChild() — el padre invoca métodos del hijo directo
//  ③ Servicios globales existentes (Tareas/Auth) — la app entera
// ═══════════════════════════════════════════════════════════════
@Component({
  selector: 'app-comunicacion',
  imports: [ContadorHijo],
  templateUrl: './comunicacion.html',
  styleUrl: './comunicacion.css',
})
export class Comunicacion {
  // ① Servicio puente inyectado — cualquier componente lo comparte
  protected readonly puente = inject(Puente);

  // ② viewChild(): referencia directa a la instancia del hijo.
  //    ContadorHijo = tipo del componente que buscamos en el template.
  //    El padre puede llamar child()?.resetear() en cualquier momento.
  private readonly hijo = viewChild(ContadorHijo);

  enviarMensaje(desde: string): void {
    this.puente.enviar(`Hola desde ${desde}`);
  }

  // ② Llamada directa al método del hijo — sin pasar por el template
  resetearDesdeElPadre(): void {
    this.hijo()?.resetear();   // ?. porque viewChild puede ser undefined
  }
}
