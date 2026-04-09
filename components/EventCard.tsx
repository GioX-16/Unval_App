import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Theme } from '@/constants/Theme';

interface EventCardProps {
  eventTitle: string;
  eventDescription: string;
  invitee: string;
  onViewDetails?: () => void;
  onIgnore?: () => void;
}

export default function EventCard({
  eventTitle,
  eventDescription,
  invitee,
  onViewDetails,
  onIgnore,
}: EventCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>📅</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{eventTitle}</Text>
        <Text style={styles.description}>{eventDescription}</Text>
        <Text style={styles.invitee}>Invitado por: {invitee}</Text>

        <View style={styles.actions}>
          <Pressable onPress={onViewDetails}>
            <Text style={styles.link}>Ver detalles</Text>
          </Pressable>
          <Text style={styles.separator}>•</Text>
          <Pressable onPress={onIgnore}>
            <Text style={styles.link}>Ignorar</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
    ...Theme.shadow.light,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: Theme.borderRadius.md,
    backgroundColor: Theme.colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  icon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: Theme.fontSize.md,
    fontWeight: '600',
    color: Theme.colors.primary,
    marginBottom: Theme.spacing.xs,
  },
  description: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textBody,
    marginBottom: Theme.spacing.xs,
  },
  invitee: {
    fontSize: Theme.fontSize.xs,
    color: Theme.colors.textLight,
    marginBottom: Theme.spacing.sm,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  link: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.primary,
    fontWeight: '500',
  },
  separator: {
    marginHorizontal: Theme.spacing.sm,
    color: Theme.colors.textLight,
  },
});
