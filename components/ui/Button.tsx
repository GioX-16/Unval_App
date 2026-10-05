import React, { forwardRef } from 'react';
import { ActivityIndicator, Pressable, StyleProp, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { useAppTheme } from '@/constants/AppContext';
import { Theme } from '@/constants/Theme';
import { ThemeColors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import {
  PolymorphicComponentProps,
  PolymorphicRef,
} from './polymorphic';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonOwnProps = {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const SIZES: Record<ButtonSize, { container: ViewStyle; text: TextStyle }> = {
  sm: { container: { paddingVertical: Theme.spacing.xs, paddingHorizontal: Theme.spacing.sm, borderRadius: Theme.borderRadius.sm }, text: typography.label },
  md: { container: { paddingVertical: Theme.spacing.sm + 2, paddingHorizontal: Theme.spacing.md, borderRadius: Theme.borderRadius.md }, text: typography.bodyStrong },
  lg: { container: { paddingVertical: Theme.spacing.md, paddingHorizontal: Theme.spacing.lg, borderRadius: Theme.borderRadius.md }, text: typography.h3 },
};

function variantStyles(colors: ThemeColors): Record<ButtonVariant, { container: ViewStyle; textColor: string }> {
  return {
    primary: { container: { backgroundColor: colors.primary }, textColor: colors.onPrimary },
    secondary: { container: { backgroundColor: colors.primarySoft }, textColor: colors.primary },
    ghost: { container: { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.border }, textColor: colors.text },
    danger: { container: { backgroundColor: colors.error }, textColor: colors.onPrimary },
  };
}

const ButtonBase = <C extends React.ElementType = typeof Pressable>(
  { as, label, variant = 'primary', size = 'md', loading = false, disabled = false, fullWidth = false, leftIcon, style, ...rest }: PolymorphicComponentProps<C, ButtonOwnProps>,
  ref: PolymorphicRef<C>,
) => {
  const { colors } = useAppTheme();
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  const isNativePressable = !as;
  const Component = (isNativePressable ? AnimatedPressable : as) as any;
  const v = variantStyles(colors)[variant];

  const pressHandlers = isNativePressable
    ? {
        onPressIn: () => { scale.value = withSpring(0.97, Theme.motion.spring); },
        onPressOut: () => { scale.value = withSpring(1, Theme.motion.spring); },
      }
    : {};

  const isDisabled = disabled || loading;

  return (
    <Component
      ref={ref}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled, busy: !!loading }}
      style={[
        styles.base,
        SIZES[size].container,
        v.container,
        fullWidth && styles.fullWidth,
        isNativePressable && animatedStyle,
        isDisabled && { opacity: Theme.opacity.disabled },
        style,
      ]}
      {...pressHandlers}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={v.textColor} />
      ) : (
        <>
          {leftIcon}
          <Text style={[SIZES[size].text, { color: v.textColor }, leftIcon ? styles.labelWithIcon : null]}>
            {label}
          </Text>
        </>
      )}
    </Component>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  labelWithIcon: {
    marginLeft: Theme.spacing.sm,
  },
});

/**
 * Botón con variantes, tamaños y estados. Polimórfico: `as={Link}` permite
 * usarlo como enlace de navegación sin duplicar estilo.
 *
 * @example
 * <Button label="Seguir" onPress={follow} />
 * <Button as={Link} href="/perfil" label="Ver perfil" variant="secondary" />
 */
export const Button = forwardRef(ButtonBase as any) as unknown as <
  C extends React.ElementType = typeof Pressable,
>(
  props: PolymorphicComponentProps<C, ButtonOwnProps> & { ref?: PolymorphicRef<C> },
) => React.ReactElement;
