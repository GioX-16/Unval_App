import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
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
      <LinearGradient
        colors={[colors.primary, '#7C3AED']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.avatarGradient}
      >
        <View style={[styles.avatarInner, { backgroundColor: colors.secondary }]}>
          {avatarUri ? (
            <Image source={avatarUri} style={styles.avatarImage} />
          ) : (
            <Ionicons name="person" size={18} color="#FFF" />
          )}
        </View>
      </LinearGradient>

      <View style={[styles.inputField, { backgroundColor: colors.background }]}>
        <Text style={[styles.placeholder, { color: colors.textLight }]}>
          Que esta pasando?
        </Text>
      </View>

      <View style={styles.actionsRow}>
        <Pressable style={styles.iconBtn} hitSlop={8}>
          <Ionicons name="image-outline" size={22} color={colors.primary} />
        </Pressable>
        <Pressable style={styles.iconBtn} hitSlop={8}>
          <Ionicons name="videocam-outline" size={22} color={colors.primary} />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.spacing.sm,
    borderWidth: 1,
    borderRadius: Theme.borderRadius.lg,
    marginHorizontal: Theme.spacing.md,
    marginVertical: Theme.spacing.sm,
    ...Theme.shadow.light,
  },
  avatarGradient: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInner: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  inputField: {
    flex: 1,
    marginHorizontal: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm + 2,
    borderRadius: Theme.borderRadius.xl,
  },
  placeholder: {
    fontSize: Theme.fontSize.sm,
    letterSpacing: -0.2,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 4,
  },
  iconBtn: {
    padding: Theme.spacing.xs,
  },
});
