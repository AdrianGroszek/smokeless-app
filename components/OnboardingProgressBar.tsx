import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { ColorScheme, useTheme } from '@/hooks/useTheme';

type Props = {
  dashesNum: number;
  percentNum: number;
  stepsText: string;
};

export default function OnboardingProgressBar({
  dashesNum,
  percentNum,
  stepsText,
}: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{stepsText}</Text>
        <Text style={styles.text}>
          {percentNum.toString()}%{' '}
          <Text style={{ color: colors.textMuted }}>Completed</Text>
        </Text>
      </View>
      <View style={styles.progressBar}>
        {[1, 2, 3, 4, 5].map((_, index) => (
          <View
            key={index}
            style={{
              backgroundColor:
                index < dashesNum ? colors.primary : colors.textMuted,
              flex: 1,
              borderRadius: 50,
            }}
          ></View>
        ))}
      </View>
    </View>
  );
}

const createStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      gap: 8,
    },
    textContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    text: {
      fontWeight: 500,
      color: colors.textPrimary,
    },
    progressBar: {
      flexDirection: 'row',
      gap: 8,
      height: 6,
      width: '100%',
    },
  });
