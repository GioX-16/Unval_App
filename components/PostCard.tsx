import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withSequence } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppTheme } from '@/constants/AppContext';
import { Theme } from '@/constants/Theme';

interface PostCardProps {
  authorName: string;
  authorRole: string;
  authorAvatar?: number;
  content: string;
  imageUri?: string;
  timeAgo: string;
  likes: number;
  comments: number;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function AvatarWithRing({ name, avatarSrc, colors }: { name: string; avatarSrc?: number; colors: any }) {
  return (
    <View style={styles.avatarOuter}>
      <LinearGradient
        colors={[colors.primary, '#7C3AED']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.avatarGradient}
      >
        <View style={[styles.avatarInner, { backgroundColor: colors.secondary }]}>
          {avatarSrc ? (
            <Image source={avatarSrc} style={styles.avatarImage} />
          ) : (
            <Text style={[styles.avatarText, { color: '#FFF' }]}>{name[0]}</Text>
          )}
        </View>
      </LinearGradient>
    </View>
  );
}

function LikeButton({ liked, onPress, color, count }: { liked: boolean; onPress: () => void; color: string; count: number }) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = useCallback(() => {
    scale.value = withSequence(
      withSpring(1.3, { damping: 8, stiffness: 200 }),
      withSpring(1, { damping: 12, stiffness: 300 })
    );
    onPress();
  }, [onPress]);

  return (
    <AnimatedPressable style={[styles.actionButton, animatedStyle]} onPress={handlePress}>
      <Ionicons
        name={liked ? 'heart' : 'heart-outline'}
        size={22}
        color={liked ? '#FF3B30' : color}
      />
      <Text style={[styles.actionText, { color: liked ? '#FF3B30' : color }]}>{count}</Text>
    </AnimatedPressable>
  );
}

export default function PostCard({
  authorName,
  authorRole,
  authorAvatar,
  content,
  imageUri,
  timeAgo,
  likes,
  comments,
}: PostCardProps) {
  const { colors } = useAppTheme();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const scale = useSharedValue(1);

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.99, { damping: 20, stiffness: 400 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 20, stiffness: 400 });
  };

  const handleLike = useCallback(() => {
    setLiked(prev => {
      setLikeCount(c => prev ? c - 1 : c + 1);
      return !prev;
    });
  }, []);

  return (
    <AnimatedPressable
      style={[
        styles.container,
        cardAnimatedStyle,
        { backgroundColor: colors.surface }
      ]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <LinearGradient
        colors={['transparent', 'transparent']}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.header}>
        <AvatarWithRing name={authorName} avatarSrc={authorAvatar} colors={colors} />
        <View style={styles.authorInfo}>
          <Text style={[styles.authorName, { color: colors.text }]} numberOfLines={1}>{authorName}</Text>
          <View style={styles.authorMeta}>
            <Text style={[styles.authorRole, { color: colors.textSecondary }]} numberOfLines={1}>{authorRole}</Text>
            <Text style={[styles.dot, { color: colors.textLight }]}>&#183;</Text>
            <Text style={[styles.timeAgo, { color: colors.textLight }]}>{timeAgo}</Text>
          </View>
        </View>
        <Pressable style={styles.moreButton} hitSlop={8}>
          <Ionicons name="ellipsis-horizontal" size={20} color={colors.iconSecondary} />
        </Pressable>
      </View>

      <Text style={[styles.content, { color: colors.text }]}>{content}</Text>

      {imageUri && (
        <View style={[styles.imageWrapper, { backgroundColor: colors.background }]}>
          <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.02)']}
            style={styles.imageOverlay}
            pointerEvents="none"
          />
        </View>
      )}

      <View style={[styles.actions, { borderTopColor: colors.separator }]}>
        <LikeButton liked={liked} onPress={handleLike} color={colors.iconSecondary} count={likeCount} />
        <Pressable style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={21} color={colors.iconSecondary} />
          <Text style={[styles.actionText, { color: colors.iconSecondary }]}>{comments}</Text>
        </Pressable>
        <Pressable style={styles.actionButton}>
          <Ionicons name="repeat" size={21} color={colors.iconSecondary} />
        </Pressable>
        <Pressable style={styles.actionButton}>
          <Ionicons name="share-outline" size={21} color={colors.iconSecondary} />
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
    overflow: 'hidden',
    ...Theme.shadow.light,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.spacing.md,
    paddingBottom: Theme.spacing.sm,
  },
  avatarOuter: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
  },
  avatarGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInner: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarText: {
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.bold,
  },
  authorInfo: {
    flex: 1,
    marginLeft: Theme.spacing.sm,
  },
  authorName: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.semibold,
    letterSpacing: -0.2,
  },
  authorMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  authorRole: {
    fontSize: Theme.fontSize.xs,
    maxWidth: 120,
  },
  dot: {
    fontSize: 14,
    marginHorizontal: 4,
  },
  timeAgo: {
    fontSize: Theme.fontSize.xs,
  },
  moreButton: {
    padding: Theme.spacing.xs,
  },
  content: {
    fontSize: Theme.fontSize.md,
    lineHeight: 22,
    paddingHorizontal: Theme.spacing.md,
    paddingBottom: Theme.spacing.md,
    letterSpacing: -0.1,
  },
  imageWrapper: {
    width: '100%',
    height: 220,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  actions: {
    flexDirection: 'row',
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.md,
    borderTopWidth: 0.5,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Theme.spacing.lg,
  },
  actionText: {
    fontSize: Theme.fontSize.sm,
    marginLeft: 4,
    minWidth: 16,
  },
});
