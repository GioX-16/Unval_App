import React, { forwardRef } from 'react';
import { Text, TextStyle, StyleProp } from 'react-native';

import { useAppTheme } from '@/constants/AppContext';
import { TextVariant, typography } from '@/constants/typography';
import {
  PolymorphicComponentProps,
  PolymorphicRef,
  resolveAs,
} from './polymorphic';

type TypographyTone =
  | 'default'
  | 'secondary'
  | 'tertiary'
  | 'primary'
  | 'inverse'
  | 'success'
  | 'error';

type TypographyOwnProps = {
  /** Variante de la escala tipográfica. */
  variant?: TextVariant;
  /** Color semántico tomado del tema. */
  tone?: TypographyTone;
  align?: TextStyle['textAlign'];
  style?: StyleProp<TextStyle>;
};

const TypographyBase = <C extends React.ElementType = typeof Text>(
  { as, variant = 'body', tone = 'default', align, style, ...rest }: PolymorphicComponentProps<C, TypographyOwnProps>,
  ref: PolymorphicRef<C>,
) => {
  const { colors } = useAppTheme();
  const { Component, accessibilityRole } = resolveAs(as, Text);

  const toneColor: Record<TypographyTone, string> = {
    default: colors.text,
    secondary: colors.textSecondary,
    tertiary: colors.textTertiary,
    primary: colors.primary,
    inverse: colors.textInverse,
    success: colors.success,
    error: colors.error,
  };

  return (
    <Component
      ref={ref}
      accessibilityRole={accessibilityRole}
      style={[typography[variant], { color: toneColor[tone] }, align ? { textAlign: align } : null, style]}
      {...rest}
    />
  );
};

/**
 * Texto con la escala del sistema de diseño.
 *
 * @example
 * <Typography variant="h1">UNVAL</Typography>
 * <Typography variant="body" tone="secondary">Ing. Sistemas</Typography>
 * <Typography as={Link} href="/perfil" variant="label">Ver perfil</Typography>
 */
export const Typography = forwardRef(TypographyBase as any) as unknown as <
  C extends React.ElementType = typeof Text,
>(
  props: PolymorphicComponentProps<C, TypographyOwnProps> & { ref?: PolymorphicRef<C> },
) => React.ReactElement;
