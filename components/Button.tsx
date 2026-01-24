import { type ColorScheme, useTheme } from '@/hooks/useTheme';
import { ReactNode } from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';

type Props = {
  children: ReactNode;
  onPress: () => void;
};

export default function Button({ children, onPress }: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{children}</Text>
    </Pressable>
  );
}

const createStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    button: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 16,
      backgroundColor: colors.primary,
      borderRadius: 50,
    },
    buttonText: {
      padding: 16,
      color: '#fff',
      fontSize: 18,
      fontWeight: 500,
    },
    pressed: {
      opacity: 0.8,
    },
  });
