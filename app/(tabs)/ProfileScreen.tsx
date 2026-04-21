import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AdCard from "@/components/AdCard";
import BottomTabBar from "@/components/BottomTabBar";
import ProfileHeader from "@/components/ProfileHeader";
import TabSelector from "@/components/TabSelector";
import TopBar from "@/components/TopBar";
import SideMenu from "@/components/SideMenu";
import { useAppTheme, useTranslation } from "@/constants/AppContext";
import { Theme } from "@/constants/Theme";
import { Images } from "@/constants/Images";

const TABS = ["Mis Anuncios", "Clases", "Media"];

const SAMPLE_ADS = [
  {
    id: "1",
    category: "MARKETPLACE",
    timeAgo: "Hace 2h",
    title: "Vendo libros de Calculo Diferencial",
    description:
      "Libros en excelente estado, incluye problemas resueltos y material de apoyo.",
    price: "$350 MXN",
  },
  {
    id: "2",
    category: "MARKETPLACE",
    timeAgo: "Hace 5h",
    title: "Busco companero para proyecto de BD",
    description:
      "Necesito alguien para trabajar en el proyecto final de Bases de Datos.",
    price: undefined,
  },
  {
    id: "3",
    category: "MARKETPLACE",
    timeAgo: "Hace 1d",
    title: "Venta de notas adhesivas y utiles",
    description:
      "Paquete completo de utiles escolares, ideales para esta temporada.",
    price: "$150 MXN",
  },
];

export default function ProfileScreen() {
  const { colors } = useAppTheme();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("Mis Anuncios");
  const [menuVisible, setMenuVisible] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "Mis Anuncios":
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
      case "Clases":
        return (
          <View style={styles.emptyState}>
            <AdCard
              category="CLASES"
              timeAgo="Hace 3d"
              title="Tutoria de Matematicas"
              description="Clases particulares de calculo y algebra lineal para nivel universitario."
            />
          </View>
        );
      case "Media":
        return (
          <View style={styles.emptyState}>
            <AdCard
              category="MEDIA"
              timeAgo="Hace 1 sem"
              title="Fotos del evento de ingenieria"
              description="Galeria de fotos del Hackathon 2024."
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={["top"]}>
      <TopBar 
        onMenuPress={() => setMenuVisible(true)}
        onSearchPress={() => {}}
      />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <ProfileHeader
          name="Geovanny Sandino"
          username="geovanny_sandino"
          avatarUri={Images.avatars.gio as any}
          major="ING. SISTEMAS"
          year="SENIOR"
          bio="Estudiante de Ingenieria en Sistemas Computacionales. Apasionado por el desarrollo web y la inteligencia artificial. Siempre buscando aprender cosas nuevas."
          location="Managua, Nicaragua"
          website="geovannysandino.dev"
        />

        <TabSelector
          tabs={TABS}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <View style={styles.content}>{renderContent()}</View>
      </ScrollView>
      <BottomTabBar activeTab="profile" />
      <SideMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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