import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
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
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{category}</Text>
        </View>
        <Text style={styles.timeAgo}>{timeAgo}</Text>
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {description}
      </Text>

      <View style={styles.footer}>
        {price && <Text style={styles.price}>{price}</Text>}
        <Pressable style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Ver Detalles</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
    ...Theme.shadow.light,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
  },
  categoryBadge: {
    backgroundColor: Theme.colors.secondary,
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.sm,
  },
  categoryText: {
    fontSize: Theme.fontSize.xs,
    fontWeight: '600',
    color: Theme.colors.primary,
    textTransform: 'uppercase',
  },
  timeAgo: {
    fontSize: Theme.fontSize.xs,
    color: Theme.colors.textLight,
  },
  title: {
    fontSize: Theme.fontSize.md,
    fontWeight: '700',
    color: Theme.colors.primary,
    marginBottom: Theme.spacing.xs,
  },
  description: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textBody,
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
    color: Theme.colors.primary,
  },
  button: {
    backgroundColor: Theme.colors.primary,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.sm,
  },
  buttonText: {
    fontSize: Theme.fontSize.sm,
    fontWeight: '600',
    color: Theme.colors.white,
  },
});
