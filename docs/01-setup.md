# Módulo 1 — Setup del entorno

## Objetivos
- Tener Node, npm y Angular CLI 22 listos
- Crear proyecto base del curso
- Entender estructura de carpetas generada

## Comandos ejecutados

```powershell
# Verificar entorno base
node --version    # v24.21.0
npm --version     # 11.19.0
ng version        # ERROR: no reconocido → CLI no instalado

# Instalar CLI más reciente
npm i -g @angular/cli@latest
ng version        # Angular CLI 22.2.2

# Crear proyecto
ng new curso-angular-ia --routing --style=css --ssr=false --defaults

# Smoke test: verificar que compila
ng build --configuration development
```

## Flags de `ng new` explicados

| Flag | Efecto |
|---|---|
| `--routing` | Genera `app.routes.ts` + router configurado |
| `--style=css` | Estilos CSS plano (no SCSS) |
| `--ssr=false` | Sin server-side rendering (app cliente pura) |
| `--defaults` | Acepta defaults sin preguntar (git init incluido) |

## Estructura generada

```
curso-angular-ia/
├── angular.json        # Config CLI: build, serve, estilos globales
├── package.json        # Dependencias y scripts npm
├── tsconfig.json       # Config TypeScript
├── public/             # Assets estáticos (favicon, imágenes)
├── docs/               # Documentación del curso (creada por nosotros)
└── src/
    ├── index.html      # HTML raíz donde Angular monta la app
    ├── main.ts         # Punto de entrada: bootstrapApplication()
    ├── styles.css      # Estilos globales
    └── app/
        ├── app.ts          # Componente raíz (standalone)
        ├── app.html        # Template del componente raíz
        ├── app.css         # Estilos del componente raíz
        ├── app.config.ts   # Providers globales (router, etc.)
        ├── app.routes.ts   # Definición de rutas
        └── app.spec.ts     # Test del componente raíz
```

## Conceptos clave Angular 22
- **Standalone**: no hay `NgModule`; cada componente se basta solo.
- **main.ts**: `bootstrapApplication(App, appConfig)` arranca la app.
- **app.config.ts**: providers globales (`provideRouter(routes)`...).
- **Signals por omisión**: el propio template del CLI usa
  `signal('curso-angular-ia')` para el título.

## Comandos del día a día
```powershell
ng serve          # dev server en http://localhost:4200 (hot reload)
ng build          # compilar a dist/
ng test           # correr tests
ng g c features/mi-comp   # generar componente
```

## Errores comunes
- `ng` no reconocido tras instalar → cerrar y reabrir terminal.
- Puerto 4200 ocupado → `ng serve --port 4300`.
- CLI viejo en caché global → desinstalar antes de instalar
  (`npm uninstall -g @angular/cli`).

## Ejercicio
Correr `ng serve`, abrir http://localhost:4200 y cambiar el `signal`
`title` en `src/app/app.ts`. Ver hot-reload aplicar sin refrescar.
