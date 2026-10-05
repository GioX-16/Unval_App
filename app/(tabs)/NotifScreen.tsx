import React from 'react';
import { StyleSheet } from 'react-native';

import { EmptyState, ScreenContainer } from '@/components/ui';

export default function NotifScreen() {
  return (
    <ScreenContainer activeTab="alerts" contentContainerStyle={styles.content}>
      <EmptyState
        icon="notifications-outline"
        title="Sin notificaciones"
        description="Cuando alguien interactúe contigo o con tus publicaciones, lo verás aquí."
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
