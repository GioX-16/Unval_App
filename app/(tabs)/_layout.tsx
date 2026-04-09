import React from 'react';
import { Text, View } from 'react-native';
import { Tabs } from 'expo-router';
import { useColorScheme } from '@/components/useColorScheme';
import { Theme } from '@/constants/Theme';

function TabBarIcon(props: {
  icon: string;
  color: string;
}) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 22, color: props.color }}>{props.icon}</Text>
    </View>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Theme.colors.primary,
        tabBarInactiveTintColor: Theme.colors.textLight,
        tabBarStyle: {
          display: 'none',
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="HomeScreen"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon icon="⌂" color={color} />,
        }}
      />
      <Tabs.Screen
        name="ExploreScreen"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <TabBarIcon icon="🔍" color={color} />,
        }}
      />
      <Tabs.Screen
        name="NotifScreen"
        options={{
          title: 'Alerts',
          tabBarIcon: ({ color }) => <TabBarIcon icon="🔔" color={color} />,
        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon icon="👤" color={color} />,
        }}
      />
    </Tabs>
  );
}
