import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import TopBar from '@/components/TopBar';
import BottomTabBar from '@/components/BottomTabBar';
import ProfileHeader from '@/components/ProfileHeader';
import TabSelector from '@/components/TabSelector';
import AdCard from '@/components/AdCard';
import { Theme } from '@/constants/Theme';

const TABS = ['Mis Anuncios', 'Clases', 'Media'];

const SAMPLE_ADS = [
  {
    id: '1',
    category: 'MARKETPLACE',
    timeAgo: 'Hace 2h',
    title: 'Vendo libros de Cálculo Diferencial',
    description: 'Libros en excelente estado, incluye problemas resueltos y material de apoyo.',
    price: '$350 MXN',
  },
  {
    id: '2',
    category: 'MARKETPLACE',
    timeAgo: 'Hace 5h',
    title: 'Busco compañero para proyecto de BD',
    description: 'Necesito alguien para trabajar en el proyecto final de Bases de Datos.',
    price: undefined,
  },
  {
    id: '3',
    category: 'MARKETPLACE',
    timeAgo: 'Hace 1d',
    title: 'Venta de notas adhesivas y útiles',
    description: 'Paquete completo de útiles escolares, ideales para esta temporada.',
    price: '$150 MXN',
  },
];

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState('Mis Anuncios');

  const renderContent = () => {
    switch (activeTab) {
      case 'Mis Anuncios':
        return (
          <View style={styles.adsList}>
            {SAMPLE_ADS.map((ad) => (
              <AdCard
                key={ad.id}
                category={ad.category}
                timeAgo={ad.timeAgo}
                title={ad.title}
                description={ad.description}
                price={ad.price}
              />
            ))}
          </View>
        );
      case 'Clases':
        return (
          <View style={styles.emptyState}>
            <AdCard
              category="CLASES"
              timeAgo="Hace 3d"
              title="Tutoría de Matemáticas"
              description="Clases particulares de cálculo y álgebra lineal para nivel universitario."
            />
          </View>
        );
      case 'Media':
        return (
          <View style={styles.emptyState}>
            <AdCard
              category="MEDIA"
              timeAgo="Hace 1 sem"
              title="Fotos del evento de ingeniería"
              description="Galería de fotos del Hackathon 2024."
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <TopBar />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <ProfileHeader
          name="Arturo Mendoza"
          username="arturo_mendoza"
          major="ING. SISTEMAS"
          year="SENIOR"
          bio="Estudiante de Ingeniería en Sistemas Computacionales. Apasionado por el desarrollo web y la inteligencia artificial. Siempre buscando aprender cosas nuevas."
          location="Ciudad de México"
          website="arturomendoza.dev"
        />

        <TabSelector
          tabs={TABS}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <View style={styles.content}>{renderContent()}</View>
      </ScrollView>
      <BottomTabBar activeTab="profile" />
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
  content: {
    paddingHorizontal: Theme.spacing.md,
    paddingBottom: Theme.spacing.xl,
  },
  adsList: {
    marginTop: Theme.spacing.sm,
  },
  emptyState: {
    paddingVertical: Theme.spacing.md,
  },
});
