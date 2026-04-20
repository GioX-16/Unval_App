import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@/constants/AppContext';

function TabBarIcon(props: {
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  focused: boolean;
}) {
  return (
    <Ionicons 
      name={props.focused ? props.icon : `${props.icon}-outline` as keyof typeof Ionicons.glyphMap} 
      size={24} 
      color={props.color} 
    />
  );
}

export default function TabLayout() {
  const { colors } = useAppTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          display: 'none',
        },
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Tabs.Screen
        name="HomeScreen"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => <TabBarIcon icon="home" color={color} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="ExploreScreen"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => <TabBarIcon icon="search" color={color} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="NotifScreen"
        options={{
          title: 'Alerts',
          tabBarIcon: ({ color, focused }) => <TabBarIcon icon="notifications" color={color} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => <TabBarIcon icon="person" color={color} focused={focused} />,
        }}
      />
    </Tabs>
  );
}