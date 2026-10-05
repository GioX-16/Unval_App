/**
 * Design tokens — primitivas del sistema de diseño.
 *
 * Este archivo es la ÚNICA fuente de verdad para paleta, espaciado,
 * radios, tipografía y sombras. Los componentes NO deben usar valores
 * hardcodeados; deben consumir estos tokens (directamente o a través de
 * `Theme` / `useAppTheme().colors`).
 */

/** Colores crudos de la marca. No usar directamente en UI: mapear a tokens semánticos. */
export const palette = {
  blue: '#0095F6',
  blueDark: '#00376B',
  blueSoft: '#E8F4FD',
  violet: '#7C3AED',
  coral: '#FF6B6B',
  red: '#FF3B30',
  green: '#4CAF50',
  redDark: '#F44336',
  orange: '#FF9800',
  peach: '#F9DCC4',
  white: '#FFFFFF',
  black: '#000000',
} as const;

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

/** Pesos de fuente. */
export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

/** Alturas de línea. */
export const lineHeight = {
  tight: 1.2,
  normal: 1.4,
  relaxed: 1.6,
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
} as const;

/** Capas (z-index). */
export const zIndex = {
  base: 1,
  overlay: 1000,
} as const;
