import { ColorScheme, useTheme } from '@/hooks/useTheme';
import ProgressBar from '@/UI/ProgressBar';
import Subtitle from '@/UI/Subtitle';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useMemo } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function ProgressCard() {
  const { colors } = useTheme();

  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      <View style={styles.subtitleContainer}>
        <Subtitle>Today progress</Subtitle>
        <Subtitle>4 Cigarettes left</Subtitle>
      </View>
      <View style={styles.progressInfoContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.circleButton,
            { backgroundColor: pressed ? colors.primaryMuted : colors.primary },
          ]}
        >
          <Ionicons name='remove' size={18} color='#F8FAFC' />
        </Pressable>
        <Text style={styles.progressInfoText}>6/10</Text>
        <Pressable
          style={({ pressed }) => [
            styles.circleButton,
            { backgroundColor: pressed ? colors.primaryMuted : colors.primary },
          ]}
        >
          <Ionicons name='add' size={18} color='#F8FAFC' />
        </Pressable>
      </View>
      <View style={styles.contentCenter}>
        <Text style={{ fontSize: 16, fontWeight: 600 }}>Smoked today</Text>
        <Text>
          You smoked{' '}
          <Text style={{ color: colors.primaryMuted, fontWeight: 600 }}>
            40 min ago
          </Text>
        </Text>
      </View>
      <ProgressBar />
    </View>
  );
}

const createStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: {
      gap: 16,
    },
    subtitleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    progressInfoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16,
    },
    progressInfoText: {
      fontSize: 80,
      fontWeight: 600,
      color: colors.textPrimary,
    },
    circleButton: {
      padding: 10,
      borderRadius: 50,
    },
    textCenter: {
      textAlign: 'center',
      color: colors.textSecondary,
    },
    contentCenter: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
