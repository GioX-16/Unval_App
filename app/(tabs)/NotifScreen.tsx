import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import TopBar from '@/components/TopBar';
import BottomTabBar from '@/components/BottomTabBar';
import SideMenu from '@/components/SideMenu';
import { useAppTheme } from '@/constants/AppContext';

export default function NotifScreen() {
  const { colors } = useAppTheme();
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <TopBar 
        onMenuPress={() => setMenuVisible(true)}
        onSearchPress={() => {}}
      />
      <View style={[styles.placeholder, { backgroundColor: colors.surface }]}>
      </View>
      <BottomTabBar activeTab="alerts" />
      <SideMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
    </SafeAreaView>
  );
}

import { Theme } from '@/constants/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  placeholder: {
    flex: 1,
    marginHorizontal: Theme.spacing.md,
    marginTop: Theme.spacing.md,
    borderRadius: Theme.borderRadius.lg,
  },
});