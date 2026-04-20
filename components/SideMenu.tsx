import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Switch, ScrollView, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS, Easing } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppTheme, useTranslation } from '@/constants/AppContext';
import { Theme } from '@/constants/Theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const MENU_WIDTH = 280;

interface SideMenuProps {
  visible: boolean;
  onClose: () => void;
}

export default function SideMenu({ visible, onClose }: SideMenuProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { theme, toggleTheme, setLanguage, language, colors } = useAppTheme();
  const { t } = useTranslation();

  const translateX = useSharedValue(-MENU_WIDTH);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      translateX.value = withTiming(0, { duration: 300, easing: Easing.out(Easing.cubic) });
      opacity.value = withTiming(1, { duration: 200 });
    } else {
      translateX.value = withTiming(-MENU_WIDTH, { duration: 250, easing: Easing.in(Easing.cubic) });
      opacity.value = withTiming(0, { duration: 150 });
    }
  }, [visible]);

  const menuAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const backdropAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const handleNavigation = (route: string) => {
    translateX.value = withTiming(-MENU_WIDTH, { duration: 200, easing: Easing.in(Easing.cubic) }, () => {
      runOnJS(onClose)();
      router.push(route as any);
    });
  };

  const handleClose = () => {
    translateX.value = withTiming(-MENU_WIDTH, { duration: 250, easing: Easing.in(Easing.cubic) });
    opacity.value = withTiming(0, { duration: 150 }, () => {
      runOnJS(onClose)();
    });
  };

  const menuItems = [
    { icon: 'home', label: t('home'), route: '/(tabs)/HomeScreen' },
    { icon: 'search', label: t('explore'), route: '/(tabs)/ExploreScreen' },
    { icon: 'notifications', label: t('alerts'), route: '/(tabs)/NotifScreen' },
    { icon: 'person', label: t('profile'), route: '/(tabs)/ProfileScreen' },
  ];

  const bottomItems = [
    { icon: 'settings-outline', label: t('settings'), route: '/modal' },
    { icon: 'bookmark-outline', label: t('saved'), route: '/modal' },
    { icon: 'help-circle-outline', label: 'Ayuda', route: '/modal' },
  ];

  return (
    <View style={styles.overlay} pointerEvents={visible ? 'auto' : 'none'}>
      <Animated.View style={[styles.backdrop, backdropAnimatedStyle]}>
        <Pressable style={styles.backdropPressable} onPress={handleClose} />
      </Animated.View>

      <Animated.View 
        style={[
          styles.container, 
          menuAnimatedStyle,
          { 
            backgroundColor: colors.surface,
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          }
        ]}
      >
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <View style={styles.logoContainer}>
            <Ionicons name="school" size={26} color={colors.primary} />
            <Text style={[styles.logo, { color: colors.text }]}>UNVAL</Text>
          </View>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
              NAVEGACION
            </Text>
            {menuItems.map((item, index) => (
              <Pressable
                key={index}
                style={({ pressed }) => [
                  styles.menuItem, 
                  { borderBottomColor: colors.separator },
                  pressed && { backgroundColor: colors.background }
                ]}
                onPress={() => handleNavigation(item.route)}
              >
                <Ionicons name={item.icon as any} size={22} color={colors.icon} />
                <Text style={[styles.menuText, { color: colors.text }]}>{item.label}</Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
              {t('settings').toUpperCase()}
            </Text>
            {bottomItems.map((item, index) => (
              <Pressable
                key={index}
                style={({ pressed }) => [
                  styles.menuItem, 
                  { borderBottomColor: colors.separator },
                  pressed && { backgroundColor: colors.background }
                ]}
                onPress={() => handleNavigation(item.route)}
              >
                <Ionicons name={item.icon as any} size={22} color={colors.icon} />
                <Text style={[styles.menuText, { color: colors.text }]}>{item.label}</Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>

        <View style={[styles.footer, { borderTopColor: colors.border }]}>
          <View style={styles.settingRow}>
            <View style={styles.settingItem}>
              <Ionicons 
                name={theme === 'dark' ? 'moon' : 'sunny'} 
                size={20} 
                color={colors.icon} 
              />
              <Text style={[styles.settingText, { color: colors.text }]}>
                {theme === 'dark' ? t('darkMode') : t('lightMode')}
              </Text>
            </View>
            <Switch
              value={theme === 'dark'}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.surface}
            />
          </View>

          <View style={[styles.settingRow, { borderTopWidth: 1, borderTopColor: colors.separator, paddingTop: Theme.spacing.md }]}>
            <View style={styles.settingItem}>
              <Ionicons name="globe-outline" size={20} color={colors.icon} />
              <Text style={[styles.settingText, { color: colors.text }]}>{t('language')}</Text>
            </View>
            <View style={styles.languageButtons}>
              <Pressable
                style={[
                  styles.langButton,
                  language === 'es' && { backgroundColor: colors.primary }
                ]}
                onPress={() => setLanguage('es')}
              >
                <Text style={[
                  styles.langText,
                  { color: language === 'es' ? '#FFF' : colors.textSecondary }
                ]}>
                  ES
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.langButton,
                  language === 'en' && { backgroundColor: colors.primary }
                ]}
                onPress={() => setLanguage('en')}
              >
                <Text style={[
                  styles.langText,
                  { color: language === 'en' ? '#FFF' : colors.textSecondary }
                ]}>
                  EN
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  backdropPressable: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: MENU_WIDTH,
    ...Theme.shadow.heavy,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.md,
    borderBottomWidth: 1,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
  },
  logo: {
    fontSize: Theme.fontSize.xl,
    fontWeight: Theme.fontWeight.bold,
  },
  content: {
    flex: 1,
  },
  section: {
    paddingTop: Theme.spacing.sm,
  },
  sectionTitle: {
    fontSize: Theme.fontSize.xs,
    fontWeight: Theme.fontWeight.semibold,
    paddingHorizontal: Theme.spacing.md,
    marginBottom: Theme.spacing.xs,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.md,
    borderBottomWidth: 1,
  },
  menuText: {
    fontSize: Theme.fontSize.md,
    marginLeft: Theme.spacing.md,
  },
  footer: {
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.md,
    borderTopWidth: 1,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
  },
  settingText: {
    fontSize: Theme.fontSize.md,
  },
  languageButtons: {
    flexDirection: 'row',
    gap: Theme.spacing.xs,
  },
  langButton: {
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.sm,
  },
  langText: {
    fontSize: Theme.fontSize.sm,
    fontWeight: Theme.fontWeight.semibold,
  },
});