import React, { useState, useCallback, useEffect, useRef } from 'react';
import { View, ScrollView, StyleSheet, Pressable, Text, TextInput, Modal, RefreshControl, Animated as RNAnimated, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import TopBar from '@/components/TopBar';
import BottomTabBar from '@/components/BottomTabBar';
import CreatePostBar from '@/components/CreatePostBar';
import PostCard from '@/components/PostCard';
import FeedFilters from '@/components/FeedFilters';
import SideMenu from '@/components/SideMenu';
import { useAppTheme, useTranslation } from '@/constants/AppContext';
import { Theme } from '@/constants/Theme';
import { Images } from '@/constants/Images';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

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
    content: 'Busco companero para proyecto final de Termodinamica. Quien se une? Tengo experiencia con simulaciones.',
    timeAgo: '2d',
    likes: 8,
    comments: 3,
  },
];

function PostEntryAnimation({ children, index }: { children: React.ReactNode; index: number }) {
  const opacity = useRef(new RNAnimated.Value(0)).current;
  const translateY = useRef(new RNAnimated.Value(30)).current;

  useEffect(() => {
    RNAnimated.parallel([
      RNAnimated.timing(opacity, {
        toValue: 1,
        duration: 400,
        delay: index * 100,
        useNativeDriver: true,
      }),
      RNAnimated.timing(translateY, {
        toValue: 0,
        duration: 400,
        delay: index * 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <RNAnimated.View style={{ opacity, transform: [{ translateY }] }}>
      {children}
    </RNAnimated.View>
  );
}

export default function HomeScreen() {
  const { colors } = useAppTheme();
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');
  const [menuVisible, setMenuVisible] = useState(false);
  const [createPostModal, setCreatePostModal] = useState(false);
  const [postText, setPostText] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1200);
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <TopBar
        onMenuPress={() => setMenuVisible(true)}
        onSearchPress={() => {}}
      />

      <CreatePostBar onPress={() => setCreatePostModal(true)} avatarUri={Images.avatars.gio as any} />

      <FeedFilters
        filters={FILTERS}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <ScrollView
        style={styles.feed}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary, '#7C3AED']}
            progressBackgroundColor={colors.surface}
          />
        }
      >
        <View style={styles.feedTopSpacer} />
        {SAMPLE_POSTS.map((post, index) => (
          <PostEntryAnimation key={post.id} index={index}>
            <PostCard
              authorName={post.authorName}
              authorRole={post.authorRole}
              content={post.content}
              timeAgo={post.timeAgo}
              likes={post.likes}
              comments={post.comments}
            />
          </PostEntryAnimation>
        ))}
        <View style={styles.bottomPadding} />
      </ScrollView>

      <LinearGradient
        colors={['transparent', colors.background]}
        style={styles.fadeEdge}
        pointerEvents="none"
      />

      <BottomTabBar activeTab="home" />
      <SideMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />

      <Modal visible={createPostModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <Pressable style={styles.modalBackdrop} onPress={() => setCreatePostModal(false)} />
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <View style={styles.modalHeader}>
              <Pressable onPress={() => setCreatePostModal(false)} hitSlop={8}>
                <Ionicons name="close" size={24} color={colors.icon} />
              </Pressable>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Nueva Publicacion</Text>
              <Pressable
                style={[styles.postButton, { backgroundColor: colors.primary, opacity: postText.trim() ? 1 : 0.5 }]}
                onPress={() => {
                  if (postText.trim()) {
                    setPostText('');
                    setCreatePostModal(false);
                  }
                }}
              >
                <Text style={styles.postButtonText}>Publicar</Text>
              </Pressable>
            </View>
            <TextInput
              style={[styles.postInput, { color: colors.text, borderColor: colors.border }]}
              placeholder="Que esta pasando?"
              placeholderTextColor={colors.textSecondary}
              multiline
              value={postText}
              onChangeText={setPostText}
              autoFocus
            />
            <View style={styles.postActions}>
              <Pressable style={styles.mediaOption}>
                <Ionicons name="image-outline" size={24} color={colors.primary} />
                <Text style={[styles.mediaLabel, { color: colors.textSecondary }]}>Foto</Text>
              </Pressable>
              <Pressable style={styles.mediaOption}>
                <Ionicons name="videocam-outline" size={24} color={colors.primary} />
                <Text style={[styles.mediaLabel, { color: colors.textSecondary }]}>Video</Text>
              </Pressable>
              <Pressable style={styles.mediaOption}>
                <Ionicons name="attach-outline" size={24} color={colors.primary} />
                <Text style={[styles.mediaLabel, { color: colors.textSecondary }]}>Archivo</Text>
              </Pressable>
              <Pressable style={styles.mediaOption}>
                <Ionicons name="location-outline" size={24} color={colors.primary} />
                <Text style={[styles.mediaLabel, { color: colors.textSecondary }]}>Ubicacion</Text>
              </Pressable>
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
  feedTopSpacer: {
    height: Theme.spacing.xs,
  },
  bottomPadding: {
    height: Theme.spacing.xl,
  },
  fadeEdge: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    height: 40,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
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
    paddingBottom: Theme.spacing.sm,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0,0,0,0.08)',
  },
  modalTitle: {
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.semibold,
    letterSpacing: -0.3,
  },
  postButton: {
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.md,
  },
  postButtonText: {
    color: '#FFFFFF',
    fontWeight: Theme.fontWeight.semibold,
    fontSize: Theme.fontSize.sm,
  },
  postInput: {
    borderWidth: 1,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    fontSize: Theme.fontSize.md,
    minHeight: 140,
    textAlignVertical: 'top',
    lineHeight: 22,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: Theme.spacing.md,
  },
  mediaOption: {
    alignItems: 'center',
    gap: 4,
  },
  mediaLabel: {
    fontSize: Theme.fontSize.xs,
  },
});
