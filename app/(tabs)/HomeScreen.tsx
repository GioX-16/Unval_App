import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Pressable, Text, TextInput, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import TopBar from '@/components/TopBar';
import BottomTabBar from '@/components/BottomTabBar';
import CreatePostBar from '@/components/CreatePostBar';
import PostCard from '@/components/PostCard';
import FeedFilters from '@/components/FeedFilters';
import SideMenu from '@/components/SideMenu';
import { useAppTheme, useTranslation } from '@/constants/AppContext';
import { Theme } from '@/constants/Theme';

const FILTERS = [
  { key: 'all', label: 'Todo' },
  { key: 'announcements', label: 'Anuncios' },
  { key: 'events', label: 'Eventos' },
  { key: 'marketplace', label: 'Marketplace' },
  { key: 'academic', label: 'Academico' },
];

const SAMPLE_POSTS = [
  {
    id: '1',
    authorName: 'Direccion de Sistemas',
    authorRole: 'Ing. Sistemas',
    content: 'Se les informa que el examen final de Programacion Web sera el proximo Martes a las 9:00 AM en el salon 201. Favor de prepararse.',
    timeAgo: '2h',
    likes: 45,
    comments: 12,
  },
  {
    id: '2',
    authorName: 'Maria Garcia',
    authorRole: 'Ing. Industrial - Senior',
    content: 'Vendo apuntes de Calculo Diferencial y Algebra Lineal. Excelente estado, incluye ejercicios resueltos. Interesados DM.',
    timeAgo: '5h',
    likes: 23,
    comments: 5,
  },
  {
    id: '3',
    authorName: 'Club de Eventos',
    authorRole: 'Estudiantes',
    content: 'No te pierdas el Hackathon 2024! Participa y demuestra tus habilidades. Registro gratuito hasta el 15 de Mayo.',
    timeAgo: '1d',
    likes: 156,
    comments: 34,
  },
  {
    id: '4',
    authorName: 'Carlos Lopez',
    authorRole: 'Ing. Mecanica - Junior',
    content: 'Busco compañero para proyecto final de Termodinamica. Quien se une? Tengo experiencia con simulaciones.',
    timeAgo: '2d',
    likes: 8,
    comments: 3,
  },
];

export default function HomeScreen() {
  const { colors } = useAppTheme();
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');
  const [menuVisible, setMenuVisible] = useState(false);
  const [createPostModal, setCreatePostModal] = useState(false);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <TopBar 
        onMenuPress={() => setMenuVisible(true)}
        onSearchPress={() => {}}
      />
      
      <CreatePostBar onPress={() => setCreatePostModal(true)} />

      <FeedFilters 
        filters={FILTERS}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <ScrollView style={styles.feed} showsVerticalScrollIndicator={false}>
        {SAMPLE_POSTS.map((post) => (
          <PostCard
            key={post.id}
            authorName={post.authorName}
            authorRole={post.authorRole}
            content={post.content}
            timeAgo={post.timeAgo}
            likes={post.likes}
            comments={post.comments}
          />
        ))}
        <View style={styles.bottomPadding} />
      </ScrollView>

      <BottomTabBar activeTab="home" />

      <SideMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />

      <Modal visible={createPostModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <View style={styles.modalHeader}>
              <Pressable onPress={() => setCreatePostModal(false)}>
                <Ionicons name="close" size={24} color={colors.icon} />
              </Pressable>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Nueva Publicacion</Text>
              <Pressable style={[styles.postButton, { backgroundColor: colors.primary }]}>
                <Text style={styles.postButtonText}>Publicar</Text>
              </Pressable>
            </View>
            <TextInput
              style={[styles.postInput, { color: colors.text, borderColor: colors.border }]}
              placeholder="Que esta pasando?"
              placeholderTextColor={colors.textSecondary}
              multiline
              numberOfLines={6}
            />
            <View style={styles.postActions}>
              <Ionicons name="image-outline" size={28} color={colors.primary} />
              <Ionicons name="videocam-outline" size={28} color={colors.primary} />
              <Ionicons name="attach-outline" size={28} color={colors.primary} />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  feed: {
    flex: 1,
  },
  bottomPadding: {
    height: Theme.spacing.xl,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: Theme.borderRadius.xl,
    borderTopRightRadius: Theme.borderRadius.xl,
    padding: Theme.spacing.md,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  modalTitle: {
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.semibold,
  },
  postButton: {
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.md,
  },
  postButtonText: {
    color: '#FFFFFF',
    fontWeight: Theme.fontWeight.semibold,
  },
  postInput: {
    borderWidth: 1,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    fontSize: Theme.fontSize.md,
    minHeight: 150,
    textAlignVertical: 'top',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: Theme.spacing.md,
  },
});