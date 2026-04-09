import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { Theme } from '@/constants/Theme';

interface FriendRequestCardProps {
  name: string;
  role: string;
  mutualFriends: number;
  avatarUri?: string;
  onConfirm?: () => void;
  onDelete?: () => void;
}

export default function FriendRequestCard({
  name,
  role,
  mutualFriends,
  avatarUri,
  onConfirm,
  onDelete,
}: FriendRequestCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        {avatarUri ? (
          <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
        ) : (
          <Text style={styles.avatarPlaceholder}>{name[0]}</Text>
        )}
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.role}>{role}</Text>
        <Text style={styles.mutualFriends}>{mutualFriends} amigos en común</Text>
      </View>

      <View style={styles.actions}>
        <Pressable style={[styles.button, styles.confirmButton]} onPress={onConfirm}>
          <Text style={styles.confirmText}>Confirmar</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.deleteButton]} onPress={onDelete}>
          <Text style={styles.deleteText}>Eliminar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.md,
    marginRight: Theme.spacing.md,
    width: 200,
    ...Theme.shadow.light,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Theme.colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: Theme.spacing.sm,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarPlaceholder: {
    fontSize: 24,
    fontWeight: '600',
    color: Theme.colors.primary,
  },
  info: {
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  name: {
    fontSize: Theme.fontSize.md,
    fontWeight: '600',
    color: Theme.colors.primary,
    textAlign: 'center',
  },
  role: {
    fontSize: Theme.fontSize.xs,
    color: Theme.colors.textBody,
    marginBottom: Theme.spacing.xs,
  },
  mutualFriends: {
    fontSize: Theme.fontSize.xs,
    color: Theme.colors.textLight,
  },
  actions: {
    flexDirection: 'row',
    gap: Theme.spacing.sm,
  },
  button: {
    flex: 1,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.sm,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: Theme.colors.primary,
  },
  confirmText: {
    fontSize: Theme.fontSize.xs,
    fontWeight: '600',
    color: Theme.colors.white,
  },
  deleteButton: {
    backgroundColor: Theme.colors.background,
    borderWidth: 1,
    borderColor: Theme.colors.textLight,
  },
  deleteText: {
    fontSize: Theme.fontSize.xs,
    fontWeight: '500',
    color: Theme.colors.textBody,
  },
});
