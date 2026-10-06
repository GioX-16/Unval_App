<p align="center">
  <img src="./assets/images/readme/banner.jpg" alt="UNVAL — UNI-VERSE-ALL" width="100%" />
</p>

<!-- Banner: reemplaza `assets/images/readme/banner.jpg` por tu captura para actualizar la portada. -->

<h1 align="center">UNVAL · UNI-VERSE-ALL</h1>

<p align="center">
  <b>La red social de tu universidad.</b><br/>
  Conecta estudiantes y maestros, comparte, vende, aprende y pega en <b>El Muro de la U</b>.
</p>

<p align="center">
  <img alt="Expo SDK" src="https://img.shields.io/badge/Expo-57-000020?logo=expo&logoColor=white" />
  <img alt="React Native" src="https://img.shields.io/badge/React%20Native-0.86-61DAFB?logo=react&logoColor=black" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white" />
  <img alt="Platforms" src="https://img.shields.io/badge/platforms-iOS%20%7C%20Android%20%7C%20Web-lightgrey" />
  <img alt="Estado" src="https://img.shields.io/badge/estado-MVP%20en%20desarrollo-yellow" />
</p>

---

## 📖 ¿Qué es UNVAL?

**UNVAL (UNI-VERSE-ALL)** es una plataforma móvil multiplataforma diseñada para la comunidad
universitaria: **estudiantes y maestros** en un mismo espacio. Reúne en una app el feed social,
el marketplace, las comunidades académicas y la mensajería.

Su gran diferencial es **El Muro de la U**: un lienzo en blanco por carrera donde puedes
**escribir, dibujar y pegar** lo que quieras, con una vida de **24 horas**. Como el corcho de
avisos de siempre… pero digital y efímero.

> Proyecto en construcción activa. La interfaz está avanzada y corre sobre datos de prueba
> (mock); el backend se conectará en una fase posterior.

---

## ✨ Características principales

- 📰 **Feed social** — publicaciones con filtros por anuncios, eventos, academico y marketplace.
- 🧱 **El Muro de la U** — lienzo efímero (24 h) por carrera: escribe, dibuja y pega.
- 🗂️ **Muro Personal** — tus Anuncios (ventas), Logros/Clases y Media en un solo perfil.
- 💬 **Chats** — mensajería directa y grupal; chats libres y chats ligados a comunidades.
- 🔎 **Explorar** — encuentra estudiantes, maestros, comunidades y materias.
- 🎓 **Comunidades y materias** — espacios académicos por carrera.
- 🛒 **Marketplace** — compra y vende material de estudio.
- 🔔 **Notificaciones** — actividad e interacciones.
- 🌓 **Modo claro / oscuro** — se adapta al sistema o a tu preferencia.
- 🌐 **Multi-idioma** — Español e Inglés.

---

## 🛠️ Stack tecnológico

| Capa | Tecnología |
|---|---|
| Entorno | **Expo SDK 57** |
| Runtime | **React Native 0.86** + React 19 |
| Lenguaje | **TypeScript** (estricto) |
| Navegación | **Expo Router** (file-based) |
| Animación | **React Native Reanimated 4** + Worklets |
| Tipografía | **Plus Jakarta Sans** |
| Estilos | Sistema de diseño propio (tokens + primitivas) |

---

## ✅ Requisitos previos

- **Node.js** (LTS) y **npm**
- **Git**
- Para dispositivo físico: la app **Expo Go** (Play Store / App Store)
- Para emuladores: **Android Studio** (AVD) y/o **Xcode** (iOS, solo macOS)

---

## 🚀 Instalación y uso

```bash
# 1. Clona el repositorio
git clone <url-del-repo>
cd UNVAL_APP

# 2. Instala dependencias
npm install

# 3. Inicia el servidor de desarrollo
npx expo start
```

Cuando Expo arranque:

| Tecla | Acción |
|---|---|
| `a` | Abrir en emulador/dispositivo **Android** |
| `i` | Abrir en simulador **iOS** (macOS) |
| `w` | Abrir versión **Web** |
| `r` | Recargar la app |
| `j` | Abrir el debugger |

**En dispositivo físico:** abre **Expo Go**, escanea el código QR que aparece en la terminal
y listo.

> Si cambiaste dependencias o el SDK y ves errores de caché:
> `npx expo start -c`

### Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm start` | Inicia el servidor de Expo |
| `npm run android` | Inicia y abre en Android |
| `npm run ios` | Inicia y abre en iOS |
| `npm run web` | Inicia y abre en Web |
| `npm run typecheck` | Verifica tipos (`tsc --noEmit`) |

### Calidad y verificación

Antes de cerrar una tarea, todo debe pasar en verde:

```bash
npm run typecheck                 # 0 errores de TypeScript
npx expo-doctor                   # 21/21 checks
npx expo export --platform web    # el bundle compila
```

---

## 📂 Estructura del proyecto

```
UNVAL_APP/
├── app/                          # Rutas (Expo Router)
│   ├── _layout.tsx               # Provider de tema + carga de fuentes
│   ├── (tabs)/                   # Navegación por pestañas
│   │   ├── HomeScreen.tsx        # Feed principal
│   │   ├── ExploreScreen.tsx     # Buscar estudiantes / comunidades
│   │   ├── NotifScreen.tsx       # Notificaciones
│   │   └── ProfileScreen.tsx     # Perfil (Muro Personal)
│   ├── modal.tsx                 # Ajustes (modal)
│   └── +not-found.tsx            # Pantalla 404
├── components/
│   ├── ui/                       # Primitivas del sistema (polimórficas)
│   ├── features/                 # Componentes de dominio (skeletons, etc.)
│   ├── PostCard.tsx · AdCard.tsx · ProfileHeader.tsx · SearchCards.tsx
│   ├── TopBar.tsx · BottomTabBar.tsx · SideMenu.tsx · CreatePostBar.tsx
│   └── FeedFilters.tsx · TabSelector.tsx
├── constants/                    # Sistema de diseño y configuración
│   ├── tokens.ts                 # Colores base, espaciado, radios, tipografía, sombras
│   ├── colors.ts                 # Colores semánticos (claro/oscuro)
│   ├── typography.ts             # Escala tipográfica
│   ├── Theme.ts                  # Tokens agregados
│   └── AppContext.tsx            # Tema + i18n (ES/EN)
├── assets/                       # Imágenes, fuentes y marca
└── docs/                         # Documentación del proyecto
```

---

## 🎨 Sistema de diseño

La app se construye sobre un **sistema de diseño centralizado** para mantener coherencia en
iOS, Android y Web:

- **Tokens** en `constants/tokens.ts` — el color institucional se cambia en **una sola línea**
  (`brand.seed`).
- **Tipografía** con Plus Jakarta Sans (`constants/typography.ts`).
- **Primitivas polimórficas** en `components/ui/` (`ScreenContainer`, `Typography`, `Card`,
  `Button`, `Avatar`, `Input`, `Skeleton`, `EmptyState`, `ErrorState`).

Reglas: nada de colores hardcodeados, toda pantalla usa `ScreenContainer`, y los componentes
base aceptan la prop `as` para cambiar su elemento subyacente.

> Detalles completos en [`docs/DESIGN.md`](./docs/DESIGN.md).

---

## 📚 Documentación

| Documento | Contenido |
|---|---|
| [`AGENTS.md`](./AGENTS.md) | Punto de entrada para agentes de IA y colaboradores. |
| [`docs/PROJECT.md`](./docs/PROJECT.md) | Qué es, alcance del MVP, inventario de pantallas y roadmap. |
| [`docs/DESIGN.md`](./docs/DESIGN.md) | Sistema de diseño, tokens, tipografía, primitivas y El Muro. |
| [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) | Stack, estructura, navegación, capa de datos y backend. |

---

## 🗺️ Roadmap

| Fase | Alcance | Estado |
|---|---|---|
| 0 | Estabilizar base (TypeScript, Expo SDK 57, dependencias) | ✅ |
| 1 | Sistema de diseño (tokens + tipografía) | ✅ |
| 1.5 | Kit de primitivas + `ScreenContainer` + estados | ✅ |
| 2 | Shell de navegación (5 tabs) + capa de datos mock | ⏳ |
| 3 | Feed completo (detalle, comentarios, crear publicación) | ⏳ |
| 4 | El Muro de la U | ⏳ |
| 5 | Chats (1:1 y grupales) | ⏳ |
| 6 | Perfiles, Explorar y Comunidades | ⏳ |
| 7 | Notificaciones, Ajustes y Marketplace | ⏳ |
| 8 | Autenticación y Onboarding | ⏳ |
| 9 | Backend real, tiempo real e iOS | ⏳ |

> Autenticación **mock** para la demo. El backend se implementará sobre una **capa gratuita**
> (Supabase / Firebase / Appwrite).

---

## 👥 Equipo

Desarrollado con ❤️ para la comunidad de **UNVAL**.

<p align="center"><sub>UNVAL · UNI-VERSE-ALL — Hecho para la universidad.</sub></p>
