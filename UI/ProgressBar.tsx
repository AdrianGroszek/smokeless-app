import { ColorScheme, useTheme } from '@/hooks/useTheme';
import { View, StyleSheet } from 'react-native';

type Props = {
  progressPercent: number;
};

export default function ProgressBar({ progressPercent }: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const progressBarWidth = Math.round(Math.min(progressPercent, 100));

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.progress,
          {
            width: `${progressBarWidth}%`,
            backgroundColor:
              progressBarWidth > 85 ? colors.warning : colors.primary,
            borderRadius: 50,
          },
        ]}
      ></View>
    </View>
  );
}

const createStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: 10,
      backgroundColor: colors.border,
      borderRadius: 50,
    },
    progress: {
      height: '100%',
    },
  });
