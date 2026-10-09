# 🎬 GUION DEL CURSO — Angular 22 + IA (texto para narração)

Guion por video/módulo. Cada bloque tiene: hook, desarrollo, cierre.
Los textos están listos para leerse en cámara o para voice-over.

---

## VIDEO 0 — Introducción del curso

**Hook (0:00):**
"En este curso no solo aprenderás Angular 22. Vas a construir una app COMPLETA
con signals, control flow moderno, reactive forms, RxJS, SSR y — la parte
que nadie más enseña — integración con inteligencia artificial: chat con
streaming, formularios autocompletados por IA, y un dashboard final profesional."

**Estructura:**
"24 módulos, 5 fases. Cada lección: código en vivo, un error REAL resuelto
en cámara (porque eso es la vida real), y un ejercicio. Al final tendrás
un repo en GitHub digno de portafolio."

**Stack:** Node 24, Angular CLI 22.2, signals, standalone, Vitest, SSR, OpenRouter free.

**Cierre:** "Sin prerequisitos de Angular anterior. Solo JS/TS básico. Empezamos."

---

## VIDEO 1 — M1: Setup del entorno

**Hook:** "Angular en 2026 instala diferente a 2022. Todo el material viejo ya no aplica."

**Desarrollo:**
1. Mostrar `node --version`, `npm --version`. Explicar Node LTS.
2. `npm i -g @angular/cli@latest` — esperar instalación narrando qué hace.
3. `ng version` → mostrar 22.2.2. "Estamos en la versión más nueva."
4. `ng new curso-angular-ia --routing --style=css --ssr=false --defaults`
   - Explicar CADA flag mientras corre.
5. Tour rápido por estructura: `src/main.ts`, `app.config.ts`, `app.ts`.
   Destacar: "no hay NgModule. Angular 22 es 100% standalone-signals".
6. `ng build` smoke test. "Primer compile, todo verde".

**Cierre:** "Tienen el proyecto corriendo. En el próximo video: nuestro
primer componente y cómo Angular pinta datos en el HTML."

**Ejercicio:** `ng serve`, cambiar el `signal('curso-angular-ia')` y ver
hot reload.

---

## VIDEO 2 — M2: Componentes standalone + interpolación

**Hook:** "Un componente Angular es solo una clase TypeScript. Vamos a demostrarlo."

**Desarrollo:**
1. `ng g c features/inicio` — explicar qué genera (4 archivos).
2. Mostrar el decorador `@Component` línea por línea.
3. Escribir propiedades: `titulo`, `moduloActual`, `completado`.
4. Template: mostrar con `{{ titulo }}`, getter `{{ progreso }}`, método `{{ saludar() }}`, ternario.
5. Ruta: `app.routes.ts` con `path: ''` + `app.html` con `<router-outlet />`.
6. Error real: si olvidas importar en `imports: []` la etiqueta no renderiza. Mostrar cómo se ve.

**Cierre:** "Ya tienes una app que renderiza y cambia. Siguiente: conectar
los clicks y los inputs."

**Ejercicio:** agregar `alumno = 'Tu nombre'` y método `doble(n)`.

---

## VIDEO 3 — M3: Data Binding

**Hook:** "Hay 4 formas de pasar datos entre clase y template. Vamos a usarlas todas."

**Desarrollo:**
1. Explicar línea por línea: `{{ }}`, `[prop]`, `(event)`, `[()`]`.
2. Demo 1: property `[disabled]` y `[src]` de imagen.
3. Demo 2: event `(click)="contarClic()"` con contador.
4. Demo 3: `[(ngModel)]` con signal + `FormsModule`. Escribir y ver el cambio en dos sitios.

**Cierre:** "Ya puedes interactuar. Siguiente: controlar qué se ve y listas."

**Ejercicio:** segundo input apellido, mostrar nombre completo.

---

## VIDEO 4 — M4: Control Flow `@if` `@for` `@switch`

**Hook:** "Angular cambió CÓMO se hace el if/for. Sintaxis nueva de 2023 y es OBLIGATORIA."

**Desarrollo:**
1. `@if` con botón mostrar/ocultar. Explicar que NO es display:none.
2. `@for` con `track tarea.id` — explicar por qué `track` es obligatorio.
3. `@empty` para lista vacía.
4. `@switch` de pestañas (lista / stats / config).
5. **Bug real:** pegar `@if` en texto → NG5002 → explicar `&#64;`.

**Cierre:** "Ya no hay que importar NgIf/NgFor. Todo nativo."

**Ejercicio:** agregar filtro par/impar con `@if ($even)`.

---

## VIDEO 5 — M5: Pipes y Directivas

**Hook:** "Transformas datos sin tocar la lógica. Todo en el template."

**Desarrollo:**
1. Built-ins: `uppercase`, `titlecase`, `currency`, `date`, `slice`, `json`.
2. Crear pipe custom: `ng g pipe shared/pipes/truncate`. Mostrar código.
3. Directivas built-in: `ngClass`, `ngStyle` condicionales.
4. Crear directiva custom `appResaltar` con `ElementRef` + `@HostListener`.
5. Mostrar input de la directiva: `color="#a6e3a1"`.

**Cierre:** "Pipes para datos, directivas para comportamiento."

**Ejercicio:** hacer pipe `reverse`.

---

## VIDEO 6 — M6: Signals

**Hook:** "Esto es lo más importante de Angular moderno. Signals cambiaron todo."

**Desarrollo:**
1. Qué es: sistema reactivo granular. "Sabe exactamente qué cambió."
2. `signal()` crear — leer con `()`, escribir con `set()` y `update()`.
3. Contador demo en vivo.
4. `computed()` — derivados automáticos, lazy, cacheados.
5. `effect()` — log en consola (F12 visible).
6. Error clásico: olvidar `()` en template → muestra `[object Signal]`.

**Cierre:** "Esto reemplaza la mitad de RxJS en apps normales."

**Ejercicio:** computed que agregue badge si es múltiplo de 5.

---

## VIDEO 7 — M7: Inputs/Outputs/Model

**Hook:** "Cómo se comunican componentes padre e hijo sin servicios."

**Desarrollo:**
1. `ng g c features/io/tarjeta-tarea` dentro del padre `io`.
2. `input.required<Tarea>()` — obligatorio, error si falta.
3. `output<boolean>()` con `emit()`.
4. `model(false)` = two-way con `[(seleccionada)]`.
5. Patrón: padre es dueño del estado, hijo solo presenta.
6. Computed sobre input para prioridad.

**Cierre:** "input baja, output sube. Model es los dos."

**Ejercicio:** output `duplicar` que inserte copia.

---

## VIDEO 8 — M8: Servicios + inject()

**Hook:** "Cuando el estado vive en el componente, se pierde entre rutas. Los servicios lo arreglan."

**Desarrollo:**
1. `ng g s core/services/tareas` con `providedIn: 'root'` = singleton.
2. Encapsulación: `_tareas` privado + `asReadonly()` público.
3. Métodos como puerta única: `agregar`, `alternar`, `eliminar`.
4. Computeds compartidos: `total`, `completadas`, `pendientes`.
5. Componente solo inyecta y delega — "componente tonto, servicio inteligente".
6. Reutilización: misma TarjetaTarea de M7 sin cambios.

**Cierre:** "Esto es la base del state management. Guarda este patrón."

**Ejercicio:** persistir en localStorage con `effect()`.

---

## VIDEO 9 — M9: Routing (params, lazy, guards)

**Hook:** "Tres cosas que separan una app de juguete de una real."

**Desarrollo:**
1. Ruta con parámetro: `path: 'tarea/:id'`. Mostrar `/tarea/2`.
2. `withComponentInputBinding` en `app.config.ts` → el `:id` llega como `input()`.
3. `loadComponent` → chunk separado (mostrar el chunk en build output).
4. `authGuard: CanActivateFn` — si no logueado, redirige.
5. Servicio `Auth` + login en topbar.
6. Wildcard `**` siempre al final.

**Cierre:** "Lazy + guards = apps grandes rápidas."

**Ejercicio:** guard que exija `usuario === 'admin'`.

---

## VIDEO 10 — M10: HTTP + httpResource + interceptores

**Hook:** "Angular 22 cambió cómo se hacen llamadas HTTP. Ya no necesitas subscribe."

**Desarrollo:**
1. `provideHttpClient(withInterceptors([authInterceptor]))` en la config.
2. `httpResource<TareaApi[]>(() => ({ url, params }))` — mostrar 4 signals: value, isLoading, error, status.
3. El límite es un signal → cambiarlo relanza la request. Demo en vivo.
4. Interceptor reutilizable: log + header de auth.
5. `@let` en template para no repetir `value()`.

**Cierre:** "Signals + HTTP sin RxJS manual."

**Ejercicio:** interceptor que loguee tiempos.

---

## VIDEO 11 — M11: Forms template-driven

**Hook:** "Cuando el formulario es simple, esta es la vía rápida."

**Desarrollo:**
1. `FormsModule` obligatorio.
2. `[(ngModel)]` two-way en inputs.
3. `#formulario="ngForm"` para validar todo junto.
4. Estados CSS automáticos: ng-valid/ng-invalid/ng-touched.
5. `markAllAsTouched` + submit deshabilitado.

**Cierre:** "Sirve para forms rápidos. Para producción grande: reactive."

**Ejercicio:** campo teléfono con pattern.

---

## VIDEO 12 — M12: Reactive Forms + custom validators

**Hook:** "Esto es lo que usan las empresas. Demostrable en tests."

**Desarrollo:**
1. `ReactiveFormsModule` (NO FormsModule).
2. `FormBuilder` en TS: todo el form declarado.
3. `formControlName` en el HTML — solo conecta.
4. Validador custom sin params: `noEspacios`.
5. Validador custom factory: `edadMinima(18)`.
6. Grupo anidado `direccion` con `formGroupName`.
7. `markAllAsTouched` al submit para mostrar errores de todos.

**Cierre:** "Todo testeable desde TS puro."

**Ejercicio:** password fuerte custom.

---

## VIDEO 13 — M13: RxJS esencial

**Hook:** "Signals no reemplazan TODO RxJS. Esto es para streams de eventos."

**Desarrollo:**
1. Demo: buscador de usuarios contra API real.
2. Pipeline explicado línea a línea: debounceTime → distinctUntilChanged → filter → switchMap.
3. `switchMap` vs `mergeMap` (cancella vs acumula).
4. `takeUntilDestroyed` — cero líneas de cleanup.
5. RxJS orquesta, signals muestran.

**Cierre:** "Aprende 6 operadores y domina el 90% de los casos."

**Ejercicio:** switch a search por email también.

---

## VIDEO 14 — M14: Comunicación entre componentes

**Hook:** "¿Y si dos componentes no son padre-hijo?"

**Desarrollo:**
1. Tabla decisión: input/output para directos; viewChild para comandos; servicio para distintas rutas.
2. Servicio `Puente` — mensaje que sobrevive a la navegación.
3. viewChild(): padre llama método `resetear()` del hijo.
4. Demo: enviar mensaje → irse → volver → mensaje sigue.

**Cierre:** "Singleton = mensajería entre todo."

**Ejercicio:** segundo componente que inyecte Puente en otra ruta.

---

## VIDEO 15 — M15: Pipe async

**Hook:** "Suscripciones sin subscribe: Angular lo hace solo."

**Desarrollo:**
1. `timer(0, 1000)` + `| async` = reloj.
2. `BehaviorSubject(1)` + switchMap → post por id.
3. `@let post = post$ | async` + `@if`.
4. Cuándo async vs signal vs httpResource (tabla).

**Cierre:** "Para streams largos, pipe async. Para estado, signals."

**Ejercicio:** formato mm:ss con map al timer.

---

## VIDEO 16 — M16: State management store

**Hook:** "Store sin librerías externas. Solo signals y TypeScript."

**Desarrollo:**
1. Estado desnormalizado: `{ entidades, orden, filtro }`.
2. Selectores computados: `lista`, `visibles`, `total`, `completadas`.
3. Acciones: única puerta de mutación.
4. Demo: filtros reactivos live.
5. Debug: estado interno en `<details>` con `debugEstado`.

**Cierre:** "Este store basta para el 95% de apps. Si necesitas más, NgRx SignalStore."

**Ejercicio:** porcentaje de progreso con computed.

---

## VIDEO 17 — M17: OnPush + optimización

**Hook:** "Por qué apps Angular se ponen lentas y cómo evitarlo."

**Desarrollo:**
1. `ChangeDetectionStrategy.OnPush` en hijo.
2. `track item.id` en @for.
3. Inmutabilidad = nueva referencia → CD skipa lo no cambiado.
4. **Bug real capturado:** escribir signal durante render → NG0600 → fix `ngAfterViewChecked`.
5. Contador de renders: solo el editado sube.

**Cierre:** "OnPush como default. El dif entre principiante y senior está aquí."

**Ejercicio:** agregar logs de render por tick.

---

## VIDEO 18 — M18: Directivas estructurales custom

**Hook:** "Recreamos la magia de *ngIf desde cero."

**Desarrollo:**
1. Cómo el `*` se descompone en `<ng-template>`.
2. `TemplateRef` + `ViewContainerRef` + `createEmbeddedView`.
3. Contexto con `$implicit`.
4. `*appRepetir` — repite N veces.
5. `*appSiRol` — visibilidad por usuario logueado.
6. Bug real: `{` literal rompe el template → escapar `&#123;`.

**Cierre:** "Entender esto quita el misterio a las directivas del framework."

**Ejercicio:** directiva que solo se muestre si `innerWidth > 768`.

---

## VIDEO 19 — M19: Testing

**Hook:** "El repo con tests verdes es el que pasa la entrevista."

**Desarrollo:**
1. `ng test --watch=false`.
2. Pipe puro: `new TruncatePipe()`, sin Angular.
3. Servicio: `TestBed.inject(Tareas)`.
4. Componente: `fixture.detectChanges()` + DOM real.
5. Directiva: componente anfitrión de prueba.
6. **Bugs reales:** NG0950 (input required), NG0201 (provideRouter en tests),
   `spyOn` de Jasmine vs `vi.spyOn` de Vitest.
7. 74/74 verdes.

**Cierre:** "Tests que confías = refactor sin miedo."

**Ejercicio:** test para filtrar tareas del store.

---

## VIDEO 20 — M20: SSR + SEO

**Hook:** "Angular compila a estático Y sirve dinámico. Los dos a la vez."

**Desarrollo:**
1. `ng add @angular/ssr` — conflicto peers real, fix documentado.
2. `RenderMode.Prerender` vs `Server` en `app.routes.server.ts`.
3. Params dinámicos → Server, estáticas → Prerender.
4. Title/Meta por componente.
5. **Bug real:** localStorage no existe en Node → `isPlatformBrowser`.

**Cierre:** "Apps rápidas que Google entiende."

**Ejercicio:** `getPrerenderParams` para `/tarea/1` y `/tarea/2`.

---

## VIDEO 21 — M21: Integrar API de IA

**Hook:** "Acá empieza lo que diferencia este curso. Angular + IA real."

**Desarrollo:**
1. `IaService` con fetch nativo — sin librerías extra.
2. `generarTexto()` genérico + `preguntar()` con historial.
3. Config editable: key, modelo, streaming toggle en UI.
4. Chat con burbujas por rol.
5. Lección: guardar key en localStorage, no en código.
6. Free tier de OpenRouter.

**Cierre:** "Tienes IA funcionando desde Angular."

**Ejercicio:** botón que guarde chat en .txt.

---

## VIDEO 22 — M22: Streaming SSE

**Hook:** "Como ChatGPT: la respuesta aparece palabra por palabra."

**Desarrollo:**
1. `stream: true` en la request.
2. `respuesta.body.getReader()` + While loop.
3. `TextDecoder({stream: true})` + buffer para chunks cortados.
4. Parseo SSE: línea `data: {...}` y `[DONE]`.
5. Append reactivo al último mensaje del historial.
6. Toggle on/off para comparar UX.

**Cierre:** "Esto se siente profesional al instante."

**Ejercicio:** contador de chunks recibidos.

---

## VIDEO 23 — M23: IA en formularios

**Hook:** "Escribes el título, la IA rellena el resto."

**Desarrollo:**
1. Método `generarTexto` aislado del chat.
2. Prompt system pidiendo SOLO JSON.
3. Parseo defensivo con regex `/\{[\s\S]*\}/` + validación de enums.
4. `patchValue()` rellena sin pisar lo del usuario.
5. Integración con el store de M16 — botón guardar lo persiste.
6. Bugs reales: spyOn vs vi.spyOn, escape de llaves en template doc.

**Cierre:** "IA que trabaja contigo, no al revés."

**Ejercicio:** sugerir 3 títulos alternativos.

---

## VIDEO 24 — M24: Proyecto final

**Hook:** "Todo lo aprendido, en una sola pantalla."

**Desarrollo:**
1. Dashboard sin estado propio — solo compone servicios existentes.
2. 4 tarjetas de stats del store.
3. Barra de progreso animada.
4. Botón "Resumen con IA" con skeleton.
5. Badge de ánimo según progreso.
6. Panel bloqueado sin login (guard UX).
7. SEO Title/Meta en el dashboard.

**Cierre:** "Este repo es tu portafolio. Súbelo a GitHub, compártelo."

**Ejercicio (final):** agregar página de logros.

---

## BONUS — Rebuild UI (M25)

**Hook:** "Se veía como app de alumno. Vamos a que parezca producto."

**Desarrollo (3 videos largos):**

1. **Paso 0-1:** Tailwind v4 + design system:
   - Instalación, `.postcssrc.json` (bug de JSON con comentarios)
   - `@import` order
   - theme.css con paleta Indigo/Fuchsia/Slate
   - Gradientes radiales, scrollbar, selection
   - `ui-card` primera pieza

2. **Paso 2:** UI kit completo:
   - button/badge/input/skeleton
   - showcase a `/ui-kit`

3. **Paso 3:** Layout:
   - Sidebar con iconos + buscador RxJS que filtra
   - Topbar sticky con avatar del usuario
   - max-w-7xl contenedor

4. **Paso 4:** Rebuild de features:
   - Dashboard premium (stats, progreso, grid 2 col, coach IA)
   - Inicio hero con texto degradado
   - Resto de páginas con ui-cards + theme
   - **Bug real zoneless:** propiedad plana no re-renderiza en tests → signal.

**Cierre:** "La diferencia entre junior y mid está en estos detalles."

---

## NOTAS DE PRODUCCIÓN

- **Cada video**: mostrar error real cuando existe. Es oro educativo.
- **Tiempo estimado por video**: 8-15 min (los de UI, hasta 25).
- **Grabar en 1080p**, fuente 18-20px, fondo oscuro del editor.
- **Zoom en código** cuando haya detalle crítico (signals, interceptor).
- **Chapters** en YouTube con los nombres arriba.
- **Thumbnails**: mismo fondo gradiente indigo→fuchsia del app.
