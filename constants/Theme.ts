/**
 * Sistema de diseño — tokens semánticos y agregado `Theme`.
 *
 * - `lightColors` / `darkColors`: paletas semánticas theme-aware.
 * - `Theme`: tokens estáticos (spacing, radios, tipografía, sombras).
 *
 * Los colores theme-aware se consumen vía `useAppTheme().colors`.
 */

import {
  palette,
  spacing,
  borderRadius,
  fontSize,
  fontWeight,
  lineHeight,
  iconSize,
  shadow,
  opacity,
  zIndex,
} from './tokens';

export {
  palette,
  spacing,
  borderRadius,
  fontSize,
  fontWeight,
  lineHeight,
  iconSize,
  shadow,
  opacity,
  zIndex,
} from './tokens';

/** Paleta semántica. Ambas variantes (light/dark) comparten esta forma. */
export interface ThemeColors {
  /** Color de marca principal. */
  primary: string;
  /** Variante oscura de la marca. */
  primaryDark: string;
  /** Texto/icono sobre fondo `primary`. */
  onPrimary: string;
  /** Fondo suave derivado de la marca. */
  primarySoft: string;
  /** Gradiente de marca [inicio, fin]. */
  gradient: [string, string];
  secondary: string;
  accent: string;
  accentSoft: string;
  background: string;
  surface: string;
  card: string;
  elevated: string;
  text: string;
  textSecondary: string;
  textLight: string;
  border: string;
  separator: string;
  icon: string;
  iconSecondary: string;
  overlay: string;
  success: string;
  error: string;
  warning: string;
  like: string;
  tabActive: string;
  tabInactive: string;
}

export const lightColors: ThemeColors = {
  primary: palette.blue,
  primaryDark: palette.blueDark,
  onPrimary: palette.white,
  primarySoft: palette.blueSoft,
  gradient: [palette.blue, palette.violet],
  secondary: '#DBE4EE',
  accent: palette.coral,
  accentSoft: palette.peach,
  background: '#FAFAFA',
  surface: palette.white,
  card: palette.white,
  elevated: palette.white,
  text: '#262626',
  textSecondary: '#8E8E8E',
  textLight: '#A0A0A0',
  border: '#DBE4EE',
  separator: '#EDEEEE',
  icon: '#262626',
  iconSecondary: '#8E8E8E',
  overlay: 'rgba(0,0,0,0.5)',
  success: palette.green,
  error: palette.redDark,
  warning: palette.orange,
  like: palette.red,
  tabActive: palette.blue,
  tabInactive: '#8E8E8E',
};

export const darkColors: ThemeColors = {
  primary: palette.blue,
  primaryDark: palette.blueDark,
  onPrimary: palette.white,
  primarySoft: 'rgba(0,149,246,0.18)',
  gradient: [palette.blue, palette.violet],
  secondary: '#363636',
  accent: palette.coral,
  accentSoft: 'rgba(249,220,196,0.18)',
  background: '#000000',
  surface: '#121212',
  card: '#1C1C1E',
  elevated: '#1C1C1E',
  text: '#FFFFFF',
  textSecondary: '#A0A0A0',
  textLight: '#6B6B6B',
  border: '#363636',
  separator: '#2C2C2E',
  icon: '#FFFFFF',
  iconSecondary: '#A0A0A0',
  overlay: 'rgba(0,0,0,0.6)',
  success: palette.green,
  error: palette.redDark,
  warning: palette.orange,
  like: palette.red,
  tabActive: palette.blue,
  tabInactive: '#A0A0A0',
};

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
} as const;
