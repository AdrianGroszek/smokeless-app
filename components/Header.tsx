import { ColorScheme, useTheme } from '@/hooks/useTheme';
import Subtitle from '@/UI/Subtitle';
import { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  label: string;
  currentDay?: string;
  totalDays?: string;
};

export default function Header({ label, currentDay, totalDays }: Props) {
  const { colors } = useTheme();

  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View>
      <Subtitle>
        Day {currentDay} of {totalDays}
      </Subtitle>
      <Text style={styles.headerTitle}>{label}</Text>
    </View>
  );
}

const createStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    headerTitle: {
      fontSize: 32,
      fontWeight: 700,
      color: colors.textPrimary,
    },
  });
