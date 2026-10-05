import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppTheme } from '@/constants/AppContext';
import { Theme } from '@/constants/Theme';
import { Typography } from '@/components/ui';

export default function ModalScreen() {
  const { colors } = useAppTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Typography variant="h2">Ajustes</Typography>
      <Typography variant="body" tone="secondary" style={styles.text}>
        Configuración y ayuda — próximamente.
      </Typography>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Theme.spacing.lg,
  },
  text: {
    marginTop: Theme.spacing.sm,
  },
});
