import { ColorScheme, useTheme } from '@/hooks/useTheme';
import ProgressBar from '@/UI/ProgressBar';
import Subtitle from '@/UI/Subtitle';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useMemo } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import LastCigaretteTimeText from './LastCigaretteTimeText';
import { useSmokingStore } from '@/stores/useSmokingStore';

export default function ProgressCard() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const addCigarette = useSmokingStore((state) => state.addCigarette);
  const removeCigarette = useSmokingStore((state) => state.removeCigarette);

  const getTodayLimit = useSmokingStore((state) => state.getTodayLimit);
  const cigarettesLeftToday = useSmokingStore((state) =>
    state.getCigarettesLeftToday(),
  );

  const todaySmokedCount = useSmokingStore((state) => {
    const today = new Date().toISOString().split('T')[0];
    return state.dailyLogs[today]?.cigarettesSmoked ?? 0;
  });

  const todayLimit = getTodayLimit();

  const progressPercent =
    todayLimit > 0 ? (todaySmokedCount / todayLimit) * 100 : 0;

  return (
    <View style={styles.container}>
      <View style={styles.subtitleContainer}>
        <Subtitle>Today progress</Subtitle>
        <Subtitle>{cigarettesLeftToday} cigarettes left</Subtitle>
      </View>
      <View style={styles.progressInfoContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.circleButton,
            { backgroundColor: pressed ? colors.primaryMuted : colors.primary },
          ]}
          onPress={removeCigarette}
        >
          <Ionicons name='remove' size={18} color='#F8FAFC' />
        </Pressable>
        <Text style={styles.progressInfoText}>
          {todaySmokedCount}/{todayLimit}
        </Text>
        <Pressable
          style={({ pressed }) => [
            styles.circleButton,
            { backgroundColor: pressed ? colors.primaryMuted : colors.primary },
          ]}
          onPress={addCigarette}
        >
          <Ionicons name='add' size={18} color='#F8FAFC' />
        </Pressable>
      </View>
      <LastCigaretteTimeText />
      <ProgressBar progressPercent={progressPercent} />
    </View>
  );
}

const createStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: {
      gap: 16,
    },
    subtitleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    progressInfoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16,
    },
    progressInfoText: {
      fontSize: 80,
      fontWeight: 600,
      color: colors.textPrimary,
    },
    circleButton: {
      padding: 10,
      borderRadius: 50,
    },
    textCenter: {
      textAlign: 'center',
      color: colors.textSecondary,
    },
    contentCenter: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
