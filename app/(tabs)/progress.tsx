import { StyleSheet, ScrollView, View } from 'react-native';
import React, { useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/components/Header';
import { ColorScheme, useTheme } from '@/hooks/useTheme';
import Card from '@/UI/Card';

import DaysLogs from '@/components/DaysLogs';
import Achievements from '@/components/Achievements';
import { useSmokingStore } from '@/stores/useSmokingStore';
import { formatMinutesToTime } from '@/utils/helpers';

export default function Progress() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const profileData = useSmokingStore((state) => state.profile);
  const getCurrentDay = useSmokingStore((state) => state.getCurrentDay);
  const getTotalMoneySaved = useSmokingStore(
    (state) => state.getTotalMoneySaved,
  );
  const getTotalCigarettesSaved = useSmokingStore(
    (state) => state.getTotalCigarettesSaved,
  );
  const getTotalTimeSaved = useSmokingStore((state) => state.getTotalTimeSaved);
  const longestStreak = useSmokingStore((state) => state.longestStreak);

  const currentDay = getCurrentDay();
  const totalMoneySaved = getTotalMoneySaved();
  const totalCigarettesSaved = getTotalCigarettesSaved();
  const totalTimeSaved = getTotalTimeSaved();

  const { days, hours, minutes } = formatMinutesToTime(totalTimeSaved);

  let totalTimeSavedText = '';

  if (days > 0) {
    totalTimeSavedText = `${days}d ${hours}h ${minutes}m`;
  } else if (hours > 0) {
    totalTimeSavedText = `${hours}h ${minutes}m`;
  } else {
    totalTimeSavedText = `${minutes}m`;
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Header
        label='Your Progress'
        currentDay={currentDay.toString()}
        totalDays={profileData?.planDuration.toString()}
      />
      <ScrollView
        contentContainerStyle={{ gap: 16, paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cardsContainer}>
          <View style={styles.cardsRowContainer}>
            <Card
              title={`${totalCigarettesSaved < 0 ? 0 : totalCigarettesSaved}`}
              subtitle='Less cigaretes'
              iconName='leaf-outline'
            />
            <Card
              title={`${totalMoneySaved.toFixed(2)} ${profileData?.currency}`}
              subtitle='Money saved'
              iconName='cash-outline'
            />
          </View>
          <View style={styles.cardsRowContainer}>
            <Card
              title={totalTimeSavedText}
              subtitle='Time saved'
              iconName='time-outline'
            />
            <Card
              title={longestStreak.toString()}
              subtitle='Longest streak'
              iconName='flame-outline'
            />
          </View>
        </View>

        <DaysLogs />
        <Achievements />
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      gap: 16,
      paddingTop: 16,
      paddingHorizontal: 16,
    },
    cardsContainer: {
      gap: 8,
    },
    cardsRowContainer: {
      flexDirection: 'row',
    },
  });
