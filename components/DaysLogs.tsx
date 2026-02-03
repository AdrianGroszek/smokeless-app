import { ColorScheme, useTheme } from '@/hooks/useTheme';
import { useSmokingStore } from '@/stores/useSmokingStore';
import Card from '@/UI/Card';
import Subtitle from '@/UI/Subtitle';
import { formatDate } from '@/utils/helpers';

import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  onDayPress: (dateKey: string) => void;
  onCheckAllDays: () => void;
};

export default function DaysLogs({ onDayPress, onCheckAllDays }: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const dailyLogs = useSmokingStore((state) => state.dailyLogs);

  return (
    <View style={{ gap: 8 }}>
      <Subtitle>Days logs</Subtitle>
      {Object.entries(dailyLogs)
        .reverse()
        .slice(0, 3)
        .map(([date, log]) => (
          <Card
            title={formatDate(log.date)}
            subtitle={`You smoked ${log.cigarettesSmoked} cigarettes`}
            iconName='calendar-outline'
            onPress={() => onDayPress(date)}
            key={date}
          />
        ))}
      <Pressable
        style={({ pressed }) => [styles.button, pressed && { opacity: 0.7 }]}
        onPress={onCheckAllDays}
      >
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
