import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@/constants/AppContext';
import { Theme } from '@/constants/Theme';

interface CreatePostBarProps {
  onPress: () => void;
  avatarUri?: number;
}

export default function CreatePostBar({ onPress, avatarUri }: CreatePostBarProps) {
  const { colors } = useAppTheme();

  return (
    <Pressable 
      style={[styles.container, { backgroundColor: colors.surface, borderColor: colors.border }]} 
      onPress={onPress}
    >
      <View style={[styles.avatar, { backgroundColor: colors.secondary }]}>
        {avatarUri ? (
          <Image source={avatarUri} style={styles.avatarImage} />
        ) : (
          <Ionicons name="person" size={20} color={colors.primary} />
        )}
      </View>
      <View style={[styles.input, { backgroundColor: colors.background }]}>
        <Text style={[styles.placeholder, { color: colors.textSecondary }]}>
          Que esta pasando?
        </Text>
      </View>
      <View style={styles.actions}>
        <Ionicons name="image-outline" size={24} color={colors.primary} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.spacing.md,
    borderWidth: 1,
    borderRadius: Theme.borderRadius.lg,
    marginHorizontal: Theme.spacing.md,
    marginVertical: Theme.spacing.sm,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  input: {
    flex: 1,
    marginHorizontal: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.xl,
  },
  placeholder: {
    fontSize: Theme.fontSize.sm,
  },
  actions: {
    padding: Theme.spacing.xs,
  },
});