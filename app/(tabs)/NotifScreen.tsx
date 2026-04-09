import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import TopBar from '@/components/TopBar';
import BottomTabBar from '@/components/BottomTabBar';
import SectionHeader from '@/components/SectionHeader';
import FriendRequestCard from '@/components/FriendRequestCard';
import ActivityRow from '@/components/ActivityRow';
import EventCard from '@/components/EventCard';
import { Theme } from '@/constants/Theme';

const FRIEND_REQUESTS = [
  {
    id: '1',
    name: 'María García',
    role: 'Ing. Industrial',
    mutualFriends: 12,
  },
  {
    id: '2',
    name: 'Carlos López',
    role: 'Lic. Administración',
    mutualFriends: 8,
  },
];

const ACTIVITIES = [
  {
    id: '1',
    userName: 'Laura Hernández',
    action: 'le dio me gusta a',
    target: 'tu anuncio',
    reactionIcon: '❤️',
  },
  {
    id: '2',
    userName: 'Pedro Sánchez',
    action: 'comentó en',
    target: 'tu publicación',
    reactionIcon: '💬',
  },
  {
    id: '3',
    userName: 'Ana Martínez',
    action: 'compartió',
    target: 'tu clase',
    reactionIcon: '🔄',
  },
];

export default function NotifScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <TopBar />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <SectionHeader title="Solicitudes de Amistad" badge={2} />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScroll}
        >
          {FRIEND_REQUESTS.map((request) => (
            <FriendRequestCard
              key={request.id}
              name={request.name}
              role={request.role}
              mutualFriends={request.mutualFriends}
            />
          ))}
        </ScrollView>

        <SectionHeader title="Actividad Reciente" />

        <View style={styles.activitiesList}>
          {ACTIVITIES.map((activity) => (
            <ActivityRow
              key={activity.id}
              userName={activity.userName}
              action={activity.action}
              target={activity.target}
              reactionIcon={activity.reactionIcon}
            />
          ))}
        </View>

        <SectionHeader title="Invitaciones a Eventos" />

        <View style={styles.eventsList}>
          <EventCard
            eventTitle="Hackathon 2024"
            eventDescription="Evento de programación intensiva de 48 horas."
            invitee="Dr. Roberto Fernández"
          />
          <EventCard
            eventTitle="Feria de Proyectos"
            eventDescription="Exhibición de proyectos finales del semestre."
            invitee="Mtra. Carmen López"
          />
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
      <BottomTabBar activeTab="alerts" onTabPress={() => {}} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  horizontalScroll: {
    paddingHorizontal: Theme.spacing.md,
    paddingBottom: Theme.spacing.md,
  },
  activitiesList: {
    backgroundColor: Theme.colors.white,
    marginHorizontal: Theme.spacing.md,
    borderRadius: Theme.borderRadius.lg,
    paddingHorizontal: Theme.spacing.md,
    ...Theme.shadow.light,
  },
  eventsList: {
    paddingHorizontal: Theme.spacing.md,
  },
  bottomPadding: {
    height: Theme.spacing.xl,
  },
});
