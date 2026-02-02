import { ColorScheme, useTheme } from '@/hooks/useTheme';
import { useSmokingStore } from '@/stores/useSmokingStore';
import Card from '@/UI/Card';
import Subtitle from '@/UI/Subtitle';

import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  onDayPress: (dateKey: string) => void;
};

export default function DaysLogs({ onDayPress }: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const dailyLogs = useSmokingStore((state) => state.dailyLogs);

  return (
    <View style={{ gap: 8 }}>
      <Subtitle>Days logs</Subtitle>
      {Object.entries(dailyLogs)
        .reverse()
        .slice(1, 4)
        .map(([date, log]) => (
          <Pressable key={date} onPress={() => onDayPress(date)}>
            <Card
              title={log.date}
              subtitle={`You smoked ${log.cigarettesSmoked} cigarettes`}
              iconName='calendar-outline'
            />
          </Pressable>
        ))}
      <Pressable style={styles.button} onPress={() => console.log('click')}>
        <Text style={styles.buttonText}>Check all days</Text>
      </Pressable>
    </View>
  );
}

const createStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    button: {
      alignSelf: 'center',
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
    buttonText: {
      color: colors.primary,
    },
  });
