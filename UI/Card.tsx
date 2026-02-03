import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { useMemo } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ColorScheme, useTheme } from '@/hooks/useTheme';

type Props = {
  title: string;
  subtitle: string;
  iconName: keyof typeof Ionicons.glyphMap;
  isLocked?: boolean;
  onPress?: () => void;
};

export default function Card({
  title,
  subtitle,
  iconName,
  isLocked,
  onPress,
}: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const Wrapper = onPress ? Pressable : View;

  return (
    <Wrapper
      style={
        onPress
          ? ({ pressed }) => [styles.summaryCard, pressed && { opacity: 0.7 }]
          : [styles.summaryCard, isLocked && { opacity: 0.5 }]
      }
      disabled={isLocked}
      onPress={onPress}
    >
      <View style={styles.leftWrapper}>
        <View style={styles.iconContainer}>
          <Ionicons
            name={isLocked ? 'lock-closed-outline' : iconName}
            size={20}
            color={colors.surface}
          />
        </View>
        <View>
          <Text style={styles.summaryText}>{title}</Text>
          <Text style={[styles.summaryText, styles.textMutedColor]}>
            {subtitle}
          </Text>
        </View>
      </View>
      {onPress && (
        <View style={{ marginRight: 8 }}>
          <Ionicons name='chevron-forward' color={colors.textMuted} size={18} />
        </View>
      )}
    </Wrapper>
  );
}

const createStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    summaryCard: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
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
    leftWrapper: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
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
  });
