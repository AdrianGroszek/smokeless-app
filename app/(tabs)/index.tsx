import Header from '@/components/Header';
import { ColorScheme, useTheme } from '@/hooks/useTheme';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useMemo } from 'react';
import ProgressCard from '@/components/ProgressCard';
import MotivationalCard from '@/components/MotivationalCard';
import WeeklyCalendar from '@/components/WeeklyCalendar';
import SummarySection from '@/components/SummarySection';
import LastAchievements from '@/components/LastAchievements';

export default function Index() {
  const { colors } = useTheme();

  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar
        style={colors.statusBarStyle === 'light-content' ? 'dark' : 'light'}
      />
      <Header label='Hello, Adrian!' />
      <ProgressCard />
      <ScrollView
        contentContainerStyle={{ gap: 16, paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <MotivationalCard />
        <WeeklyCalendar />
        <SummarySection />
        <LastAchievements />
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
  });
