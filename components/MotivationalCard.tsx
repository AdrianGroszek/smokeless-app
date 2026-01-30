import { ColorScheme, useTheme } from '@/hooks/useTheme';
import { useSmokingStore } from '@/stores/useSmokingStore';
import Subtitle from '@/UI/Subtitle';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MotivationalCard() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const daysStreak = useSmokingStore((state) => state.currentStreak);

  return (
    <View style={styles.container}>
      <Subtitle>
        🔥{daysStreak} {daysStreak === 1 ? 'day' : 'days'} streak
      </Subtitle>
      <View style={styles.motivationalCard}>
        <View style={styles.iconContainer}>
          <Ionicons name='diamond' size={20} color={colors.surface} />
        </View>
        <Text style={styles.motivationaText}>
          Youre doing great! Keep going.
        </Text>
      </View>
    </View>
  );
}

const createStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: {
      gap: 8,
    },
    motivationalCard: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 4,
      padding: 8,
      gap: 8,
      backgroundColor: colors.warning,
      borderRadius: 10,
    },
    iconContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 8,
      backgroundColor: colors.textPrimary,
      borderRadius: 8,
    },
    motivationaText: {
      fontSize: 16,
      fontWeight: 500,
    },
  });
