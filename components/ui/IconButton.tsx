import React, { forwardRef } from 'react';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useAppTheme } from '@/constants/AppContext';
import { Theme } from '@/constants/Theme';
import {
  PolymorphicComponentProps,
  PolymorphicRef,
} from './polymorphic';

type IconButtonVariant = 'plain' | 'soft' | 'solid';

type IconButtonOwnProps = {
  name: keyof typeof Ionicons.glyphMap;
  size?: number;
  variant?: IconButtonVariant;
  color?: string;
  style?: StyleProp<ViewStyle>;
  hitSlop?: number;
};

const IconButtonBase = <C extends React.ElementType = typeof Pressable>(
  { as, name, size = Theme.iconSize.md, variant = 'plain', color, style, hitSlop = 8, ...rest }: PolymorphicComponentProps<C, IconButtonOwnProps>,
  ref: PolymorphicRef<C>,
) => {
  const { colors } = useAppTheme();
  const Component = (as ?? Pressable) as any;

  const backgroundColor =
    variant === 'soft' ? colors.primarySoft : variant === 'solid' ? colors.primary : 'transparent';
  const iconColor = color ?? (variant === 'solid' ? colors.onPrimary : colors.icon);

  return (
    <Component
      ref={ref}
      hitSlop={hitSlop}
      accessibilityRole="button"
      style={[styles.base, variant !== 'plain' && styles.padded, { backgroundColor }, style]}
      {...rest}
    >
      <Ionicons name={name} size={size} color={iconColor} />
    </Component>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  padded: {
    padding: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.full,
  },
});

export const IconButton = forwardRef(IconButtonBase as any) as unknown as <
  C extends React.ElementType = typeof Pressable,
>(
  props: PolymorphicComponentProps<C, IconButtonOwnProps> & { ref?: PolymorphicRef<C> },
) => React.ReactElement;
