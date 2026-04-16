import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TextInput, Pressable, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import TopBar from '@/components/TopBar';
import BottomTabBar from '@/components/BottomTabBar';
import { UserCard, CommunityCard } from '@/components/SearchCards';
import SideMenu from '@/components/SideMenu';
import { useAppTheme, useTranslation } from '@/constants/AppContext';
import { Theme } from '@/constants/Theme';

const STUDENTS = [
  { id: '1', name: 'Ana Martinez', role: 'Ing. Sistemas - Senior', isVerified: true },
  { id: '2', name: 'Roberto Sanchez', role: 'Ing. Industrial - Junior', isVerified: false },
  { id: '3', name: 'Laura Hernandez', role: 'Lic. Administracion - Senior', isVerified: true },
  { id: '4', name: 'Pedro Lopez', role: 'Ing. Mecanica - Senior', isVerified: false },
  { id: '5', name: 'Maria Garcia', role: 'Ing. Electronica - Junior', isVerified: true },
];

const COMMUNITIES = [
  { id: '1', name: 'Club de Programacion', category: 'Ing. Sistemas', members: 245 },
  { id: '2', name: 'Aso. de Ingenieros', category: 'Multicarrera', members: 520 },
  { id: '3', name: 'Club de Deportes', category: 'Deportes', members: 180 },
  { id: '4', name: 'Circular Academico', category: 'Ing. Industrial', members: 95 },
  { id: '5', name: 'Hackathon UNVAL', category: 'Eventos', members: 312 },
];

export default function ExploreScreen() {
  const { colors } = useAppTheme();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'students' | 'communities'>('students');
  const [menuVisible, setMenuVisible] = useState(false);

  const filteredStudents = STUDENTS.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCommunities = COMMUNITIES.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <TopBar 
        onMenuPress={() => setMenuVisible(true)}
        onSearchPress={() => {}}
      />

      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Ionicons name="search" size={20} color={colors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder={t('searchPlaceholder')}
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
            </Pressable>
          )}
        </View>
      </View>

      <View style={styles.tabs}>
        <Pressable
          style={[styles.tab, activeTab === 'students' && { backgroundColor: colors.primary }]}
          onPress={() => setActiveTab('students')}
        >
          <Text style={[styles.tabText, activeTab === 'students' && { color: '#FFF' }]}>
            {t('students')}
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === 'communities' && { backgroundColor: colors.primary }]}
          onPress={() => setActiveTab('communities')}
        >
          <Text style={[styles.tabText, activeTab === 'communities' && { color: '#FFF' }]}>
            {t('communities')}
          </Text>
        </Pressable>
      </View>

      <ScrollView style={styles.results} showsVerticalScrollIndicator={false}>
        {activeTab === 'students' ? (
          filteredStudents.length > 0 ? (
            filteredStudents.map(student => (
              <UserCard key={student.id} {...student} />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="person-add" size={48} color={colors.textLight} />
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                No se encontraron estudiantes
              </Text>
            </View>
          )
        ) : (
          filteredCommunities.length > 0 ? (
            filteredCommunities.map(community => (
              <CommunityCard key={community.id} {...community} />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="people" size={48} color={colors.textLight} />
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                No se encontraron comunidades
              </Text>
            </View>
          )
        )}
        <View style={styles.bottomPadding} />
      </ScrollView>

      <BottomTabBar activeTab="explore" />
      <SideMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.lg,
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: Theme.spacing.sm,
    fontSize: Theme.fontSize.md,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: Theme.spacing.md,
    gap: Theme.spacing.sm,
  },
  tab: {
    flex: 1,
    paddingVertical: Theme.spacing.sm,
    alignItems: 'center',
    borderRadius: Theme.borderRadius.md,
    backgroundColor: 'rgba(0,149,246,0.1)',
  },
  tabText: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.medium,
    color: '#0095F6',
  },
  results: {
    flex: 1,
    paddingHorizontal: Theme.spacing.md,
    paddingTop: Theme.spacing.md,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: Theme.spacing.xl * 2,
  },
  emptyText: {
    fontSize: Theme.fontSize.md,
    marginTop: Theme.spacing.md,
  },
  bottomPadding: {
    height: Theme.spacing.xl,
  },
});