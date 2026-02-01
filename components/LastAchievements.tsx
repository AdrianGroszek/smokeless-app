import { View, StyleSheet } from 'react-native';
import React from 'react';
import Subtitle from '@/UI/Subtitle';

import AchievementCard from './AchievementCard';
import { useSmokingStore } from '@/stores/useSmokingStore';

export default function LastAchievements() {
  const achievements = useSmokingStore((state) => state.achievements);

  const sorted = Object.values(achievements)
    .sort((a, b) => (b.unlockedAt ?? 0) - (a.unlockedAt ?? 0))
    .slice(0, 3);

  return (
    <View style={styles.container}>
      <Subtitle navigateTo='/progress'>Latest achievements</Subtitle>

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

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
});
