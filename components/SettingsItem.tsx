import { ColorScheme, useTheme } from '@/hooks/useTheme';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useMemo } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

type Props = {
  label: string;
  value?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  disabled?: boolean;
  hideDivider?: boolean;
  rightComponent?: React.ReactNode;
};

export default function SettingsItem({
  label,
  value,
  icon,
  hideDivider,
  onPress,
  disabled,
  rightComponent,
}: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
    <Pressable
      style={({ pressed }) => [
        styles.pressableItem,
        {
          borderBottomWidth: hideDivider ? 0 : 1,
          borderBottomColor: colors.border,
        },
        pressed && !disabled && { opacity: 0.65 },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.textMuted}>{label}</Text>
      <View style={styles.textWithIconWrapper}>
        {rightComponent ? (
          rightComponent
        ) : (
          <>
            <Text style={styles.textWhite}>{value}</Text>
            <Ionicons name={icon} color={colors.textMuted} size={18} />
          </>
        )}
      </View>
    </Pressable>
  );
}

const createStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    pressableItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 2,
    },
    textWhite: {
      color: colors.textPrimary,
      fontWeight: 500,
      fontSize: 16,
    },
    textMuted: {
      color: colors.textSecondary,
      fontWeight: 500,
      fontSize: 16,
    },
    textWithIconWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
  });
