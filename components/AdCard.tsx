import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useAppTheme } from '@/constants/AppContext';
import { Theme } from '@/constants/Theme';

interface AdCardProps {
  category: string;
  timeAgo: string;
  title: string;
  description: string;
  price?: string;
  onPress?: () => void;
}

export default function AdCard({
  category,
  timeAgo,
  title,
  description,
  price,
  onPress,
}: AdCardProps) {
  const { colors } = useAppTheme();

  return (
    <Pressable style={[styles.container, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={onPress}>
      <View style={styles.header}>
        <View style={[styles.categoryBadge, { backgroundColor: colors.secondary }]}>
          <Text style={[styles.categoryText, { color: colors.primary }]}>{category}</Text>
        </View>
        <Text style={[styles.timeAgo, { color: colors.textLight }]}>{timeAgo}</Text>
      </View>

      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <Text style={[styles.description, { color: colors.textSecondary }]} numberOfLines={2}>
        {description}
      </Text>

      <View style={styles.footer}>
        {price && <Text style={[styles.price, { color: colors.text }]}>{price}</Text>}
        <Pressable style={[styles.button, { backgroundColor: colors.primary }]} onPress={onPress}>
          <Text style={styles.buttonText}>Ver Detalles</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
    borderWidth: 1,
    ...Theme.shadow.light,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
  },
  categoryBadge: {
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.sm,
  },
  categoryText: {
    fontSize: Theme.fontSize.xs,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  timeAgo: {
    fontSize: Theme.fontSize.xs,
  },
  title: {
    fontSize: Theme.fontSize.md,
    fontWeight: '700',
    marginBottom: Theme.spacing.xs,
  },
  description: {
    fontSize: Theme.fontSize.sm,
    lineHeight: 20,
    marginBottom: Theme.spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: Theme.fontSize.lg,
    fontWeight: '700',
  },
  button: {
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.sm,
  },
  buttonText: {
    fontSize: Theme.fontSize.sm,
    fontWeight: '600',
    color: '#FFF',
  },
});