import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

// GUARD funcional (CanActivateFn): decide si una ruta puede activarse.
// Se ejecuta ANTES de cargar el componente.
export const authGuard: CanActivateFn = () => {
  // inject() funciona aquí porque los guards corren
  // en contexto de inyección de Angular
  const auth = inject(Auth);
  const router = inject(Router);

  if (auth.logueado()) {
    return true;                    // ✅ permitido: sigue navegando
  }

  // ❌ bloqueado: redirige al home
  // createUrlTree es la forma moderna (en vez de navegar imperativamente)
  return router.createUrlTree(['/']);
};
