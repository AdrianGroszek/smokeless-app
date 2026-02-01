import { ColorScheme, useTheme } from '@/hooks/useTheme';
import { useSmokingStore } from '@/stores/useSmokingStore';
import AchievementCard from '@/components/AchievementCard';
import { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Achievements() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const achievements = useSmokingStore((state) => state.achievements);
  const achievementsCompleted = Object.values(achievements).reduce(
    (acc, achievement) => (achievement.unlocked ? acc + 1 : acc),
    0,
  );
  const totalAchievements = Object.values(achievements).length;

  const sorted = Object.values(achievements).sort(
    (a, b) => (b.unlockedAt ?? 0) - (a.unlockedAt ?? 0),
  );

  return (
    <View style={styles.container}>
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitleText}>Achievements</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {achievementsCompleted}/{totalAchievements}
          </Text>
        </View>
      </View>
      {sorted.map((item) => (
        <AchievementCard
          title={item.title}
          subtitle={item.description}
          iconName={item.iconName}
          isLocked={!item.unlocked}
          unlockedDate={item?.unlockedAt}
          key={item.id}
        />
      ))}
    </View>
  );
}

const createStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: {
      gap: 8,
    },
    subtitleContainer: {
      flexDirection: 'row',
      gap: 8,
    },
    subtitleText: {
      color: colors.textSecondary,
      fontWeight: 500,
    },
    badge: {
      paddingHorizontal: 8,
      borderRadius: 10,
      backgroundColor: colors.primary10,
    },
    badgeText: {
      color: colors.primary,
    },
  });
