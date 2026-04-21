import React from 'react';
import { View, StyleSheet, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@/constants/AppContext';
import { Theme } from '@/constants/Theme';
import { Images } from '@/constants/Images';

interface TopBarProps {
  showLogo?: boolean;
  showSearch?: boolean;
  showMenu?: boolean;
  onMenuPress?: () => void;
  onSearchPress?: () => void;
}

export default function TopBar({
  showLogo = true,
  showSearch = true,
  showMenu = true,
  onMenuPress,
  onSearchPress,
}: TopBarProps) {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={styles.leftSection}>
        {showMenu && (
          <Pressable onPress={onMenuPress} style={styles.iconButton}>
            <Ionicons name="menu" size={26} color={colors.icon} />
          </Pressable>
        )}
      </View>

      <View style={styles.centerSection}>
        {showLogo && (
          <View style={styles.logoContainer}>
            <Image source={Images.logo.main} style={styles.logoImage} resizeMode="contain" />
          </View>
        )}
      </View>

      <View style={styles.rightSection}>
        {showSearch && (
          <Pressable onPress={onSearchPress} style={styles.iconButton}>
            <Ionicons name="search" size={24} color={colors.icon} />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  leftSection: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerSection: {
    flex: 2,
    alignItems: 'center',
  },
  rightSection: {
    flex: 1,
    alignItems: 'flex-end',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage: {
    width: 30,
    height: 30,
  },
  iconButton: {
    padding: Theme.spacing.xs,
  },
});