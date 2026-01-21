import { ColorScheme, useTheme } from '@/hooks/useTheme';
import { View, Text, StyleSheet } from 'react-native';

export default function ProgressBar() {
  const { colors } = useTheme();

  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <View style={[styles.progress, { width: '60%' }]}></View>
    </View>
  );
}

const createStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: 10,
      backgroundColor: colors.border,
      borderRadius: 50,
    },
    progress: {
      height: '100%',
      backgroundColor: colors.primary,
      borderRadius: 50,
    },
  });
