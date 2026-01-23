import { ColorScheme, useTheme } from '@/hooks/useTheme';
import Card from '@/UI/Card';
import { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Achievements() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitleText}>Achievements</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>2/8</Text>
        </View>
      </View>
      <Card
        title='Firs Week'
        subtitle='Less cigarettes'
        iconName='leaf-outline'
        isLocked={false}
      />
      <Card
        title='Firs Week'
        subtitle='Less cigarettes'
        iconName='leaf-outline'
        isLocked={false}
      />
      <Card
        title='Firs Week'
        subtitle='Less cigarettes'
        iconName='leaf-outline'
        isLocked={true}
      />
      <Card
        title='Firs Week'
        subtitle='Less cigarettes'
        iconName='leaf-outline'
        isLocked={true}
      />
      <Card
        title='Firs Week'
        subtitle='Less cigarettes'
        iconName='leaf-outline'
        isLocked={true}
      />
    </View>
  );
}

const createStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: {
      gap: 8,
    },
    subtitleContainer: {
      flexDirection: 'row',
      gap: 8,
    },
    subtitleText: {
      color: colors.textSecondary,
      fontWeight: 500,
    },
    badge: {
      paddingHorizontal: 8,
      borderRadius: 10,
      backgroundColor: '#bdeeea',
    },
    badgeText: {
      color: colors.primary,
    },
  });
