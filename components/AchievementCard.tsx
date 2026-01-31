import { View, Text, StyleSheet } from 'react-native';
import React, { useMemo } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ColorScheme, useTheme } from '@/hooks/useTheme';
import { formatDateFromTimestamp } from '@/utils/helpers';

type Props = {
  title: string;
  subtitle: string;
  iconName: keyof typeof Ionicons.glyphMap;
  isLocked?: boolean;
  unlockedDate?: number;
};

export default function AchievementCard({
  title,
  subtitle,
  iconName,
  isLocked,
  unlockedDate,
}: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const formattedDate = unlockedDate
    ? formatDateFromTimestamp(unlockedDate)
    : null;

  return (
    <View style={[styles.summaryCard, isLocked && { opacity: 0.5 }]}>
      <View style={styles.iconContainer}>
        <Ionicons
          name={isLocked ? 'lock-closed-outline' : iconName}
          size={20}
          color={colors.surface}
        />
      </View>
      <View style={{ flex: 1, paddingRight: 8 }}>
        <View style={styles.titleContainer}>
          <Text style={styles.summaryText}>{title}</Text>
          {!isLocked && (
            <Text style={styles.textMutedColor}>{formattedDate}</Text>
          )}
        </View>
        <Text style={[styles.summaryText, styles.textMutedColor]}>
          {subtitle}
        </Text>
      </View>
    </View>
  );
}

const createStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    summaryCard: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 4,
      padding: 8,
      gap: 8,
      backgroundColor: colors.surface,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 2.62,
      elevation: 2,
    },
    iconContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 8,
      backgroundColor: colors.textPrimary,
      borderRadius: 8,
    },
    summaryText: {
      fontSize: 18,
      fontWeight: 600,
      color: colors.textPrimary,
    },
    textMutedColor: {
      color: colors.textMuted,
      fontSize: 14,
    },
    titleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });
