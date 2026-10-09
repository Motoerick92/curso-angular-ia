# Curso Angular 22 + IA — Índice de módulos

**🎬 [Guion completo de videos](guion-curso.md)** — texto para narrar cada módulo

Documentación por módulo, en orden. Cada doc tiene: teoría, comandos,
código clave, errores comunes y ejercicios.

## Fase 1 — Fundamentos
1. [Setup del entorno](01-setup.md) — Node/CLI 22, `ng new`, estructura
2. [Componentes standalone](02-componentes-standalone.md) — `{{ }}` interpolación
3. [Data binding](03-data-binding.md) — `{{}}`, `[]`, `()`, `[()]`
4. [Control flow](04-control-flow.md) — `@if`, `@for`, `@switch`
5. [Pipes y directivas](05-pipes-y-directivas.md) — built-in + custom

## Fase 2 — Core
6. [Signals](06-signals.md) — `signal()`, `computed()`, `effect()`
7. [Inputs/Outputs](07-inputs-outputs.md) — `input()`, `output()`, `model()`
8. [Servicios e inyección](08-servicios-inyeccion.md) — `inject()`, singleton
9. [Routing](09-routing.md) — params, lazy loading, guards
10. [HTTP e interceptores](10-http-interceptores.md) — `httpResource`, `HttpInterceptorFn`

## Fase 3 — Intermedio
11. [Forms template-driven](11-formularios-template-driven.md) — `ngModel`, `ngForm`
12. [Reactive Forms](12-reactive-forms.md) — FormBuilder, validadores custom
13. [RxJS esencial](13-rxjs-esencial.md) — debounce, switchMap, takeUntilDestroyed
14. [Comunicación entre componentes](14-comunicacion-componentes.md) — viewChild, servicio puente
15. [Pipe async](15-async-pipe.md) — observables en template, BehaviorSubject

## Fase 4 — Avanzado
16. [State management](16-state-management.md) — store con signals desnormalizado
17. [OnPush y optimización](17-onpush-optimizacion.md) — change detection granular
18. [Directivas estructurales](18-directivas-estructurales.md) — TemplateRef, ViewContainerRef
19. [Testing](19-testing.md) — pipes, servicios, store, componentes, directivas (74 tests)
20. [SSR + SEO](20-ssr-hydration-seo.md) — RenderMode, Title/Meta, hydration

## Fase 5 — IA + Proyecto final
21. [Integración API IA](21-integracion-ia.md) — chat con OpenAI-compatible
22. [Streaming SSE](22-streaming-ia.md) — respuesta token a token
23. [IA en formularios](23-ia-en-formularios.md) — JSON estricto + patchValue
24. [Proyecto final](24-proyecto-final.md) — Dashboard consolidado

---

**Servidor dev**: `ng serve` → http://localhost:4200
**Tests**: `ng test --watch=false`
**Build + SSR**: `ng build`
