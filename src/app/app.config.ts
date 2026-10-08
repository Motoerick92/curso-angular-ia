import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // withComponentInputBinding: los :params de la URL llegan
    // como input() al componente — sin leer ActivatedRoute a mano
    provideRouter(routes, withComponentInputBinding()),
  ],
};
