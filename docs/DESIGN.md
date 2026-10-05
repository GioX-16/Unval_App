# DESIGN.md — Sistema de Diseño UNVAL

## 1. Dirección de diseño
**Instagram-inspired + institutional-modern + componentes polimórficos.**

- Minimalismo limpio, mucho espacio en blanco, **feed de tarjetas sin bordes**
  (separación por fondo + sombra sutil), avatares/historias protagonistas.
- Estructura institucional pero moderna, apta para el ámbito académico.
- **Doble identidad**: estudiante (vibrante) vs maestro (formal).

### Principios
1. **Feed sin bordes** — tarjetas sobre gris ultra-claro; separadores de 0.5px solo dentro de tarjetas.
2. **Avatares protagonistas** — anillo de gradiente (historias), tamaños generosos, badge de verificación.
3. **Jerarquía por tipografía y espacio** — H1/H2 fuertes, cuerpo respirable. Cero decoración innecesaria.
4. **Motion sutil** — springs cortos en press, shimmer en skeletons, fade en entrada de feed.
5. **Consistencia por tokens** — nada hardcodeado.

## 2. Tokens (`constants/tokens.ts`)
Única fuente de verdad. **Cambiar el color institucional = cambiar `brand.seed` (1 línea).**

- **`brand`**: `seed` (`#0B3D91` placeholder) + escala `50–900` + `identity.student` / `identity.faculty`.
- **`gray`**: neutrales estilo Instagram (`0`…`950`).
- **`status`**: success / error / warning / info.
- **`spacing`**: `xs4 · sm8 · md16 · lg24 · xl32 · xxl48`.
- **`borderRadius`**: `xs4 · sm6 · md10 · lg16 · xl24 · full/pill/circle 9999`.
- **`fontSize` / `fontWeight` / `lineHeight`**: escala base.
- **`fontFamily`**: Plus Jakarta Sans por peso.
- **`iconSize`**: `sm18 · md22 · lg26 · xl32`.
- **`shadow`**: `sm · md · lg` (+ alias `light/medium/heavy` retrocompatibles).
- **`opacity`**, **`zIndex`**, **`motion`** (duraciones y springs).

## 3. Color semántico (`constants/colors.ts`)
Paletas `lightColors` / `darkColors` con la misma forma (`ThemeColors`).
Se consumen vía `useAppTheme().colors`.

| Token | Uso |
|---|---|
| `primary` / `primaryPressed` / `primaryDark` | Marca y estados |
| `onPrimary` | Texto/icono sobre marca |
| `primarySoft` | Fondo suave de marca |
| `gradient` / `facultyGradient` | Gradientes de identidad |
| `background` / `surface` / `card` / `elevated` | Superficies |
| `text` / `textSecondary` / `textLight` / `textTertiary` / `textInverse` | Texto |
| `icon` / `iconSecondary` | Iconos |
| `border` / `separator` / `overlay` | Contención y scrim |
| `success` / `error` / `warning` / `info` / `like` | Estados |
| `tabActive` / `tabInactive` | Navegación |
| `skeleton` / `skeletonHighlight` | Loaders |

> `secondary` y `accent` / `accentSoft` para superficies y badges.

## 4. Tipografía (`constants/typography.ts`)
**Plus Jakarta Sans** (identidad idéntica en iOS, Android y Web). La fuente se elige por
**`fontFamily` por peso** (no `fontWeight`).

| Variante | Peso | Tamaño / línea |
|---|---|---|
| `display` | ExtraBold 800 | 34 / 40 |
| `h1` | Bold 700 | 28 / 34 |
| `h2` | Bold 700 | 22 / 28 |
| `h3` | SemiBold 600 | 18 / 24 |
| `body` | Regular 400 | 15 / 22 |
| `bodyStrong` | SemiBold 600 | 15 / 22 |
| `label` | SemiBold 600 | 13 / 16 |
| `caption` | Regular 400 | 12 / 16 |
| `overline` | SemiBold 600 | 11 / 14 |

Carga: `app/_layout.tsx` con `useFonts` de `@expo-google-fonts/plus-jakarta-sans`.

## 5. Primitivas (`components/ui/`)
Todas las bases son **polimórficas**: aceptan `as` (componente RN) y `resolveAs`
(roles ARIA para web, sin tags DOM crudos que rompan estilos RN).

| Componente | Descripción |
|---|---|
| `ScreenContainer` | SafeArea + TopBar + BottomTabBar + SideMenu. **Toda pantalla lo usa.** |
| `Typography` | Texto con la escala; `variant`, `tone`, `align`. |
| `Card` | Superficie; `variant` elevated/outlined/filled/plain; `as={Pressable}` para táctil. |
| `Button` | Variantes primary/secondary/ghost/danger; tamaños; loading/disabled; `as={Link}`. |
| `IconButton` | Botón de icono; plain/soft/solid. |
| `Avatar` | Fallback inicial, anillo de historia, status, badge, tamaños. |
| `Input` | Label, hint, error, icono, foco/disabled. |
| `Skeleton` / `SkeletonLines` | Loaders con pulso (Reanimated). |
| `EmptyState` / `ErrorState` | Estados vacío y error con acción. |

Presets de dominio en `components/features/Skeletons.tsx` (`PostSkeleton`, `ProfileSkeleton`, `ListItemSkeleton`).

### Ejemplo de polimorfismo
```tsx
<Card as={Pressable} onPress={openPost} variant="elevated">…</Card>   // táctil
<Card variant="plain">…</Card>                                       // estática
<Button as={Link} href="/perfil" label="Ver perfil" variant="secondary" />
```

## 6. Estados UX
- **Loading**: skeletons fluidos (feed = `PostSkeleton`, perfil = `ProfileSkeleton`, listas = `ListItemSkeleton`).
- **Vacío**: `EmptyState` (icono + título + descripción + CTA).
- **Error**: `ErrorState` con reintento.
- **Pulling/refresh**: `RefreshControl` con `colors.primary`.
- **Optimista**: likes/reacciones se aplican al toque con rollback en error.

## 7. El Muro de la U
### 7.1 Muro Global (por carrera)
- **Un lienzo compartido por carrera** (Sistemas, Civil, Industrial…). El usuario ve el de su(s) carrera(s).
- **Lienzo en blanco** donde se escribe, dibuja y pega (texto, trazo, imagen).
- **TTL 24 h**: el contenido caduca y el lienzo se limpia.
- **UI**: metáfora de corcho/noticiero; notas post-it con rotación sutil, chincheta y sombra;
  filtros (recientes / más populares / oficiales); temporizador visible de expiración.
- **Moderación**: reportar; maestros/admins pueden despegar y fijar "oficial".
- **Evolución post-MVP**: pan + pinch-zoom, zonas por materia, drag de notas.

### 7.2 Muro Personal
Secciones permanentes del usuario:
1. **Mis Anuncios** — ventas / marketplace.
2. **Logros / Clases** — logros académicos y de clases.
3. **Media** — galería de fotos y logros.

## 8. Accesibilidad y responsive
- Interactivos con `accessibilityRole`, `accessibilityLabel`, `accessibilityState`, `hitSlop ≥ 8`.
- Contraste AA; verificar acentos sobre gradiente (usar `onPrimary`).
- Soportar `fontScale`/Dynamic Type (evitar alturas fijas de texto).
- Web: contenido centrado con ancho máximo; `prefers-reduced-motion` desactiva shimmer/entradas.

## 9. Reglas de uso
1. Nunca hardcodear colores/medidas; usar `colors` + `Theme`.
2. Reutilizar primitivas; no duplicar SafeArea/TopBar/TabBar.
3. Texto siempre vía `Typography` (fuente por peso).
4. Verificar con `typecheck` + `expo-doctor` + export.
