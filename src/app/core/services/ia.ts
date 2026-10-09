import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// Modelo de turno de conversación compatible con APIs OpenAI-like
export interface MensajeIa {
  rol: 'user' | 'assistant' | 'system';
  contenido: string;
}

// ═══════════════════════════════════════════════════════════════
// SERVICIO DE IA: cliente para APIs compatibles con OpenAI.
// Cubre: OpenAI, OpenRouter, Ollama local, LM Studio, etc.
// La key y el endpoint se configuran DESDE LA UI (signals).
// ═══════════════════════════════════════════════════════════════
@Injectable({ providedIn: 'root' })
export class IaService {
  // ── Configuración editable en runtime (defaults: OpenRouter gratis) ──
  readonly baseUrl = signal('https://openrouter.ai/api/v1');
  readonly modelo = signal('apodex/apodex-1.1-mini:free');

  // SSR: localStorage solo existe en navegador. En server → cadena vacía.
  private readonly esNavegador = isPlatformBrowser(inject(PLATFORM_ID));
  readonly apiKey = signal(this.leerKeyInicial());

  private leerKeyInicial(): string {
    return this.esNavegador ? (localStorage.getItem('api-key-ia') ?? '') : '';
  }

  // ── Estado del chat ──
  readonly historial = signal<MensajeIa[]>([]);
  readonly cargando = signal(false);
  readonly error = signal<string | null>(null);
  // Modo streaming: si true, la respuesta llega por chunks SSE
  readonly streaming = signal(true);

  // ── Guardar config y recordarla ──
  configurarApiKey(key: string): void {
    this.apiKey.set(key.trim());
    if (this.esNavegador) localStorage.setItem('api-key-ia', key.trim());
  }

  configurarModelo(modelo: string): void {
    this.modelo.set(modelo.trim());
  }

  // ── Punto principal de M21: request SIN streaming ──
  // POST /chat/completions con historial completo.
  async preguntar(textoUsuario: string): Promise<void> {
    const limpio = textoUsuario.trim();
    if (!limpio || this.cargando()) return;

    // Agregar turno del usuario al historial (inmutable)
    this.historial.update((h) => [...h, { rol: 'user', contenido: limpio }]);
    this.cargando.set(true);
    this.error.set(null);

    try {
      if (this.streaming()) await this.preguntarConStream();
      else await this.preguntarSinStream();
    } catch (e) {
      this.error.set(e instanceof Error ? e.message : 'Error desconocido');
      // Quitamos el turno del usuario para permitir reintento limpio
      this.historial.update((h) => h.slice(0, -1));
    } finally {
      this.cargando.set(false);
    }
  }

  // ── M21: request sin streaming (respuesta completa) ──
  private async preguntarSinStream(): Promise<void> {
      const respuesta = await fetch(`${this.baseUrl()}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey()}`,
        },
        body: JSON.stringify({
          model: this.modelo(),
          messages: this.historial().map((m) => ({
            role: m.rol,
            content: m.contenido,
          })),
          stream: false,   // ← M22 lo cambia a streaming
        }),
      });

      if (!respuesta.ok) {
        throw new Error(`HTTP ${respuesta.status}: ${await respuesta.text()}`);
      }

      const datos = await respuesta.json();
      const contenidoIa =
        datos.choices?.[0]?.message?.content ?? '(respuesta vacía)';

      // Turno del asistente, también inmutable
      this.historial.update((h) => [...h, { rol: 'assistant', contenido: contenidoIa }]);
  }

  // ── M22: STREAMING con Server-Sent Events (SSE) ──
  // La respuesta llega en chunks: data: {"choices":[{"delta":{"content":"..."}}]}
  // Parseamos línea a línea y actualizamos el ÚLTIMO mensaje del historial.
  private async preguntarConStream(): Promise<void> {
    const respuesta = await fetch(`${this.baseUrl()}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey()}`,
      },
      body: JSON.stringify({
        model: this.modelo(),
        messages: this.historial().map((m) => ({ role: m.rol, content: m.contenido })),
        stream: true,   // ← clave: la API devuelve un stream SSE
      }),
    });

    if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}: ${await respuesta.text()}`);
    if (!respuesta.body) throw new Error('Respuesta sin cuerpo');

    // Creamos el turno del asistente VACÍO y lo vamos rellenando
    this.historial.update((h) => [...h, { rol: 'assistant', contenido: '' }]);

    const lector = respuesta.body.getReader();
    const decodificador = new TextDecoder();
    let buffer = '';

    // Bucle de lectura: read() resuelve con cada chunk de bytes
    while (true) {
      const { done, value } = await lector.read();
      if (done) break;

      // Los chunks pueden cortar líneas a la mitad → acumulamos en buffer
      buffer += decodificador.decode(value, { stream: true });

      // SSE separa eventos con línea en blanco; cada línea empieza "data: "
      const lineas = buffer.split('\n');
      buffer = lineas.pop() ?? '';   // guarda la posible línea incompleta

      for (const linea of lineas) {
        if (!linea.startsWith('data: ')) continue;
        const payload = linea.slice(6).trim();
        if (payload === '[DONE]') break;   // fin del stream

        try {
          const json = JSON.parse(payload);
          const delta: string = json.choices?.[0]?.delta?.content ?? '';
          if (delta) this.anexarAlUltimo(delta);
        } catch {
          // chunk de keep-alive o JSON cortado: ignorar
        }
      }
    }
  }

  // Rellena el último turno del historial (el del asistente en curso)
  private anexarAlUltimo(pedazo: string): void {
    this.historial.update((h) => {
      const ultimo = h[h.length - 1];
      return [...h.slice(0, -1), { ...ultimo, contenido: ultimo.contenido + pedazo }];
    });
  }

  limpiar(): void {
    this.historial.set([]);
    this.error.set(null);
  }

  // ── M23: llamada genérica que NO toca el historial del chat ──
  // Útil para formularios, autocompletados, etc. Devuelve texto crudo.
  async generarTexto(instruccion: string, contenido: string): Promise<string> {
    const respuesta = await fetch(`${this.baseUrl()}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey()}`,
      },
      body: JSON.stringify({
        model: this.modelo(),
        messages: [
          { role: 'system', content: instruccion },
          { role: 'user', content: contenido },
        ],
        stream: false,
      }),
    });
    if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
    const datos = await respuesta.json();
    return datos.choices?.[0]?.message?.content ?? '';
  }
}
