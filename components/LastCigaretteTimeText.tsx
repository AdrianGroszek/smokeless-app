import { View, Text, StyleSheet } from 'react-native';
import { ColorScheme, useTheme } from '@/hooks/useTheme';
import { useSmokingStore } from '@/stores/useSmokingStore';
import useTimer from '@/hooks/useTimer';
import { useMemo } from 'react';

export default function LastCigaretteTimeText() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const now = useTimer();

  const lastSmokeTime = useSmokingStore((state) => {
    const todayKey = new Date().toISOString().split('T')[0];
    const todayLog = state.dailyLogs[todayKey];

    return todayLog?.smokingTimes.at(-1) ?? null;
  });

  if (!lastSmokeTime) {
    return (
      <View style={styles.contentCenter}>
        <Text
          style={{ fontSize: 16, fontWeight: 600, color: colors.textSecondary }}
        >
          No cigarettes today
        </Text>
      </View>
    );
  }

  const diffMs = Math.max(now - new Date(lastSmokeTime).getTime(), 0);

  const minutes = Math.floor(diffMs / 60_000);
  const hours = Math.floor(minutes / 60);

  let timeText = '';
  if (hours > 0) {
    timeText = `${hours}h ${minutes % 60}m ago`;
  } else if (minutes > 0) {
    timeText = `${minutes}m ago`;
  } else {
    timeText = `just now`;
  }

  return (
    <View style={styles.contentCenter}>
      <Text
        style={{ fontSize: 16, fontWeight: 600, color: colors.textSecondary }}
      >
        Smoked today
      </Text>
      <Text style={{ color: colors.textSecondary }}>
        You smoked{' '}
        <Text style={{ color: colors.primary, fontWeight: 600 }}>
          {timeText}
        </Text>
      </Text>
    </View>
  );
}
const createStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    contentCenter: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
