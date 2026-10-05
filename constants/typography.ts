/**
 * Escala tipográfica — Plus Jakarta Sans.
 * Usa `fontFamily` por peso (no `fontWeight`) para garantizar el trazo
 * correcto en iOS, Android y Web.
 */

import { fontFamily } from './tokens';

export type TextVariant =
  | 'display'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'body'
  | 'bodyStrong'
  | 'label'
  | 'caption'
  | 'overline';

export interface TypographyStyle {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  letterSpacing?: number;
}

export const typography: Record<TextVariant, TypographyStyle> = {
  display: { fontFamily: fontFamily.extrabold, fontSize: 34, lineHeight: 40, letterSpacing: -0.8 },
  h1: { fontFamily: fontFamily.bold, fontSize: 28, lineHeight: 34, letterSpacing: -0.6 },
  h2: { fontFamily: fontFamily.bold, fontSize: 22, lineHeight: 28, letterSpacing: -0.4 },
  h3: { fontFamily: fontFamily.semibold, fontSize: 18, lineHeight: 24, letterSpacing: -0.2 },
  body: { fontFamily: fontFamily.regular, fontSize: 15, lineHeight: 22 },
  bodyStrong: { fontFamily: fontFamily.semibold, fontSize: 15, lineHeight: 22 },
  label: { fontFamily: fontFamily.semibold, fontSize: 13, lineHeight: 16, letterSpacing: 0.2 },
  caption: { fontFamily: fontFamily.regular, fontSize: 12, lineHeight: 16 },
  overline: { fontFamily: fontFamily.semibold, fontSize: 11, lineHeight: 14, letterSpacing: 0.8 },
};
