import { RenderMode, ServerRoute } from '@angular/ssr';

// Config de render por ruta (M20):
// ・Prerender = HTML estático generado en build (SEO máximo)
// ・Server   = SSR en cada request (datos frescos, params dinámicos)
export const serverRoutes: ServerRoute[] = [
  // Params dinámicos no se pueden prerenderizar sin lista explícita
  // → SSR por request
  { path: 'tarea/:id', renderMode: RenderMode.Server },
  // Admin depende de sesión → nunca estático
  { path: 'admin', renderMode: RenderMode.Server },
  // El resto: estáticas (cursos, demos) — se sirven instantáneas
  { path: '**', renderMode: RenderMode.Prerender },
];
