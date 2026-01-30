import { ColorScheme, useTheme } from '@/hooks/useTheme';
import useWeekData from '@/hooks/useWeekData';

import Subtitle from '@/UI/Subtitle';
import { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function WeeklyCalendar() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const weekData = useWeekData();
  console.log(weekData);

  return (
    <View style={styles.container}>
      <Subtitle navigateTo='/progress'>This week</Subtitle>
      <View style={styles.weekCalendarContainer}>
        {weekData.map((day) => (
          <View
            key={day.key}
            style={[
              styles.weekDayTile,
              {
                opacity: day.isDisabled ? 0.6 : 1,
                borderColor: day.isToday ? colors.primary : colors.surface,
              },
            ]}
          >
            <View
              style={[
                styles.calendarDot,
                {
                  borderRadius: 8,
                  backgroundColor: day.isDisabled
                    ? colors.textSecondary
                    : day.smoked <= day.limit
                      ? colors.primary
                      : colors.warning,
                },
              ]}
            />
            <Text
              style={{
                color: day.isDisabled
                  ? colors.textSecondary
                  : colors.textPrimary,
              }}
            >
              {day.day}
            </Text>
            <Text
              style={{
                color: day.isDisabled
                  ? colors.textSecondary
                  : colors.textPrimary,
              }}
            >
              {day.date}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const createStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: {
      gap: 8,
    },
    weekCalendarContainer: {
      flexDirection: 'row',
    },
    weekDayTile: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 4,
      paddingVertical: 8,
      borderRadius: 8,
      borderWidth: 1,
      gap: 4,
      backgroundColor: colors.surface,
      shadowColor: '#000',
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 2.62,
      elevation: 2,
    },
    calendarDot: {
      width: 8,
      height: 8,
    },
  });
