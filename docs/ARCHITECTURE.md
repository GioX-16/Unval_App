# ARCHITECTURE.md — Estructura y Arquitectura de UNVAL

## 1. Stack
| Capa | Tecnología |
|---|---|
| Runtime | Expo SDK **57** · React Native **0.86** · React 19 |
| Lenguaje | TypeScript (estricto) |
| Navegación | Expo Router (file-based) |
| Animación | React Native Reanimated 4 + Worklets |
| Tipografía | Plus Jakarta Sans (`@expo-google-fonts`) |
| Estado (hoy) | React Context mock (`constants/AppContext.tsx`) |

**Verificación obligatoria:** `npm run typecheck` · `npx expo-doctor` (21/21) · `npx expo export --platform web`.

## 2. Estructura de carpetas
### Actual
```
app/                        # rutas (Expo Router)
  _layout.tsx               # provider de tema + carga de fuentes
  +html.tsx +not-found.tsx modal.tsx
  (tabs)/                   # tabs actuales (4): Home, Explore, Notif, Profile
components/
  ui/                       # primitivas polimórficas (Fase 1.5)
  features/                 # Skeletons de dominio
  TopBar, BottomTabBar, PostCard, AdCard, ProfileHeader, SearchCards,
  FeedFilters, TabSelector, SideMenu, CreatePostBar
constants/
  tokens.ts                 # primitivas de diseño
  colors.ts                 # colores semánticos light/dark
  typography.ts             # escala tipográfica
  Theme.ts                  # agregado (re-export)
  AppContext.tsx            # tema + i18n (ES/EN)
  Images.ts
```

### Objetivo (próximas fases)
```
app/
  (auth)/                   # login · register · onboarding
  (tabs)/                   # index (feed) · muro · chats · explore · profile
  post/[id].tsx · note/[id].tsx · chat/[id].tsx
  user/[id].tsx · community/[id].tsx
  settings.tsx · saved.tsx
  create/post.tsx · create/note.tsx · create/chat.tsx
data/                       # NUEVO: tipos + store mock + hooks
  types.ts
  store.tsx                 # provider mock (seed)
  hooks.ts                  # useFeed · useChat · useWall · useProfile
components/features/        # componentes de dominio adicionales
```

## 3. Sistema de diseño en código
- **Tokens** (`constants/tokens.ts`): `brand`, `gray`, `status`, `spacing`, `borderRadius`,
  `fontSize`, `fontWeight`, `lineHeight`, `fontFamily`, `iconSize`, `shadow`, `opacity`, `zIndex`, `motion`.
- **Color semántico** (`constants/colors.ts`): `lightColors` / `darkColors` (`ThemeColors`).
- **Tipografía** (`constants/typography.ts`): variantes `display→overline`.
- **Acceso en runtime**: `useAppTheme().colors` (theme-aware) y `Theme.*` (estático).
- **Regla:** prohibido hardcodear; el color institucional se cambia solo en `brand.seed`.

## 4. Kit UI polimórfico
Patrón en `components/ui/polymorphic.ts`:
- `AsProp<C>`, `PolymorphicComponentProps<C, OwnProps>`, `PolymorphicRef<C>`.
- `resolveAs(as, fallback)`: componentes RN directos; strings semánticos → `View` + `accessibilityRole`.
- Los componentes se exportan con `forwardRef(...) as unknown as <C ...>(props) => ReactElement`.

Componentes: `ScreenContainer`, `Typography`, `Card`, `Button`, `IconButton`, `Avatar`,
`Input`, `Skeleton`/`SkeletonLines`, `EmptyState`, `ErrorState` (barrel en `components/ui/index.ts`).

## 5. Navegación (objetivo)
```
(auth)                     ← gate de sesión (mock)
(tabs)
  index      → Feed
  muro       → Muro Global (por carrera)
  chats      → Conversaciones
  explore    → Explorar
  profile    → Perfil propio (Muro Personal)
post/[id] · note/[id] · chat/[id] · user/[id] · community/[id]
create/post · create/note · create/chat (modales)
settings · saved · modal
```
`BottomTabBar` custom controla la navegación; `ScreenContainer` integra SafeArea + TopBar + TabBar + SideMenu.
La `Tabs` de Expo Router se mantiene oculta (`display: 'none'`) por compatibilidad de rutas.

## 6. Capa de datos (a crear en Fase 2)
Hoy TODO es mock en memoria dentro de las pantallas. Se centralizará así:
- **`data/types.ts`**: `User` (rol estudiante/maestro), `Post`, `Comment`, `Note` (Muro),
  `Conversation` (libre/comunidad, 1:1/grupo), `Message`, `Community`, `Subject`, `Ad`, `Notification`.
- **`data/store.tsx`**: provider mock con seed + mutaciones (like, publicar, enviar mensaje, pegar nota).
- **`data/hooks.ts`**: `useFeed`, `useWall`, `useChat`, `useProfile`, `useNotifications`.
- **Contrato** para migrar: las pantallas consumen hooks, nunca datos crudos. Sustituir el store
  por API/real-time sin tocar la UI.

## 7. Plan de backend (capa gratuita, pendiente)
Sin decisión final. Candidatos y encaje:
| Opción | Ventaja | Uso previsto |
|---|---|---|
| **Supabase** | Postgres + Realtime + Auth + Storage, free tier | Chats, Muro, feed |
| **Firebase** | Firestore + FCM, free tier | Alternativa, notificaciones push |
| **Appwrite** | Self-host + free tier | Alternativa |

Estrategia: construir todo contra el **store mock**; al decidir, implementar un adaptador con la
misma firma de hooks. Auth seguirá **mock** hasta después del MVP.

## 8. Convenciones
- TypeScript estricto; sin `any` salvo en fronteras de polimorfismo ya encapsuladas.
- `fontFamily` por peso (no `fontWeight`) para fuentes custom.
- Carpetas: `app/` rutas · `components/ui/` primitivas · `components/features/` dominio ·
  `constants/` diseño · `data/` datos.
- Una pantalla nueva **siempre** envuelta en `ScreenContainer`.
- i18n ES/EN vía `constants/AppContext.tsx` (`useTranslation().t`).

## 9. Estado de fases
| Fase | Alcance | Estado |
|---|---|---|
| 0 | Estabilizar base (TS, SDK 57, deps) | ✅ |
| 1 | Tokens + tipografía | ✅ |
| 1.5 | Kit polimórfico + `ScreenContainer` + estados | ✅ |
| 2 | Shell 5 tabs + `data/` mock | ⏳ |
| 3 | Feed | ⏳ |
| 4 | El Muro de la U | ⏳ |
| 5 | Chats | ⏳ |
| 6 | Perfiles/Explorar/Comunidades | ⏳ |
| 7 | Notificaciones/Ajustes/Guardados/Marketplace | ⏳ |
| 8 | Auth + Onboarding | ⏳ |
| 9 | Backend real + tiempo real + iOS | ⏳ |

## 10. Decisiones abiertas
- Backend: Supabase vs Firebase vs Appwrite (free tier). Pendiente.
- Real-time de chats y Muro: definir transporte al elegir backend.
- iOS vía IOS-Builder: se aborda en Fase 9 (mantener RN cross-platform hasta entonces).
