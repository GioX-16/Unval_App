import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Theme } from '@/constants/Theme';

interface ActivityRowProps {
  userName: string;
  action: string;
  target: string;
  reactionIcon: string;
  avatarUri?: string;
}

export default function ActivityRow({
  userName,
  action,
  target,
  reactionIcon,
  avatarUri,
}: ActivityRowProps) {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          {avatarUri ? (
            <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
          ) : (
            <Text style={styles.avatarPlaceholder}>{userName[0]}</Text>
          )}
        </View>
        <View style={styles.reactionBadge}>
          <Text style={styles.reactionIcon}>{reactionIcon}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.text}>
          <Text style={styles.userName}>{userName}</Text>
          {' '}{action}{' '}
          <Text style={styles.target}>{target}</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.background,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: Theme.spacing.md,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
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
    fontSize: 18,
    fontWeight: '600',
    color: Theme.colors.primary,
  },
  reactionBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...Theme.shadow.light,
  },
  reactionIcon: {
    fontSize: 12,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textBody,
    lineHeight: 20,
  },
  userName: {
    fontWeight: '600',
    color: Theme.colors.primary,
  },
  target: {
    color: Theme.colors.textBody,
  },
});
