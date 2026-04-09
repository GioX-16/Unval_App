import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
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
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          {avatarUri ? (
            <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
          ) : (
            <Text style={styles.avatarPlaceholder}>{name[0]}</Text>
          )}
        </View>
        {isVerified && (
          <View style={styles.badge}>
            <Text style={styles.badgeIcon}>✓</Text>
          </View>
        )}
      </View>

      <Text style={styles.name}>{name}</Text>
      <Text style={styles.username}>@{username}</Text>

      <View style={styles.badges}>
        <View style={[styles.badgeTag, styles.majorBadge]}>
          <Text style={styles.majorBadgeText}>{major}</Text>
        </View>
        <View style={[styles.badgeTag, styles.yearBadge]}>
          <Text style={styles.yearBadgeText}>{year}</Text>
        </View>
      </View>

      <Text style={styles.bio}>{bio}</Text>

      <View style={styles.metadata}>
        {location && (
          <View style={styles.metaItem}>
            <Text style={styles.metaIcon}>📍</Text>
            <Text style={styles.metaText}>{location}</Text>
          </View>
        )}
        {website && (
          <View style={styles.metaItem}>
            <Text style={styles.metaIcon}>🔗</Text>
            <Text style={[styles.metaText, styles.link]}>{website}</Text>
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
    backgroundColor: Theme.colors.white,
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
    backgroundColor: Theme.colors.secondary,
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
    color: Theme.colors.primary,
  },
  badge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#00D4AA',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: Theme.colors.white,
  },
  badgeIcon: {
    fontSize: 14,
    fontWeight: '700',
    color: Theme.colors.white,
  },
  name: {
    fontSize: Theme.fontSize.xl,
    fontWeight: '700',
    color: Theme.colors.primary,
    marginBottom: Theme.spacing.xs,
  },
  username: {
    fontSize: Theme.fontSize.md,
    color: Theme.colors.textLight,
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
  majorBadge: {
    backgroundColor: Theme.colors.secondary,
  },
  majorBadgeText: {
    fontSize: Theme.fontSize.xs,
    fontWeight: '600',
    color: Theme.colors.primary,
  },
  yearBadge: {
    backgroundColor: Theme.colors.accent,
  },
  yearBadgeText: {
    fontSize: Theme.fontSize.xs,
    fontWeight: '600',
    color: Theme.colors.primary,
  },
  bio: {
    fontSize: Theme.fontSize.md,
    color: Theme.colors.textBody,
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
  metaIcon: {
    fontSize: 14,
    marginRight: Theme.spacing.xs,
  },
  metaText: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textBody,
  },
  link: {
    color: Theme.colors.primary,
    textDecorationLine: 'underline',
  },
});
