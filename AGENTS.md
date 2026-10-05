# AGENTS.md — UNVAL App

> Punto de entrada para agentes de IA. Lee esto primero; abre los docs de `docs/`
> solo cuando la tarea lo requiera (ahorra tokens).

## Qué es
**UNVAL (UNI-VERSE-ALL)** — red social universitaria móvil (estudiantes + maestros).
Diferencial: **El Muro de la U** (lienzo efímero de 24 h).

## Stack
Expo SDK 57 · React Native 0.86 · TypeScript · Expo Router · Reanimated 4 · Plus Jakarta Sans.

## Documentación (abrir bajo demanda)
- `docs/PROJECT.md` — qué es, MVP, inventario de pantallas, roadmap.
- `docs/DESIGN.md` — sistema de diseño, tokens, tipografía, primitivas, El Muro.
- `docs/ARCHITECTURE.md` — estructura de carpetas, navegación, datos, backend.

## Comandos
```bash
npm run typecheck              # tsc --noEmit (debe pasar en 0)
npx expo-doctor                # 21/21 checks
npx expo export --platform web # verifica que el bundle compila
npm run android                # correr en emulador Android (Expo Go)
```

## Reglas duras
1. **Nada de colores/valores hardcodeados.** Usa `useAppTheme().colors` y `Theme.*` (tokens en `constants/`).
2. **Usa las primitivas** de `components/ui/` (`Typography`, `Card`, `Button`, `Avatar`, `Input`, `ScreenContainer`, `Skeleton`, `EmptyState`, `ErrorState`). No repitas boilerplate de SafeArea/TopBar/TabBar.
3. **Toda pantalla nueva** envuelve su contenido en `ScreenContainer`.
4. **Componentes base son polimórficos** (`as` + `resolveAs`); semántica web vía rol ARIA.
5. **No inventar backend.** Hoy la capa de datos es mock (`data/`, a crear). Auth = mock.
6. Verifica siempre con `typecheck` + `expo-doctor` + export antes de cerrar una tarea.
7. No cambiar `brand.seed` sin instrucción (es el color institucional, 1 sola línea en `constants/tokens.ts`).

## Convenciones de código
- TypeScript estricto. Fuentes por peso vía `fontFamily` (no `fontWeight`).
- Carpetas: `app/` rutas · `components/ui/` primitivas · `components/features/` dominio · `constants/` diseño · `data/` datos.
- Idioma de UI: ES/EN (contexto i18n en `constants/AppContext.tsx`).

## Decisiones abiertas
- Backend: pendiente; se usará **capa gratuita** (Supabase/Firebase/Appwrite). Mientras: mock.
- Autenticación: **mock** para la demo.
- El Muro Global: lienzo compartido **por carrera**, TTL **24 h**.
