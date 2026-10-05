import React, { forwardRef } from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';

import { useAppTheme } from '@/constants/AppContext';
import { Theme } from '@/constants/Theme';
import {
  PolymorphicComponentProps,
  PolymorphicRef,
  resolveAs,
} from './polymorphic';

type CardVariant = 'elevated' | 'outlined' | 'filled' | 'plain';

type CardOwnProps = {
  variant?: CardVariant;
  padding?: keyof typeof Theme.spacing;
  radius?: keyof typeof Theme.borderRadius;
  style?: StyleProp<ViewStyle>;
};

const CardBase = <C extends React.ElementType = typeof View>(
  { as, variant = 'elevated', padding = 'md', radius = 'lg', style, ...rest }: PolymorphicComponentProps<C, CardOwnProps>,
  ref: PolymorphicRef<C>,
) => {
  const { colors } = useAppTheme();
  const { Component, accessibilityRole } = resolveAs(as, View);

  const base: ViewStyle = {
    borderRadius: Theme.borderRadius[radius],
    padding: Theme.spacing[padding],
    backgroundColor: variant === 'filled' ? colors.secondary : variant === 'plain' ? 'transparent' : colors.card,
    borderWidth: variant === 'outlined' ? 1 : 0,
    borderColor: colors.border,
    ...(variant === 'elevated' ? Theme.shadow.md : null),
  };

  return (
    <Component
      ref={ref}
      accessibilityRole={accessibilityRole}
      style={[base, style]}
      {...rest}
    />
  );
};

/**
 * Superficie de contenido. Polimórfica: `as={Pressable}` para táctil,
 * `as={View}` (default) para estática, `as="article"` para semántica web.
 *
 * @example
 * <Card as={Pressable} onPress={openPost} variant="elevated">…</Card>
 * <Card variant="outlined" padding="lg">…</Card>
 */
export const Card = forwardRef(CardBase as any) as unknown as <
  C extends React.ElementType = typeof View,
>(
  props: PolymorphicComponentProps<C, CardOwnProps> & { ref?: PolymorphicRef<C> },
) => React.ReactElement;
