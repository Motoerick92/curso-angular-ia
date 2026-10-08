import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from '../services/auth';

// INTERCEPTOR funcional: atrapa TODA petición HTTP saliente.
// Perfecto para: headers de auth, logs, manejo global de errores.
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(Auth);

  // Clonar la request: las HttpRequest son INMUTABLES.
  // Para agregar headers hay que clonar con setHeaders.
  const usuario = auth.usuario();

  const reqConAuth = usuario
    ? req.clone({
        setHeaders: {
          // En un backend real: Authorization: `Bearer ${token}`
          'X-Usuario': usuario,
        },
      })
    : req;

  console.log(`[interceptor] → ${req.method} ${req.url}`);

  // next(reqModificada) pasa la petición al siguiente paso del pipeline
  return next(reqConAuth);
};
