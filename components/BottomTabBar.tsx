import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
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

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function TabButton({ icon, isActive, onPress, color }: { icon: string; isActive: boolean; onPress: () => void; color: string }) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.9, { damping: 15, stiffness: 400 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 400 });
  };

  return (
    <AnimatedPressable
      style={[styles.tabItem, animatedStyle, isActive && { backgroundColor: '#E8F4FD' }]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Ionicons
        name={isActive ? icon : `${icon}-outline` as any}
        size={24}
        color={isActive ? '#0095F6' : color}
      />
    </AnimatedPressable>
  );
}

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
      {tabs.map((tab) => (
        <TabButton
          key={tab.key}
          icon={tab.icon}
          isActive={currentTab === tab.key}
          color={colors.textSecondary}
          onPress={() => handleTabPress(tab.route)}
        />
      ))}
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