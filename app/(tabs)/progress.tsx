import { StyleSheet, ScrollView, View } from 'react-native';
import React, { useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/components/Header';
import { ColorScheme, useTheme } from '@/hooks/useTheme';
import Card from '@/UI/Card';

import DaysLogs from '@/components/DaysLogs';
import Achievements from '@/components/Achievements';

export default function Progress() {
  const { colors } = useTheme();

  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Header label='Your Progress' />
      <ScrollView
        contentContainerStyle={{ gap: 16, paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cardsContainer}>
          <View style={styles.cardsRowContainer}>
            <Card
              title='-42%'
              subtitle='Less cigaretes'
              iconName='leaf-outline'
            />
            <Card
              title='-42%'
              subtitle='Less cigaretes'
              iconName='leaf-outline'
            />
          </View>
          <View style={styles.cardsRowContainer}>
            <Card
              title='-42%'
              subtitle='Less cigaretes'
              iconName='leaf-outline'
            />
            <Card
              title='-42%'
              subtitle='Less cigaretes'
              iconName='leaf-outline'
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
