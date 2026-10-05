import React, { useState } from 'react';
import { ScrollView, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import TopBar from '@/components/TopBar';
import BottomTabBar from '@/components/BottomTabBar';
import SideMenu from '@/components/SideMenu';
import { useAppTheme } from '@/constants/AppContext';

export type TabKey = 'home' | 'explore' | 'alerts' | 'profile';

export interface ScreenContainerProps {
  children: React.ReactNode;
  /** Muestra el logo de marca en la TopBar. */
  showLogo?: boolean;
  showSearch?: boolean;
  showMenu?: boolean;
  activeTab?: TabKey;
  /** Envuelve el contenido en un ScrollView (false para listas virtualizadas). */
  scroll?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  /** Reemplaza la TopBar por un header custom. */
  header?: React.ReactNode;
  onSearchPress?: () => void;
  edges?: ('top' | 'bottom')[];
}

/**
 * Layout base de pantalla: SafeAreaView + TopBar + BottomTabBar + SideMenu.
 * Elimina el boilerplate repetido en cada pantalla.
 */
export const ScreenContainer = ({
  children,
  showLogo = true,
  showSearch = true,
  showMenu = true,
  activeTab,
  scroll = true,
  contentContainerStyle,
  header,
  onSearchPress,
  edges = ['top'],
}: ScreenContainerProps) => {
  const { colors } = useAppTheme();
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={edges}>
      {header ?? (
        <TopBar
          showLogo={showLogo}
          showSearch={showSearch}
          showMenu={showMenu}
          onMenuPress={() => setMenuVisible(true)}
          onSearchPress={onSearchPress}
        />
      )}

      {scroll ? (
        <ScrollView
          style={styles.flex}
          contentContainerStyle={contentContainerStyle}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.flex, contentContainerStyle]}>{children}</View>
      )}

      <BottomTabBar activeTab={activeTab} />
      <SideMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
});
