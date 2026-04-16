import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@/constants/AppContext';
import { Theme } from '@/constants/Theme';

interface BottomTabBarProps {
  activeTab?: string;
}

const tabs = [
  { key: 'home', icon: 'home', route: '/(tabs)/HomeScreen' },
  { key: 'explore', icon: 'search', route: '/(tabs)/ExploreScreen' },
  { key: 'alerts', icon: 'notifications', route: '/(tabs)/NotifScreen' },
  { key: 'profile', icon: 'person', route: '/(tabs)/ProfileScreen' },
];

export default function BottomTabBar({ activeTab }: BottomTabBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { colors } = useAppTheme();

  const getCurrentTab = () => {
    if (pathname.includes('HomeScreen')) return 'home';
    if (pathname.includes('ExploreScreen')) return 'explore';
    if (pathname.includes('NotifScreen')) return 'alerts';
    if (pathname.includes('ProfileScreen')) return 'profile';
    return 'home';
  };

  const currentTab = activeTab || getCurrentTab();

  const handleTabPress = (route: string) => {
    router.push(route as any);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
      {tabs.map((tab) => {
        const isActive = currentTab === tab.key;
        return (
          <Pressable
            key={tab.key}
            style={[styles.tabItem, isActive && { backgroundColor: colors.secondary }]}
            onPress={() => handleTabPress(tab.route)}
          >
            <Ionicons 
              name={isActive ? tab.icon : `${tab.icon}-outline` as any} 
              size={24} 
              color={isActive ? colors.tabActive : colors.tabInactive} 
            />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: 1,
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
});