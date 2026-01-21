import { ColorScheme, useTheme } from '@/hooks/useTheme';
import Subtitle from '@/UI/Subtitle';
import { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function WeeklyCalendar() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <View style={styles.container}>
      <Subtitle navigateTo='/progress'>This week</Subtitle>
      <View style={styles.weekCalendarContainer}>
        {days.map((day, index) => (
          <View key={day} style={styles.weekDayTile}>
            <View style={styles.calendarDot}></View>
            <Text>{day}</Text>
            <Text>{index + 1}</Text>
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
      gap: 4,
      backgroundColor: '#fff',
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
      backgroundColor: colors.primary,
      borderRadius: 8,
    },
  });
