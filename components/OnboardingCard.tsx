import { ColorScheme, useTheme } from '@/hooks/useTheme';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  data?: string;
  iconName: keyof typeof Ionicons.glyphMap;
  label: string;
};

export default function OnboardingCard({ data, iconName, label }: Props) {
  const { colors } = useTheme();

  const styles = createStyles(colors);
  return (
    <View
      style={[
        styles.selectButton,
        !data && {
          backgroundColor: colors.warning10,
          borderColor: colors.warning,
        },
      ]}
    >
      <View style={styles.selectButtonRow}>
        <Ionicons
          name={iconName}
          size={32}
          color={data ? colors.primary : colors.warning}
        />
        <View>
          <Text style={styles.selectButtonSubtitle}>{label}</Text>
          <Text style={styles.selectButtonTitle}>
            {data ? data : 'Finish onboarding to continue'}
          </Text>
        </View>
      </View>
    </View>
  );
}

const createStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    selectButton: {
      width: '100%',
      borderRadius: 10,
      borderWidth: 1,
      backgroundColor: colors.primary10,
      borderColor: colors.primary,
      color: colors.textPrimary,
    },
    selectButtonRow: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      gap: 8,
    },
    selectButtonTitle: {
      color: colors.textPrimary,
      fontSize: 18,
      fontWeight: 500,
    },
    selectButtonSubtitle: {
      color: colors.textMuted,
    },
  });
