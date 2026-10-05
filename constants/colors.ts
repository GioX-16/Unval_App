/**
 * Colores semánticos theme-aware, derivados de los tokens primitivos.
 * Consumir vía `useAppTheme().colors`.
 */

import { brand, gray, status } from './tokens';

export interface ThemeColors {
  /** Marca */
  primary: string;
  primaryPressed: string;
  primaryDark: string;
  onPrimary: string;
  primarySoft: string;
  /** Gradiente de marca (estudiante por defecto). */
  gradient: [string, string];
  /** Gradiente formal (maestros/institución). */
  facultyGradient: [string, string];
  /** Superficies */
  secondary: string;
  accent: string;
  accentSoft: string;
  background: string;
  surface: string;
  card: string;
  elevated: string;
  /** Texto e iconos */
  text: string;
  textSecondary: string;
  textLight: string;
  textTertiary: string;
  textInverse: string;
  icon: string;
  iconSecondary: string;
  /** Contención */
  border: string;
  separator: string;
  overlay: string;
  /** Estados */
  success: string;
  error: string;
  warning: string;
  info: string;
  like: string;
  /** Navegación */
  tabActive: string;
  tabInactive: string;
  /** Skeleton loaders */
  skeleton: string;
  skeletonHighlight: string;
}

export const lightColors: ThemeColors = {
  primary: brand.scale[600],
  primaryPressed: brand.scale[700],
  primaryDark: brand.scale[800],
  onPrimary: '#FFFFFF',
  primarySoft: brand.scale[50],
  gradient: [...brand.identity.student.gradient] as [string, string],
  facultyGradient: [...brand.identity.faculty.gradient] as [string, string],
  secondary: gray[200],
  accent: brand.identity.student.accent,
  accentSoft: '#FFE3E3',
  background: gray[25],
  surface: '#FFFFFF',
  card: '#FFFFFF',
  elevated: '#FFFFFF',
  text: gray[900],
  textSecondary: gray[500],
  textLight: gray[400],
  textTertiary: gray[400],
  textInverse: '#FFFFFF',
  icon: gray[900],
  iconSecondary: gray[500],
  border: gray[200],
  separator: gray[100],
  overlay: 'rgba(0,0,0,0.5)',
  success: status.success,
  error: status.error,
  warning: status.warning,
  info: status.info,
  like: '#FF3B30',
  tabActive: brand.scale[600],
  tabInactive: gray[500],
  skeleton: gray[100],
  skeletonHighlight: gray[50],
};

export const darkColors: ThemeColors = {
  primary: brand.scale[400],
  primaryPressed: brand.scale[300],
  primaryDark: brand.scale[600],
  onPrimary: '#FFFFFF',
  primarySoft: 'rgba(48,120,219,0.18)',
  gradient: [...brand.identity.student.gradient] as [string, string],
  facultyGradient: [...brand.identity.faculty.gradient] as [string, string],
  secondary: gray[800],
  accent: brand.identity.student.accent,
  accentSoft: 'rgba(255,107,107,0.18)',
  background: '#000000',
  surface: gray[900],
  card: '#1C1C1E',
  elevated: '#242426',
  text: '#FFFFFF',
  textSecondary: gray[400],
  textLight: gray[500],
  textTertiary: gray[500],
  textInverse: gray[900],
  icon: '#FFFFFF',
  iconSecondary: gray[400],
  border: gray[800],
  separator: '#2C2C2E',
  overlay: 'rgba(0,0,0,0.6)',
  success: status.success,
  error: status.error,
  warning: status.warning,
  info: status.info,
  like: '#FF453A',
  tabActive: brand.scale[400],
  tabInactive: gray[500],
  skeleton: '#242426',
  skeletonHighlight: '#2E2E30',
};
