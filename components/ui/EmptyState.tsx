import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useAppTheme } from '@/constants/AppContext';
import { Theme } from '@/constants/Theme';
import { Typography } from './Typography';

export interface EmptyStateProps {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  description?: string;
  action?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/** Estado vacío genérico (sin contenido, sin resultados, perfil privado…). */
export const EmptyState = ({ icon = 'sparkles-outline', title, description, action, style }: EmptyStateProps) => {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.iconWrap, { backgroundColor: colors.primarySoft }]}>
        <Ionicons name={icon} size={30} color={colors.primary} />
      </View>
      <Typography variant="h3" align="center" style={styles.title}>{title}</Typography>
      {description ? (
        <Typography variant="body" tone="secondary" align="center" style={styles.description}>
          {description}
        </Typography>
      ) : null}
      {action ? <View style={styles.action}>{action}</View> : null}
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
