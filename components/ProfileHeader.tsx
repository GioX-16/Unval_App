import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@/constants/AppContext';
import { Theme } from '@/constants/Theme';

interface ProfileHeaderProps {
  name: string;
  username: string;
  avatarUri?: string;
  major: string;
  year: string;
  bio: string;
  location?: string;
  website?: string;
  isVerified?: boolean;
}

export default function ProfileHeader({
  name,
  username,
  avatarUri,
  major,
  year,
  bio,
  location,
  website,
  isVerified = true,
}: ProfileHeaderProps) {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={styles.avatarContainer}>
        <View style={[styles.avatar, { backgroundColor: colors.secondary }]}>
          {avatarUri ? (
            <Image 
              source={typeof avatarUri === 'number' ? avatarUri : { uri: avatarUri }} 
              style={styles.avatarImage} 
            />
          ) : (
            <Text style={[styles.avatarPlaceholder, { color: colors.primary }]}>{name[0]}</Text>
          )}
        </View>
        {isVerified && (
          <View style={[styles.badge, { backgroundColor: colors.primary, borderColor: colors.surface }]}>
            <Ionicons name="checkmark" size={14} color="#FFF" />
          </View>
        )}
      </View>

      <Text style={[styles.name, { color: colors.text }]}>{name}</Text>
      <Text style={[styles.username, { color: colors.textSecondary }]}>@{username}</Text>

      <View style={styles.badges}>
        <View style={[styles.badgeTag, { backgroundColor: colors.secondary }]}>
          <Text style={[styles.badgeTagText, { color: colors.primary }]}>{major}</Text>
        </View>
        <View style={[styles.badgeTag, { backgroundColor: '#F9DCC4' }]}>
          <Text style={[styles.badgeTagText, { color: colors.primary }]}>{year}</Text>
        </View>
      </View>

      <Text style={[styles.bio, { color: colors.text }]}>{bio}</Text>

      <View style={styles.metadata}>
        {location && (
          <View style={styles.metaItem}>
            <Ionicons name="location" size={14} color={colors.textSecondary} />
            <Text style={[styles.metaText, { color: colors.textSecondary }]}>{location}</Text>
          </View>
        )}
        {website && (
          <View style={styles.metaItem}>
            <Ionicons name="link" size={14} color={colors.primary} />
            <Text style={[styles.metaText, { color: colors.primary }]}>{website}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: Theme.spacing.lg,
    ...Theme.shadow.light,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: Theme.spacing.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarPlaceholder: {
    fontSize: 40,
    fontWeight: '600',
  },
  badge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
  },
  name: {
    fontSize: Theme.fontSize.xl,
    fontWeight: '700',
    marginBottom: Theme.spacing.xs,
  },
  username: {
    fontSize: Theme.fontSize.md,
    marginBottom: Theme.spacing.md,
  },
  badges: {
    flexDirection: 'row',
    marginBottom: Theme.spacing.md,
  },
  badgeTag: {
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.full,
    marginHorizontal: Theme.spacing.xs,
  },
  badgeTagText: {
    fontSize: Theme.fontSize.xs,
    fontWeight: '600',
  },
  bio: {
    fontSize: Theme.fontSize.md,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: Theme.spacing.md,
  },
  metadata: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Theme.spacing.sm,
    marginVertical: Theme.spacing.xs,
  },
  metaText: {
    fontSize: Theme.fontSize.sm,
    marginLeft: Theme.spacing.xs,
  },
});