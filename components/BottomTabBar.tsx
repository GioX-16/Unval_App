import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Theme } from '@/constants/Theme';

interface TabItem {
  key: string;
  label: string;
  icon: string;
}

interface BottomTabBarProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
}

const tabs: TabItem[] = [
  { key: 'home', label: 'Home', icon: '⌂' },
  { key: 'explore', label: 'Explore', icon: '🔍' },
  { key: 'alerts', label: 'Alerts', icon: '🔔' },
  { key: 'profile', label: 'Profile', icon: '👤' },
];

export default function BottomTabBar({ activeTab, onTabPress }: BottomTabBarProps) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <Pressable
            key={tab.key}
            style={[styles.tabItem, isActive && styles.activeTabItem]}
            onPress={() => onTabPress(tab.key)}
          >
            <Text style={[styles.icon, isActive && styles.activeIcon]}>
              {tab.icon}
            </Text>
            <Text style={[styles.label, isActive && styles.activeLabel]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.secondary,
    paddingBottom: 20,
    paddingTop: Theme.spacing.sm,
    ...Theme.shadow.light,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.md,
    marginHorizontal: Theme.spacing.xs,
  },
  activeTabItem: {
    backgroundColor: Theme.colors.secondary,
  },
  icon: {
    fontSize: 22,
    marginBottom: 2,
    opacity: 0.6,
  },
  activeIcon: {
    opacity: 1,
  },
  label: {
    fontSize: Theme.fontSize.xs,
    color: Theme.colors.textLight,
  },
  activeLabel: {
    color: Theme.colors.primary,
    fontWeight: '600',
  },
});
