import { ColorScheme, useTheme } from '@/hooks/useTheme';
import Card from '@/UI/Card';
import Subtitle from '@/UI/Subtitle';

import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function DaysLogs() {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={{ gap: 8 }}>
      <Subtitle>Days logs</Subtitle>
      <Card
        title='12-01-2026'
        subtitle='Fell cigarettes'
        iconName='leaf-outline'
      />
      <Card
        title='13-01-2026'
        subtitle='Fell cigarettes'
        iconName='leaf-outline'
      />
      <Pressable style={styles.button} onPress={() => console.log('click')}>
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
