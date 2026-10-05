import React, { useEffect } from 'react';
import { DimensionValue, StyleProp, StyleSheet, ViewStyle, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { useAppTheme } from '@/constants/AppContext';
import { Theme } from '@/constants/Theme';

export interface SkeletonProps {
  width?: DimensionValue;
  height?: DimensionValue;
  radius?: number;
  circle?: boolean;
  style?: StyleProp<ViewStyle>;
}

/** Bloque con pulso de opacidad para loaders estilo Instagram. */
export const Skeleton = ({ width = '100%', height = 16, radius = Theme.borderRadius.sm, circle = false, style }: SkeletonProps) => {
  const { colors } = useAppTheme();
  const progress = useSharedValue(0.4);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => ({ opacity: progress.value }));

  return (
    <Animated.View
      style={[
        {
          width,
          height: circle ? width : height,
          borderRadius: circle ? 9999 : radius,
          backgroundColor: colors.skeleton,
        },
        animatedStyle,
        style,
      ]}
    />
  );
};

/** Contenedor con filas de skeleton de texto. */
export const SkeletonLines = ({ lines = 2, style }: { lines?: number; style?: StyleProp<ViewStyle> }) => (
  <View style={[styles.lines, style]}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton key={i} height={12} width={i === lines - 1 ? '60%' : '100%'} style={i > 0 ? styles.lineGap : undefined} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  lines: {
    width: '100%',
  },
  lineGap: {
    marginTop: Theme.spacing.sm,
  },
});
