import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Theme } from '@/constants/Theme';

interface TopBarProps {
  title?: string;
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
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        {showMenu && (
          <Pressable onPress={onMenuPress} style={styles.iconButton}>
            <Text style={styles.menuIcon}>☰</Text>
          </Pressable>
        )}
      </View>

      <View style={styles.centerSection}>
        {showLogo && (
          <Text style={styles.logo}>UNI-VERSE</Text>
        )}
      </View>

      <View style={styles.rightSection}>
        {showSearch && (
          <Pressable onPress={onSearchPress} style={styles.iconButton}>
            <Text style={styles.searchIcon}>⌕</Text>
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
    backgroundColor: Theme.colors.primary,
    height: 56,
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
  logo: {
    fontSize: Theme.fontSize.lg,
    fontWeight: '700',
    color: Theme.colors.white,
    letterSpacing: 1,
  },
  iconButton: {
    padding: Theme.spacing.xs,
  },
  menuIcon: {
    fontSize: 24,
    color: Theme.colors.white,
  },
  searchIcon: {
    fontSize: 24,
    color: Theme.colors.white,
  },
});
