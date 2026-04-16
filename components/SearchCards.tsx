import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@/constants/AppContext';
import { Theme } from '@/constants/Theme';

interface UserCardProps {
  name: string;
  role: string;
  isVerified?: boolean;
  onPress?: () => void;
}

interface CommunityCardProps {
  name: string;
  category: string;
  members: number;
  imageUri?: string;
  onPress?: () => void;
}

export function UserCard({ name, role, isVerified = false, onPress }: UserCardProps) {
  const { colors } = useAppTheme();

  return (
    <Pressable style={[styles.userCard, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={onPress}>
      <View style={[styles.userAvatar, { backgroundColor: colors.secondary }]}>
        <Text style={[styles.avatarText, { color: colors.primary }]}>{name[0]}</Text>
      </View>
      <View style={styles.userInfo}>
        <View style={styles.nameRow}>
          <Text style={[styles.userName, { color: colors.text }]}>{name}</Text>
          {isVerified && (
            <Ionicons name="checkmark-circle" size={16} color={colors.primary} />
          )}
        </View>
        <Text style={[styles.userRole, { color: colors.textSecondary }]}>{role}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
    </Pressable>
  );
}

export function CommunityCard({ name, category, members, imageUri, onPress }: CommunityCardProps) {
  const { colors } = useAppTheme();

  return (
    <Pressable style={[styles.communityCard, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={onPress}>
      <View style={[styles.communityImage, { backgroundColor: colors.secondary }]}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.communityImageContent} />
        ) : (
          <Ionicons name="people" size={28} color={colors.primary} />
        )}
      </View>
      <View style={styles.communityInfo}>
        <Text style={[styles.communityName, { color: colors.text }]}>{name}</Text>
        <View style={styles.communityMeta}>
          <Text style={[styles.communityCategory, { color: colors.textSecondary }]}>{category}</Text>
          <Text style={[styles.communityMembers, { color: colors.textLight }]}>• {members} miembros</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.lg,
    borderWidth: 1,
    marginBottom: Theme.spacing.sm,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.semibold,
  },
  userInfo: {
    flex: 1,
    marginLeft: Theme.spacing.md,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.xs,
  },
  userName: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.semibold,
  },
  userRole: {
    fontSize: Theme.fontSize.sm,
    marginTop: 2,
  },
  communityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.lg,
    borderWidth: 1,
    marginBottom: Theme.spacing.sm,
  },
  communityImage: {
    width: 56,
    height: 56,
    borderRadius: Theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  communityImageContent: {
    width: '100%',
    height: '100%',
  },
  communityInfo: {
    flex: 1,
    marginLeft: Theme.spacing.md,
  },
  communityName: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.semibold,
  },
  communityMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  communityCategory: {
    fontSize: Theme.fontSize.sm,
  },
  communityMembers: {
    fontSize: Theme.fontSize.sm,
  },
});