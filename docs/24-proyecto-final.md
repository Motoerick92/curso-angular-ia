# Módulo 24 — Proyecto Final: Dashboard "Mi Productividad IA"

## Objetivos
Consolidar el curso en UN dashboard real reutilizando todo lo aprendido.
Deploy del backend SSR pendiente (fuera de alcance por ahora).

## Lo que integra el dashboard

| Módulo | Qué aporta aquí |
|---|---|
| M6 Signals | `progreso`, `estadoAnimo` computeds |
| M8 Servicios | `Auth`, `TareasStore`, `IaService` inyectados |
| M9 Auth guard UX | Panel protegido con mensaje "inicia sesión" |
| M16 Store | Tareas globales reutilizadas directo |
| M21+M23 IA | Botón "Resumen del día" con coach IA |
| M20 SEO | Title/Meta en el dashboard |
| M7 input/output | Reutiliza `TarjetaTarea` del módulo de IO |

## Punto arquitectónico: cero estado propio
El Dashboard **solo compone** — ningún dato vive en él:
```ts
protected readonly store = inject(TareasStore);   // estado global
protected readonly ia = inject(IaService);        // llamadas IA
protected readonly auth = inject(Auth);           // sesión
```
Solo guarda `resumenIa` (resultado de la pregunta) y `resumenCargando`
(spinner del botón) — nada más. Todos los derivados son computeds.

## Skill clave: componentes reutilizables
`TarjetaTarea` de M7 se usa aquí sin cambiar una línea — solo con datos
diferentes. Esa es la señal de un componente bien diseñado.

## Estado final del curso
- 74 tests verdes (`ng test --watch=false`)
- Build de producción incluye SSR+prerender (`ng build`)
- 24/24 módulos completados

## Para el futuro (fuera del curso)
- `npm run serve:ssr:curso-angular-ia` para servir SSR local.
- Deploy a Node host: Render / Railway / Fly.io.
- Deploy estático a Vercel/Netlify requeriría desactivar Server routes.

## Ejercicio final
1. Agregar pestaña de "Logros" que desbloquee badges por progreso.
2. Chat flotante que aparezca desde cualquier ruta.
3. Dark/light theme global guardado en localStorage.
