import { Component, signal } from '@angular/core';
// RouterLink: directiva para enlaces SPA; RouterLinkActive: marca ruta activa
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  // Todo standalone declara lo que usa: router-outlet + directivas de navegación
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('curso-angular-ia');
}
