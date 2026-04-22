import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ImageSourcePropType,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AdCard from "@/components/AdCard";
import BottomTabBar from "@/components/BottomTabBar";
import ProfileHeader from "@/components/ProfileHeader";
import SideMenu from "@/components/SideMenu";
import TabSelector from "@/components/TabSelector";
import TopBar from "@/components/TopBar";
import { useAppTheme, useTranslation } from "@/constants/AppContext";
import { Images } from "@/constants/Images";
import { Theme } from "@/constants/Theme";

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
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [isCurrentUser] = useState(true);

  const [userData, setUserData] = useState({
    name: "Geovanny Sandino",
    username: "geovanny_sandino",
    major: "ING. SISTEMAS",
    year: "SENIOR",
    bio: "Estudiante de Ingenieria en Sistemas Computacionales. Apasionado por el desarrollo web y la inteligencia artificial. Siempre buscando aprender cosas nuevas.",
    location: "Managua, Nicaragua",
    website: "geovannysandino.dev",
    avatarUri: Images.avatars.gio as ImageSourcePropType,
    coverImage: undefined as ImageSourcePropType | undefined,
  });

  const pickImage = async (type: "avatar" | "cover") => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permiso requerido",
        "Por favor permite el acceso a tu galería para seleccionar imágenes.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: type === "avatar" ? [1, 1] : [16, 9],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      const asset = result.assets[0];
      const imageSource = { uri: asset.uri } as ImageSourcePropType;

      if (type === "avatar") {
        setUserData((prev) => ({ ...prev, avatarUri: imageSource }));
      } else {
        setUserData((prev) => ({ ...prev, coverImage: imageSource }));
      }
    }
  };

  const handleEditPress = () => {
    setEditModalVisible(true);
  };

  const handleSaveProfile = () => {
    setEditModalVisible(false);
  };

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

  const renderAvatar = (): ImageSourcePropType => {
    return userData.avatarUri;
  };

  const renderCover = (): ImageSourcePropType | undefined => {
    return userData.coverImage;
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={["top"]}
    >
      <TopBar
        onMenuPress={() => setMenuVisible(true)}
        onSearchPress={() => {}}
      />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <ProfileHeader
          name={userData.name}
          username={userData.username}
          avatarUri={renderAvatar() as any}
          coverImage={renderCover() as any}
          major={userData.major}
          year={userData.year}
          bio={userData.bio}
          location={userData.location}
          website={userData.website}
          isEditable={isCurrentUser}
          onEditPress={handleEditPress}
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

      <Modal visible={editModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View
            style={[styles.modalContent, { backgroundColor: colors.surface }]}
          >
            <View style={styles.modalHeader}>
              <Pressable onPress={() => setEditModalVisible(false)}>
                <Ionicons name="close" size={24} color={colors.icon} />
              </Pressable>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                Editar perfil
              </Text>
              <Pressable onPress={handleSaveProfile}>
                <Text style={[styles.saveButton, { color: colors.primary }]}>
                  Guardar
                </Text>
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.editSection}>
                <Text
                  style={[styles.editLabel, { color: colors.textSecondary }]}
                >
                  Foto de perfil
                </Text>
                <Pressable
                  style={styles.avatarEditContainer}
                  onPress={() => pickImage("avatar")}
                >
                  <Image source={renderAvatar()} style={styles.avatarEdit} />
                  <View
                    style={[
                      styles.changePhotoButton,
                      { backgroundColor: colors.primary },
                    ]}
                  >
                    <Ionicons name="camera" size={20} color="#FFF" />
                  </View>
                </Pressable>
              </View>

              <View style={styles.editSection}>
                <Text
                  style={[styles.editLabel, { color: colors.textSecondary }]}
                >
                  Foto de portada
                </Text>
                <Pressable
                  style={styles.coverEditContainer}
                  onPress={() => pickImage("cover")}
                >
                  {userData.coverImage ? (
                    <Image
                      source={renderCover()!}
                      style={styles.coverEditImage}
                    />
                  ) : (
                    <>
                      <Ionicons
                        name="camera"
                        size={32}
                        color={colors.textSecondary}
                      />
                      <Text
                        style={[
                          styles.coverEditText,
                          { color: colors.textSecondary },
                        ]}
                      >
                        Toca para agregar una portada
                      </Text>
                    </>
                  )}
                  <View
                    style={[
                      styles.changeCoverButton,
                      { backgroundColor: colors.primary },
                    ]}
                  >
                    <Ionicons name="image" size={20} color="#FFF" />
                  </View>
                </Pressable>
              </View>

              <View style={styles.editSection}>
                <Text
                  style={[styles.editLabel, { color: colors.textSecondary }]}
                >
                  Nombre
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: colors.background,
                      color: colors.text,
                      borderColor: colors.border,
                    },
                  ]}
                  value={userData.name}
                  onChangeText={(text) =>
                    setUserData({ ...userData, name: text })
                  }
                  placeholder="Tu nombre"
                  placeholderTextColor={colors.textSecondary}
                />
              </View>

              <View style={styles.editSection}>
                <Text
                  style={[styles.editLabel, { color: colors.textSecondary }]}
                >
                  Usuario
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: colors.background,
                      color: colors.text,
                      borderColor: colors.border,
                    },
                  ]}
                  value={userData.username}
                  onChangeText={(text) =>
                    setUserData({ ...userData, username: text })
                  }
                  placeholder="@tuusuario"
                  placeholderTextColor={colors.textSecondary}
                />
              </View>

              <View style={styles.editSection}>
                <Text
                  style={[styles.editLabel, { color: colors.textSecondary }]}
                >
                  Biografia
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    styles.textArea,
                    {
                      backgroundColor: colors.background,
                      color: colors.text,
                      borderColor: colors.border,
                    },
                  ]}
                  value={userData.bio}
                  onChangeText={(text) =>
                    setUserData({ ...userData, bio: text })
                  }
                  placeholder="Cuéntanos sobre ti..."
                  placeholderTextColor={colors.textSecondary}
                  multiline
                  numberOfLines={4}
                />
              </View>

              <View style={styles.editSection}>
                <Text
                  style={[styles.editLabel, { color: colors.textSecondary }]}
                >
                  Ubicacion
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: colors.background,
                      color: colors.text,
                      borderColor: colors.border,
                    },
                  ]}
                  value={userData.location}
                  onChangeText={(text) =>
                    setUserData({ ...userData, location: text })
                  }
                  placeholder="Ciudad, Pais"
                  placeholderTextColor={colors.textSecondary}
                />
              </View>

              <View style={styles.editSection}>
                <Text
                  style={[styles.editLabel, { color: colors.textSecondary }]}
                >
                  Website
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: colors.background,
                      color: colors.text,
                      borderColor: colors.border,
                    },
                  ]}
                  value={userData.website}
                  onChangeText={(text) =>
                    setUserData({ ...userData, website: text })
                  }
                  placeholder="tuwebsite.com"
                  placeholderTextColor={colors.textSecondary}
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.editSection}>
                <Text
                  style={[styles.editLabel, { color: colors.textSecondary }]}
                >
                  Carrera
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: colors.background,
                      color: colors.text,
                      borderColor: colors.border,
                    },
                  ]}
                  value={userData.major}
                  onChangeText={(text) =>
                    setUserData({ ...userData, major: text })
                  }
                  placeholder="ING. SISTEMAS"
                  placeholderTextColor={colors.textSecondary}
                />
              </View>

              <View style={styles.editSection}>
                <Text
                  style={[styles.editLabel, { color: colors.textSecondary }]}
                >
                  Año
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: colors.background,
                      color: colors.text,
                      borderColor: colors.border,
                    },
                  ]}
                  value={userData.year}
                  onChangeText={(text) =>
                    setUserData({ ...userData, year: text })
                  }
                  placeholder="SENIOR"
                  placeholderTextColor={colors.textSecondary}
                />
              </View>
            </ScrollView>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    borderTopLeftRadius: Theme.borderRadius.xl,
    borderTopRightRadius: Theme.borderRadius.xl,
    padding: Theme.spacing.md,
    maxHeight: "90%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Theme.spacing.md,
    paddingBottom: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  modalTitle: {
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.semibold,
  },
  saveButton: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.semibold,
  },
  editSection: {
    marginBottom: Theme.spacing.lg,
  },
  editLabel: {
    fontSize: Theme.fontSize.sm,
    fontWeight: "600",
    marginBottom: Theme.spacing.sm,
  },
  avatarEditContainer: {
    alignSelf: "center",
    position: "relative",
  },
  avatarEdit: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  changePhotoButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  coverEditContainer: {
    width: "100%",
    height: 100,
    borderRadius: Theme.borderRadius.md,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  coverEditImage: {
    width: "100%",
    height: "100%",
  },
  coverEditText: {
    marginTop: Theme.spacing.xs,
    fontSize: Theme.fontSize.sm,
  },
  changeCoverButton: {
    position: "absolute",
    right: Theme.spacing.sm,
    bottom: Theme.spacing.sm,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    fontSize: Theme.fontSize.md,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
  },
});
