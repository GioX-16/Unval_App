/**
 * Sistema de diseño — punto de entrada.
 *
 * Re-exporta los tokens primitivos y los colores semánticos, y expone
 * `Theme` con los tokens estáticos (spacing, radios, tipografía, sombras).
 *
 * - Colores theme-aware: `useAppTheme().colors`
 * - Tokens estáticos: `Theme.spacing`, `Theme.shadow`, ...
 */

import {
  spacing,
  borderRadius,
  fontSize,
  fontWeight,
  lineHeight,
  iconSize,
  shadow,
  opacity,
  zIndex,
  motion,
} from './tokens';

export * from './tokens';
export { lightColors, darkColors } from './colors';
export type { ThemeColors } from './colors';
export { typography } from './typography';
export type { TextVariant, TypographyStyle } from './typography';

/** Tokens estáticos del sistema de diseño. */
export const Theme = {
  spacing,
  borderRadius,
  fontSize,
  fontWeight,
  lineHeight,
  shadow,
  iconSize,
  opacity,
  zIndex,
  motion,
} as const;
