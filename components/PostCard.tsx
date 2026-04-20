import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@/constants/AppContext';
import { Theme } from '@/constants/Theme';

interface PostCardProps {
  authorName: string;
  authorRole: string;
  content: string;
  imageUri?: string;
  timeAgo: string;
  likes: number;
  comments: number;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function PostCard({
  authorName,
  authorRole,
  content,
  imageUri,
  timeAgo,
  likes,
  comments,
}: PostCardProps) {
  const { colors } = useAppTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.98, { damping: 15, stiffness: 400 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 400 });
  };

  return (
    <AnimatedPressable 
      style={[
        styles.container, 
        animatedStyle,
        { backgroundColor: colors.surface, borderColor: colors.border }
      ]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: colors.secondary }]}>
          <Text style={[styles.avatarText, { color: colors.primary }]}>{authorName[0]}</Text>
        </View>
        <View style={styles.authorInfo}>
          <Text style={[styles.authorName, { color: colors.text }]}>{authorName}</Text>
          <Text style={[styles.authorRole, { color: colors.textSecondary }]}>{authorRole} • {timeAgo}</Text>
        </View>
        <Pressable style={styles.moreButton}>
          <Ionicons name="ellipsis-horizontal" size={20} color={colors.iconSecondary} />
        </Pressable>
      </View>

      <Text style={[styles.content, { color: colors.text }]}>{content}</Text>

      {imageUri && (
        <View style={[styles.imageContainer, { backgroundColor: colors.background }]}>
          <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
        </View>
      )}

      <View style={[styles.actions, { borderTopColor: colors.separator }]}>
        <Pressable style={styles.actionButton}>
          <Ionicons name="heart-outline" size={22} color={colors.iconSecondary} />
          <Text style={[styles.actionText, { color: colors.textSecondary }]}>{likes}</Text>
        </Pressable>
        <Pressable style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={22} color={colors.iconSecondary} />
          <Text style={[styles.actionText, { color: colors.textSecondary }]}>{comments}</Text>
        </Pressable>
        <Pressable style={styles.actionButton}>
          <Ionicons name="share-outline" size={22} color={colors.iconSecondary} />
        </Pressable>
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
    borderRadius: Theme.borderRadius.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.spacing.md,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.semibold,
  },
  authorInfo: {
    flex: 1,
    marginLeft: Theme.spacing.sm,
  },
  authorName: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.semibold,
  },
  authorRole: {
    fontSize: Theme.fontSize.xs,
    marginTop: 2,
  },
  moreButton: {
    padding: Theme.spacing.xs,
  },
  content: {
    fontSize: Theme.fontSize.md,
    lineHeight: 22,
    paddingHorizontal: Theme.spacing.md,
    paddingBottom: Theme.spacing.md,
  },
  imageContainer: {
    width: '100%',
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  actions: {
    flexDirection: 'row',
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.md,
    borderTopWidth: 1,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Theme.spacing.lg,
  },
  actionText: {
    fontSize: Theme.fontSize.sm,
    marginLeft: Theme.spacing.xs,
  },
});