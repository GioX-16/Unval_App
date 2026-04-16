import React from 'react';
import { View, Text, StyleSheet, Pressable, Switch, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme, useTranslation } from '@/constants/AppContext';
import { Theme } from '@/constants/Theme';

interface SideMenuProps {
  visible: boolean;
  onClose: () => void;
}

export default function SideMenu({ visible, onClose }: SideMenuProps) {
  const router = useRouter();
  const { theme, toggleTheme, setLanguage, language, colors } = useAppTheme();
  const { t } = useTranslation();

  if (!visible) return null;

  const handleNavigation = (route: string) => {
    onClose();
    router.push(route as any);
  };

  const menuItems = [
    { icon: 'home', label: t('home'), route: '/(tabs)/HomeScreen' },
    { icon: 'search', label: t('explore'), route: '/(tabs)/ExploreScreen' },
    { icon: 'notifications', label: t('alerts'), route: '/(tabs)/NotifScreen' },
    { icon: 'person', label: t('profile'), route: '/(tabs)/ProfileScreen' },
  ];

  const bottomItems = [
    { icon: 'settings', label: t('settings'), route: '/modal' },
    { icon: 'bookmark', label: t('saved'), route: '/modal' },
    { icon: 'help-circle', label: 'Ayuda', route: '/modal' },
  ];

  return (
    <View style={styles.overlay}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={[styles.container, { backgroundColor: colors.card }]}>
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <View style={styles.logoContainer}>
            <Ionicons name="school" size={28} color={colors.primary} />
            <Text style={[styles.logo, { color: colors.text }]}>UNVAL</Text>
          </View>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color={colors.icon} />
          </Pressable>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
              NAVEGACION
            </Text>
            {menuItems.map((item, index) => (
              <Pressable
                key={index}
                style={[styles.menuItem, { borderBottomColor: colors.separator }]}
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
                style={[styles.menuItem, { borderBottomColor: colors.separator }]}
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
                size={22} 
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
              <Ionicons name="language" size={22} color={colors.icon} />
              <Text style={[styles.settingText, { color: colors.text }]}>{t('language')}</Text>
            </View>
            <View style={styles.languageButtons}>
              <Pressable
                style={[
                  styles.langButton,
                  { backgroundColor: language === 'es' ? colors.primary : colors.surface }
                ]}
                onPress={() => setLanguage('es')}
              >
                <Text style={[
                  styles.langText,
                  { color: language === 'es' ? colors.surface : colors.textSecondary }
                ]}>
                  ES
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.langButton,
                  { backgroundColor: language === 'en' ? colors.primary : colors.surface }
                ]}
                onPress={() => setLanguage('en')}
              >
                <Text style={[
                  styles.langText,
                  { color: language === 'en' ? colors.surface : colors.textSecondary }
                ]}>
                  EN
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    zIndex: 1000,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    width: 300,
    height: '100%',
    ...Theme.shadow.heavy,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Theme.spacing.md,
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
  closeButton: {
    padding: Theme.spacing.xs,
  },
  content: {
    flex: 1,
  },
  section: {
    paddingTop: Theme.spacing.md,
  },
  sectionTitle: {
    fontSize: Theme.fontSize.xs,
    fontWeight: Theme.fontWeight.semibold,
    paddingHorizontal: Theme.spacing.md,
    marginBottom: Theme.spacing.sm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.spacing.md,
    borderBottomWidth: 1,
  },
  menuText: {
    fontSize: Theme.fontSize.md,
    marginLeft: Theme.spacing.md,
  },
  footer: {
    padding: Theme.spacing.md,
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