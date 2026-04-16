import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme } from 'react-native';

export type ThemeMode = 'light' | 'dark';
export type Language = 'es' | 'en';

interface ThemeContextType {
  theme: ThemeMode;
  language: Language;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  setLanguage: (lang: Language) => void;
  colors: typeof lightColors;
}

const lightColors = {
  primary: '#0095F6',
  primaryDark: '#00376B',
  secondary: '#DBE4EE',
  accent: '#FF6B6B',
  background: '#FAFAFA',
  surface: '#FFFFFF',
  card: '#FFFFFF',
  text: '#262626',
  textSecondary: '#8E8E8E',
  textLight: '#A0A0A0',
  border: '#DBE4EE',
  separator: '#EDEEEE',
  success: '#4CAF50',
  error: '#F44336',
  warning: '#FF9800',
  icon: '#262626',
  iconSecondary: '#8E8E8E',
  tabActive: '#0095F6',
  tabInactive: '#8E8E8E',
};

const darkColors = {
  primary: '#0095F6',
  primaryDark: '#00376B',
  secondary: '#363636',
  accent: '#FF6B6B',
  background: '#000000',
  surface: '#121212',
  card: '#1C1C1E',
  text: '#FFFFFF',
  textSecondary: '#A0A0A0',
  textLight: '#6B6B6B',
  border: '#363636',
  separator: '#2C2C2E',
  success: '#4CAF50',
  error: '#F44336',
  warning: '#FF9800',
  icon: '#FFFFFF',
  iconSecondary: '#A0A0A0',
  tabActive: '#0095F6',
  tabInactive: '#A0A0A0',
};

interface Translations {
  home: string;
  explore: string;
  alerts: string;
  profile: string;
  search: string;
  searchPlaceholder: string;
  settings: string;
  darkMode: string;
  lightMode: string;
  language: string;
  spanish: string;
  english: string;
  notifications: string;
  messages: string;
  saved: string;
  editProfile: string;
  logout: string;
  newPost: string;
  whatsHappening: string;
  post: string;
  friendsRequests: string;
  recentActivity: string;
  eventInvitations: string;
  new: string;
  confirm: string;
  delete: string;
  mutualFriends: string;
  likedYourPost: string;
  commentedYourPost: string;
  sharedYourPost: string;
  events: string;
  viewDetails: string;
  ignore: string;
  myPosts: string;
  classes: string;
  media: string;
  marketplace: string;
  viewAll: string;
  courses: string;
  communities: string;
  students: string;
}

const translations: Record<Language, Translations> = {
  es: {
    home: 'Inicio',
    explore: 'Explorar',
    alerts: 'Notificaciones',
    profile: 'Perfil',
    search: 'Buscar',
    searchPlaceholder: 'Buscar estudiantes o comunidades...',
    settings: 'Configuracion',
    darkMode: 'Modo Oscuro',
    lightMode: 'Modo Claro',
    language: 'Idioma',
    spanish: 'Espanol',
    english: 'Ingles',
    notifications: 'Notificaciones',
    messages: 'Mensajes',
    saved: 'Guardados',
    editProfile: 'Editar Perfil',
    logout: 'Cerrar Sesion',
    newPost: 'Nueva Publicacion',
    whatsHappening: 'Que esta pasando?',
    post: 'Publicar',
    friendsRequests: 'Solicitudes de Amistad',
    recentActivity: 'Actividad Reciente',
    eventInvitations: 'Invitaciones a Eventos',
    new: 'nuevas',
    confirm: 'Confirmar',
    delete: 'Eliminar',
    mutualFriends: 'amigos en comun',
    likedYourPost: 'le dio me gusta a tu publicacion',
    commentedYourPost: 'comento en tu publicacion',
    sharedYourPost: 'compartio tu publicacion',
    events: 'Eventos',
    viewDetails: 'Ver detalles',
    ignore: 'Ignorar',
    myPosts: 'Mis Anuncios',
    classes: 'Clases',
    media: 'Media',
    marketplace: 'Marketplace',
    viewAll: 'Ver todo',
    courses: 'Carreras',
    communities: 'Comunidades',
    students: 'Estudiantes',
  },
  en: {
    home: 'Home',
    explore: 'Explore',
    alerts: 'Alerts',
    profile: 'Profile',
    search: 'Search',
    searchPlaceholder: 'Search students or communities...',
    settings: 'Settings',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    language: 'Language',
    spanish: 'Spanish',
    english: 'English',
    notifications: 'Notifications',
    messages: 'Messages',
    saved: 'Saved',
    editProfile: 'Edit Profile',
    logout: 'Log Out',
    newPost: 'New Post',
    whatsHappening: "What's happening?",
    post: 'Post',
    friendsRequests: 'Friend Requests',
    recentActivity: 'Recent Activity',
    eventInvitations: 'Event Invitations',
    new: 'new',
    confirm: 'Confirm',
    delete: 'Delete',
    mutualFriends: 'mutual friends',
    likedYourPost: 'liked your post',
    commentedYourPost: 'commented on your post',
    sharedYourPost: 'shared your post',
    events: 'Events',
    viewDetails: 'View details',
    ignore: 'Ignore',
    myPosts: 'My Posts',
    classes: 'Classes',
    media: 'Media',
    marketplace: 'Marketplace',
    viewAll: 'View all',
    courses: 'Courses',
    communities: 'Communities',
    students: 'Students',
  },
};

interface TranslationContextType {
  t: (key: keyof Translations) => string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [language, setLanguage] = useState<Language>('es');

  useEffect(() => {
    if (systemColorScheme) {
      setTheme(systemColorScheme);
    }
  }, [systemColorScheme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const colors = theme === 'dark' ? darkColors : lightColors;

  const t = (key: keyof Translations): string => {
    return translations[language][key] || key;
  };

  return (
    <ThemeContext.Provider value={{ theme, language, setTheme, toggleTheme, setLanguage, colors }}>
      <TranslationContext.Provider value={{ t }}>
        {children}
      </TranslationContext.Provider>
    </ThemeContext.Provider>
  );
}

export function useAppTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be used within AppProvider');
  }
  return context;
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within AppProvider');
  }
  return context;
}