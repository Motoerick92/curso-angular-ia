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
  readonly modelo = signal('meta-llama/llama-3.2-3b-instruct:free');

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
      // fetch nativo con POST: sin necesidad de HttpClient para esta demo
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
    } catch (e) {
      this.error.set(e instanceof Error ? e.message : 'Error desconocido');
      // Quitamos el turno del usuario para permitir reintento limpio
      this.historial.update((h) => h.slice(0, -1));
    } finally {
      this.cargando.set(false);
    }
  }

  limpiar(): void {
    this.historial.set([]);
    this.error.set(null);
  }
}
