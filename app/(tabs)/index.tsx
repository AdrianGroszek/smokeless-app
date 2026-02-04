import Header from '@/components/Header';
import { ColorScheme, useTheme } from '@/hooks/useTheme';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useMemo, useRef, useState } from 'react';
import ProgressCard from '@/components/ProgressCard';
import MotivationalCard from '@/components/MotivationalCard';
import WeeklyCalendar from '@/components/WeeklyCalendar';
import SummarySection from '@/components/SummarySection';
import LastAchievements from '@/components/LastAchievements';
import { useSmokingStore } from '@/stores/useSmokingStore';
import SmokingDayDetailsBottomSheet from '@/components/SmokingDayDetailsBottomSheet';
import BottomSheet from '@gorhom/bottom-sheet';
import { useScrollToTop } from '@react-navigation/native';

export default function Index() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const userProfileData = useSmokingStore((state) => state.profile);
  const getCurrentDay = useSmokingStore((state) => state.getCurrentDay);

  const currentDay = getCurrentDay();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const scrollRef = useRef<ScrollView>(null);
  useScrollToTop(scrollRef);

  const handleDayPress = (dateKey: string, isDisabled: boolean) => {
    if (isDisabled) return;
    setSelectedDate(dateKey);
    bottomSheetRef.current?.snapToIndex(1);
  };

  return (
    <>
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <StatusBar
          style={colors.statusBarStyle === 'light-content' ? 'dark' : 'light'}
        />
        <Header
          label={`Hello, ${userProfileData?.username}!`}
          currentDay={currentDay.toString()}
          totalDays={userProfileData?.planDuration.toString()}
        />
        <ProgressCard />
        <ScrollView
          contentContainerStyle={{ gap: 16, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          ref={scrollRef}
        >
          <MotivationalCard />
          <WeeklyCalendar onDayPress={handleDayPress} />
          <SummarySection />
          <LastAchievements />
        </ScrollView>
      </SafeAreaView>
      <SmokingDayDetailsBottomSheet
        ref={bottomSheetRef}
        dateKey={selectedDate}
      />
    </>
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
