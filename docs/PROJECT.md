# PROJECT.md — UNVAL (UNI-VERSE-ALL)

## 1. Qué es
Red social universitaria móvil para **estudiantes y maestros**. Combina feed social,
marketplace, comunidades académicas y mensajería, con un diferencial: **El Muro de la U**,
un lienzo efímero de 24 horas por carrera.

- **Plataformas objetivo:** iOS, Android y Web (Expo / React Native).
- **Estado:** UI avanzada sobre datos mock; sin backend todavía.

## 2. Visión y diferencial
- **El Muro de la U**: un **lienzo en blanco por carrera** (Sistemas, Civil, Industrial…)
  donde los estudiantes escriben, dibujan y pegan lo que quieran. Todo el contenido
  **caduca a las 24 h** (sensación de aviso universitario efímero). Es lo nuevo frente a
  un feed cronológico tradicional.
- **Muro Personal**: lo propio del usuario, dividido en tres secciones permanentes:
  1. **Mis Anuncios** — ventas / marketplace.
  2. **Logros / Clases** — logros académicos y de clases.
  3. **Media** — galería de fotos y logros obtenidos.

## 3. Alcance del MVP
**Núcleo (P0): 18 pantallas · Extendido (P1): +6 = 24 pantallas.**
Más modales/sheets transversales (comentarios, compartir, reportar, filtros, adjuntar media).

### 3.1 Autenticación y onboarding (3)
| # | Pantalla | P | Estado |
|---|---|---|---|
| 1 | Login (correo institucional / social) | P0 | ➕ |
| 2 | Registro | P0 | ➕ |
| 3 | Onboarding (universidad, carrera, semestre, intereses) | P0 | ➕ |

> Auth será **mock** para la demo; el flujo real se difiere.

### 3.2 Navegación (shell)
Tabs: **Inicio · Muro · Chats · Explorar · Perfil** (5). `BottomTabBar` custom + `ScreenContainer`.

### 3.3 Inicio / Feed (4)
| # | Pantalla | P | Estado |
|---|---|---|---|
| 4 | Feed principal | P0 | 🟡 |
| 5 | Detalle de publicación + comentarios | P0 | ➕ |
| 6 | Crear publicación | P0 | ➕ |
| 7 | Detalle de anuncio (marketplace) | P1 | ➕ |

### 3.4 El Muro de la U (3)
| # | Pantalla | P | Estado |
|---|---|---|---|
| 8 | **Muro Global** (lienzo por carrera, TTL 24 h) | P0 | ➕ |
| 9 | Composer del Muro (texto/dibujo/imagen) | P0 | ➕ |
| 10 | Detalle de trazo/nota + reacciones | P0 | ➕ |

### 3.5 Chats (5)
| # | Pantalla | P | Estado |
|---|---|---|---|
| 11 | Lista de conversaciones | P0 | ➕ |
| 12 | Chat 1:1 (estudiante↔estudiante, estudiante↔maestro) | P0 | ➕ |
| 13 | Chat grupal | P0 | ➕ |
| 14 | Nuevo chat / crear grupo | P0 | ➕ |
| 15 | Info y gestión del grupo | P1 | ➕ |

> **Chats libres** (DM/grupos creados por el usuario) **+ chats de comunidad**
> (agrupados dentro de cada comunidad/materia).

### 3.6 Explorar / Descubrir (4)
| # | Pantalla | P | Estado |
|---|---|---|---|
| 16 | Explorar (búsqueda global) | P0 | 🟡 |
| 17 | Perfil público (estudiante / maestro) | P0 | ➕ |
| 18 | Detalle de comunidad | P1 | ➕ |
| 19 | Detalle de materia | P1 | ➕ |

### 3.7 Perfil (4)
| # | Pantalla | P | Estado |
|---|---|---|---|
| 20 | Perfil propio (**Muro Personal**: 3 secciones) | P0 | 🟡 |
| 21 | Editar perfil (de modal a pantalla) | P0 | 🟡 |
| 22 | Ajustes / configuración | P1 | ➕ |
| 23 | Guardados | P1 | ➕ |

### 3.8 Notificaciones (1)
| # | Pantalla | P | Estado |
|---|---|---|---|
| 24 | Notificaciones | P0 | 🟡 |

## 4. Módulos
1. **Feed** — publicaciones cronológica, filtros por tipo (anuncios/eventos/académico/marketplace).
2. **Muro de la U** — lienzo global por carrera (24 h) + Muro Personal.
3. **Chats** — mensajería directa y grupal; libre y por comunidad.
4. **Explorar / Comunidades / Materias** — descubrimiento y agrupación.
5. **Perfiles** — propio (editable) y público; roles estudiante/maestro.
6. **Notificaciones** — actividad e interacciones.
7. **Marketplace** — anuncios/ventas (parte del Muro Personal en "Mis Anuncios").

## 5. Roles e identidad
- **Estudiante**: acento vibrante (gradiente azul→violeta, coral).
- **Maestro**: acento formal (dorado académico + slate).
- Se selecciona por rol del usuario, no por pantalla.

## 6. Decisiones
- **Backend**: pendiente. Se usará **capa gratuita** (Supabase / Firebase / Appwrite). Mientras, **store mock**.
- **Autenticación**: **mock** para la demo.
- **Muro Global**: alcance **por carrera**, TTL **24 h**.

## 7. Roadmap por fases
| Fase | Alcance | Estado |
|---|---|---|
| 0 | Estabilizar base (TS, SDK 57, deps) | ✅ |
| 1 | Sistema de diseño (tokens + tipografía) | ✅ |
| 1.5 | Kit de primitivas polimórficas + `ScreenContainer` + estados | ✅ |
| 2 | Shell de 5 tabs + capa de datos mock (`data/`) | ⏳ |
| 3 | Feed completo (4–7) | ⏳ |
| 4 | El Muro de la U (8–10) | ⏳ |
| 5 | Chats (11–15) | ⏳ |
| 6 | Perfiles, Explorar y Comunidades (16–19) | ⏳ |
| 7 | Notificaciones, Ajustes, Guardados, Marketplace (22–24) | ⏳ |
| 8 | Autenticación y Onboarding (1–3) | ⏳ |
| 9 | Backend real + tiempo real + iOS (IOS-Builder) | ⏳ |

Cada fase cierra con: `npm run typecheck` + `npx expo-doctor` + `npx expo export --platform web`.
