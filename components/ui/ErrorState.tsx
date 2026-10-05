import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useAppTheme } from '@/constants/AppContext';
import { Theme } from '@/constants/Theme';
import { Button } from './Button';
import { Typography } from './Typography';

export interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  retryLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/** Estado de error de red/servidor con reintento. */
export const ErrorState = ({
  title = 'Algo salió mal',
  description = 'No pudimos cargar el contenido. Revisa tu conexión e inténtalo de nuevo.',
  onRetry,
  retryLabel = 'Reintentar',
  style,
}: ErrorStateProps) => {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.iconWrap, { backgroundColor: 'rgba(239,68,68,0.12)' }]}>
        <Ionicons name="cloud-offline-outline" size={30} color={colors.error} />
      </View>
      <Typography variant="h3" align="center" style={styles.title}>{title}</Typography>
      <Typography variant="body" tone="secondary" align="center" style={styles.description}>
        {description}
      </Typography>
      {onRetry ? (
        <View style={styles.action}>
          <Button label={retryLabel} variant="secondary" size="sm" onPress={onRetry} leftIcon={<Ionicons name="refresh" size={16} color={colors.primary} />} />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Theme.spacing.xxl,
    paddingHorizontal: Theme.spacing.lg,
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: Theme.borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Theme.spacing.md,
  },
  title: {
    marginBottom: Theme.spacing.xs,
  },
  description: {
    maxWidth: 300,
  },
  action: {
    marginTop: Theme.spacing.lg,
  },
});
