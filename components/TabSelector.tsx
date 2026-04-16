import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useAppTheme } from '@/constants/AppContext';
import { Theme } from '@/constants/Theme';

interface TabSelectorProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function TabSelector({ tabs, activeTab, onTabChange }: TabSelectorProps) {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <Pressable
            key={tab}
            style={[styles.tab, isActive && { backgroundColor: colors.surface, ...Theme.shadow.light }]}
            onPress={() => onTabChange(tab)}
          >
            <Text style={[styles.tabText, isActive ? { color: colors.primary, fontWeight: '600' } : { color: colors.textSecondary }]}>
              {tab}
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
    padding: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.md,
    marginHorizontal: Theme.spacing.md,
    marginVertical: Theme.spacing.md,
  },
  tab: {
    flex: 1,
    paddingVertical: Theme.spacing.sm,
    alignItems: 'center',
    borderRadius: Theme.borderRadius.sm,
  },
  tabText: {
    fontSize: Theme.fontSize.sm,
    fontWeight: '500',
  },
});