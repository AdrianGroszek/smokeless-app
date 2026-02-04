import { ColorScheme, useTheme } from '@/hooks/useTheme';
import { useSmokingStore } from '@/stores/useSmokingStore';
import Subtitle from '@/UI/Subtitle';
import { getDailyMotivationText } from '@/utils/helpers';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MotivationalCard() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const daysStreak = useSmokingStore((state) => state.currentStreak);
  const motivationalText = getDailyMotivationText();

  return (
    <View style={styles.container}>
      <Subtitle>
        🔥{daysStreak} {daysStreak === 1 ? 'day' : 'days'} streak
      </Subtitle>
      <View style={styles.motivationTextWrapper}>
        <Ionicons name='sparkles-outline' size={18} color='#f6aa1c' />
        <Text style={styles.text}>{motivationalText}</Text>
      </View>
    </View>
  );
}

const createStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: {
      gap: 8,
    },
    motivationTextWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      paddingHorizontal: 14,
      paddingVertical: 10,
      borderRadius: 100,

      backgroundColor: colors.warning10,
      borderWidth: 1,
      borderColor: colors.warning,
    },
    text: {
      fontSize: 14,
      fontWeight: '600',
      color: '#f6aa1c',
    },
  });
