import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { useAppTheme } from '@/constants/AppContext';
import { Theme } from '@/constants/Theme';
import { Button, Typography } from '@/components/ui';

export default function NotFoundScreen() {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Typography variant="display" tone="primary">404</Typography>
      <Typography variant="body" tone="secondary" align="center" style={styles.text}>
        Esta pantalla no existe.
      </Typography>
      <Button as={Link} href="/(tabs)/HomeScreen" label="Ir al inicio" style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Theme.spacing.xl,
  },
  text: {
    marginTop: Theme.spacing.sm,
  },
  button: {
    marginTop: Theme.spacing.lg,
  },
});
