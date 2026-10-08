# Módulo 22 — Chat con streaming de respuestas (SSE)

## Objetivos
Mostrar la respuesta de la IA token a token, como ChatGPT.

## Concepto: Server-Sent Events con `fetch` + `ReadableStream`
Cuando `stream: true`, la API responde con un **stream SSE**:
```
data: {"choices":[{"delta":{"content":"Hola"}}]}

data: {"choices":[{"delta":{"content":", mundo"}}]}

data: [DONE]
```
Los chunks **no se alinean** con líneas completas — hay que acumular buffer.

## Implementación clave
```ts
const lector = respuesta.body!.getReader();
const decodificador = new TextDecoder();
let buffer = '';

while (true) {
  const { done, value } = await lector.read();
  if (done) break;

  buffer += decodificador.decode(value, { stream: true });  // chunks cortados
  const lineas = buffer.split('\n');
  buffer = lineas.pop() ?? '';                              // última quizá incompleta

  for (const linea of lineas) {
    if (!linea.startsWith('data: ')) continue;
    const payload = linea.slice(6).trim();
    if (payload === '[DONE]') break;

    const delta = JSON.parse(payload).choices?.[0]?.delta?.content ?? '';
    if (delta) this.anexarAlUltimo(delta);   // reactivo → UI pinta token a token
  }
}
```

### Puntos críticos
- `decode(value, { stream: true })` — mantiene caracteres multi-byte entre chunks.
- `buffer.split('\n')` + `pop()` guarda fragmento incompleto para el próximo chunk.
- `delta.content` (streaming) vs `message.content` (respuesta completa).
- `data: [DONE]` = señal de fin (no es JSON parseable).

### Reactividad del append
```ts
private anexarAlUltimo(pedazo: string): void {
  this.historial.update((h) => {
    const ultimo = h[h.length - 1];
    return [...h.slice(0, -1), { ...ultimo, contenido: ultimo.contenido + pedazo }];
  });
}
```
Cada chunk crea nuevo array + nuevo objeto del último mensaje →
signals disparan re-render granular y ves la respuesta "escribiéndose".

## Toggle en la UI
Checkbox cambia `streaming()`; `preguntar()` elige estrategia:
```ts
if (this.streaming()) await this.preguntarConStream();
else await this.preguntarSinStream();
```

## Comparativa
| | Sin streaming (M21) | Streaming (M22) |
|---|---|---|
| UX | Espera completa, luego todo junto | Token a token, sensación viva |
| Complejidad HTTP | `await respuesta.json()` | Leer `body` con reader |
| Errores parciales | Todo o nada | Texto parcial queda visible |

## Errores comunes
| Error | Causa | Fix |
|---|---|---|
| Texto llega de golpe | Usaste `decode(value)` sin `{stream: true}` | Pasar la opción |
| `Unexpected token` en JSON.parse | Línea cortada entre chunks | Guardar `pop()` en buffer |
| El último mensaje no se ve | El append creaba el mismo objeto | Spread de objeto + slice del array |
| Stream termina cortado | `data: [DONE]` tratado como JSON | Comparar string antes de parse |

## Ejercicio
1. Cursor parpadeante CSS `▌` mientras el último mensaje está cargando.
2. Cancelar stream con botón (usa `lector.cancel()`).
3. Medir velocidad: mostrar "X tokens/seg" durante streaming.
