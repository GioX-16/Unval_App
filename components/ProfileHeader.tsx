import { useAppTheme } from '@/constants/AppContext';
import { Theme } from '@/constants/Theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from 'react-native';

interface ProfileHeaderProps {
  name: string;
  username: string;
  avatarUri?: ImageSourcePropType;
  coverImage?: ImageSourcePropType;
  major: string;
  year: string;
  bio: string;
  location?: string;
  website?: string;
  isVerified?: boolean;
  isEditable?: boolean;
  onEditPress?: () => void;
}

export default function ProfileHeader({
  name,
  username,
  avatarUri,
  coverImage,
  major,
  year,
  bio,
  location,
  website,
  isVerified = true,
  isEditable = false,
  onEditPress,
}: ProfileHeaderProps) {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={styles.coverContainer}>
        {coverImage ? (
          <Image source={coverImage} style={styles.coverImage} />
        ) : (
          <View style={[styles.coverPlaceholder, { backgroundColor: colors.secondary }]} />
        )}
        {isEditable && (
          <Pressable 
            style={[styles.editCoverButton, { backgroundColor: colors.surface }]} 
            onPress={onEditPress}
          >
            <Ionicons name="camera" size={20} color={colors.icon} />
          </Pressable>
        )}
      </View>

      <View style={styles.avatarSection}>
        <View style={styles.avatarContainer}>
          <View style={[styles.avatar, { backgroundColor: colors.secondary }]}>
            {avatarUri ? (
              <Image 
                source={avatarUri} 
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
        {isEditable && (
          <Pressable 
            style={[styles.editAvatarButton, { backgroundColor: colors.primary }]} 
            onPress={onEditPress}
          >
            <Ionicons name="camera" size={16} color="#FFF" />
          </Pressable>
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

      {isEditable && (
        <Pressable 
          style={[styles.editProfileButton, { borderColor: colors.border }]} 
          onPress={onEditPress}
        >
          <Ionicons name="create" size={16} color={colors.text} />
          <Text style={[styles.editProfileText, { color: colors.text }]}>Editar perfil</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: Theme.spacing.lg,
    ...Theme.shadow.light,
  },
  coverContainer: {
    width: '100%',
    height: 120,
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  coverPlaceholder: {
    width: '100%',
    height: '100%',
  },
  editCoverButton: {
    position: 'absolute',
    right: Theme.spacing.md,
    bottom: Theme.spacing.md,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    ...Theme.shadow.light,
  },
  avatarSection: {
    position: 'relative',
    marginTop: -50,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: '#FFF',
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
    borderColor: '#FFF',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: Theme.fontSize.xl,
    fontWeight: '700',
    marginTop: Theme.spacing.md,
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
    paddingHorizontal: Theme.spacing.lg,
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
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.sm,
    borderWidth: 1,
    borderRadius: Theme.borderRadius.md,
  },
  editProfileText: {
    fontSize: Theme.fontSize.sm,
    fontWeight: '600',
    marginLeft: Theme.spacing.xs,
  },
});