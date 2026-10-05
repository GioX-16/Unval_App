/**
 * Design tokens — primitivas del sistema de diseño.
 *
 * ÚNICA fuente de verdad para marca, escalas, espaciado, radios,
 * tipografía, sombras y motion. Los componentes NO deben usar valores
 * hardcodeados; consumen estos tokens (directamente o vía `Theme` /
 * `useAppTheme().colors`).
 */

/* ─────────────────────────────────────────────────────────────
 * MARCA
 * Cambia SOLO `seed` para re-tonalizar toda la app.
 * ───────────────────────────────────────────────────────────── */
export const brand = {
  seed: '#0B3D91', // TODO: color institucional real (1 sola línea)
  scale: {
    50: '#EEF4FC',
    100: '#D6E4F8',
    200: '#ADC9F1',
    300: '#84AEE9',
    400: '#5B93E2',
    500: '#3078DB',
    600: '#0B3D91',
    700: '#093070',
    800: '#072452',
    900: '#051733',
  },
  /** Identidad visual por rol: estudiante (vibrante) vs maestro (formal). */
  identity: {
    student: { gradient: ['#3078DB', '#7C3AED'], accent: '#FF6B6B' },
    faculty: { gradient: ['#0B3D91', '#475569'], accent: '#C9A227' },
  },
} as const;

/** Neutrales estilo Instagram. */
export const gray = {
  0: '#FFFFFF',
  25: '#FAFAFA',
  50: '#F5F5F7',
  100: '#EFEFEF',
  200: '#DBDBDB',
  300: '#C7C7C7',
  400: '#A8A8A8',
  500: '#8E8E8E',
  600: '#737373',
  700: '#555555',
  800: '#363636',
  900: '#1C1C1E',
  950: '#000000',
} as const;

/** Colores de estado. */
export const status = {
  success: '#22C55E',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3078DB',
} as const;

/* ─────────────────────────────────────────────────────────────
 * ESCALAS
 * ───────────────────────────────────────────────────────────── */

/** Escala de espaciado (múltiplos de 4). */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

/** Radios de borde. */
export const borderRadius = {
  xs: 4,
  sm: 6,
  md: 10,
  lg: 16,
  xl: 24,
  full: 9999,
  pill: 9999,
  circle: 9999,
} as const;

/** Tamaños de fuente. */
export const fontSize = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 21,
  xxl: 27,
  display: 34,
} as const;

/** Pesos de fuente (referencia; con fuentes custom se usa `fontFamily`). */
export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
} as const;

/** Alturas de línea (multiplicador). */
export const lineHeight = {
  tight: 1.2,
  normal: 1.4,
  relaxed: 1.6,
} as const;

/** Familias tipográficas reales (Plus Jakarta Sans, por peso). */
export const fontFamily = {
  regular: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semibold: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
  extrabold: 'PlusJakartaSans_800ExtraBold',
} as const;

/** Tamaños de icono. */
export const iconSize = {
  sm: 18,
  md: 22,
  lg: 26,
  xl: 32,
} as const;

/** Sombras predefinidas. */
export const shadow = {
  none: {},
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 20,
    elevation: 8,
  },
  /** Alias retrocompatibles. */
  light: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 5,
  },
  heavy: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 20,
    elevation: 8,
  },
} as const;

/** Niveles de opacidad. */
export const opacity = {
  disabled: 0.5,
  pressed: 0.8,
  muted: 0.6,
} as const;

/** Capas (z-index). */
export const zIndex = {
  base: 1,
  overlay: 1000,
} as const;

/** Motion (duraciones y springs para Reanimated). */
export const motion = {
  duration: { fast: 150, base: 250, slow: 400 },
  spring: { damping: 15, stiffness: 400 },
} as const;
