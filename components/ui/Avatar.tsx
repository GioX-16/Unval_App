import React, { useState } from 'react';
import { Image, ImageSourcePropType, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { useAppTheme } from '@/constants/AppContext';
import { Theme } from '@/constants/Theme';
import { typography } from '@/constants/typography';
import { Text } from 'react-native';
import { resolveAs } from './polymorphic';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type AvatarStatus = 'online' | 'offline' | 'none';

export interface AvatarProps {
  source?: ImageSourcePropType | null;
  name?: string;
  size?: AvatarSize;
  /** Anillo de gradiente (estilo historias). */
  ring?: boolean;
  /** Colores del anillo; por defecto el gradiente de marca. */
  ringColors?: [string, string];
  status?: AvatarStatus;
  badge?: React.ReactNode;
  as?: React.ElementType;
  style?: StyleProp<ViewStyle>;
  [key: string]: unknown;
}

const DIMENSIONS: Record<AvatarSize, number> = { xs: 24, sm: 32, md: 48, lg: 64, xl: 96 };
const RING_WIDTH = 2.5;

export const Avatar = ({
  source,
  name,
  size = 'md',
  ring = false,
  ringColors,
  status = 'none',
  badge,
  as,
  style,
  ...rest
}: AvatarProps) => {
  const { colors } = useAppTheme();
  const [errored, setErrored] = useState(false);
  const { Component, accessibilityRole } = resolveAs(as, View);

  const dim = DIMENSIONS[size];
  const inner = ring ? dim - RING_WIDTH * 2 : dim;
  const initial = name?.trim()?.[0]?.toUpperCase() ?? '?';
  const showImage = !!source && !errored;

  const core = (
    <View
      style={[
        styles.inner,
        {
          width: inner,
          height: inner,
          borderRadius: inner / 2,
          backgroundColor: colors.secondary,
        },
      ]}
    >
      {showImage ? (
        <Image source={source as ImageSourcePropType} style={styles.image} onError={() => setErrored(true)} />
      ) : (
        <Text style={[typography.label, { color: colors.primary, fontSize: inner * 0.42 }]}>{initial}</Text>
      )}
    </View>
  );

  return (
    <Component
      accessibilityRole={accessibilityRole}
      style={[{ width: dim, height: dim, position: 'relative' }, style]}
      {...rest}
    >
      {ring ? (
        <LinearGradient
          colors={ringColors ?? colors.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.ring, { width: dim, height: dim, borderRadius: dim / 2 }]}
        >
          {core}
        </LinearGradient>
      ) : (
        core
      )}

      {badge ? (
        <View style={[styles.badge, { borderColor: colors.surface }]}>{badge}</View>
      ) : status !== 'none' ? (
        <View
          style={[
            styles.status,
            {
              width: dim * 0.28,
              height: dim * 0.28,
              borderRadius: dim * 0.14,
              borderColor: colors.surface,
              backgroundColor: status === 'online' ? colors.success : colors.tabInactive,
            },
          ]}
        />
      ) : null}
    </Component>
  );
};

const styles = StyleSheet.create({
  ring: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    borderWidth: 2,
    borderRadius: Theme.borderRadius.full,
  },
  status: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    borderWidth: 2,
  },
});
