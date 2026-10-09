# Módulo 21 — Integración de API de IA en Angular

## Objetivos
Conectar la app a cualquier API compatible con OpenAI
(OpenAI, OpenRouter, Ollama local, LM Studio) con un chat funcional.

## Arquitectura

```
features/ia/ (UI)                    core/services/ia.ts
  Input chat ─────────────► preguntar(texto)
  Config (key/modelo) ────► signals de configuración
  Burbujas ◄────────────── historial / cargando / error
```

## Lo nuevo de este módulo

### fetch nativo en servicio
Sin HttpClient para esta demo — fetch basta y es más directo:
```ts
const resp = await fetch(`${this.baseUrl()}/chat/completions`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
  body: JSON.stringify({ model, messages, stream: false }),
});
```
`stream: false` en M21 — M22 lo cambia a streaming.

### Configuración editable desde la UI
La key, baseUrl y modelo son signals → el usuario los cambia sin tocar código.
La key persiste en localStorage (solo navegador, nunca en código).

### Historial inmutable
Cada turno = update con spread:
```ts
this.historial.update((h) => [...h, { rol: 'user', contenido }]);
```
Si la request falla, quitamos el turno del usuario para reintento limpio.

### Estado de carga y error como signals
`cargando` y `error` controlan el UI (spinner "escribiendo…", banner rojo).

## SSR y localStorage — error real capturado
```
ERROR ReferenceError: localStorage is not defined
An error occurred while prerendering route '/ia'.
```
Causa: prerender corre en Node — `localStorage` no existe.
Fix:
```ts
private esNavegador = isPlatformBrowser(inject(PLATFORM_ID));
readonly apiKey = signal(this.esNavegador ? localStorage.getItem('api-key-ia') ?? '' : '');
```
Lo mismo en `configurarApiKey` al escribir.

## Probarlo
1. Crea key gratis en https://openrouter.ai
2. En `/ia` expande Configuración, pega la key, guarda.
3. Modelo por defecto: `apodex/apodex-1.1-mini:free` (free tier).
   Nota: `meta-llama/llama-3.2-3b-instruct:free` y `gemini-2.0-flash-exp:free`
   dejaron de estar disponibles gratis — OpenRouter rota el free tier.
4. Pregunta algo — respuesta aparece sin recargar.

## Errores comunes
| Error | Causa | Fix |
|---|---|---|
| HTTP 401 | Key inválida/expirada | Revisar key en OpenRouter |
| HTTP 402/429 | Sin crédito o rate limit | Usar modelo `:free` o esperar |
| Respuesta vacía | Campo `choices` ausente | Validar respuesta antes de leer |
| localStorage error en build SSR | Acceso directo a `window/localStorage` | Guard con `isPlatformBrowser` |

## Ejercicio
1. Agregar select de modelos gratuitos de OpenRouter (hardcode lista).
2. Botón "descargar chat" que guarde historial en .txt.
3. Manejar límite de contexto: recortar historial si supera N tokens aprox.
