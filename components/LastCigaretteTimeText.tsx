import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { useSmokingStore } from '@/stores/useSmokingStore';
import useTimer from '@/hooks/useTimer';

export default function LastCigaretteTimeText() {
  const { colors } = useTheme();

  const now = useTimer();

  const lastSmokeTime = useSmokingStore((state) => {
    const todayKey = new Date().toISOString().split('T')[0];
    const todayLog = state.dailyLogs[todayKey];

    return todayLog?.smokingTimes.at(-1) ?? null;
  });

  if (!lastSmokeTime) {
    return (
      <View style={styles.contentCenter}>
        <Text>No cigarettes today</Text>
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
      <Text style={{ fontSize: 16, fontWeight: 600 }}>Smoked today</Text>
      <Text>
        You smoked{' '}
        <Text style={{ color: colors.primaryMuted, fontWeight: 600 }}>
          {timeText}
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contentCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  time: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
});
