import { ColorScheme, useTheme } from '@/hooks/useTheme';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { ReactNode, useMemo } from 'react';
import { Text, StyleSheet, View, Pressable } from 'react-native';

type Props = {
  children: ReactNode;
  navigateTo?: string;
};

export default function Subtitle({ children, navigateTo }: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  if (navigateTo) {
    return (
      <View style={styles.subtitlesContainer}>
        <Text style={styles.subtitleText}>{children}</Text>
        <Link href='/progress' asChild>
          <Pressable>
            <Text style={styles.linkText}>
              View All
              <Ionicons name='chevron-forward-outline' />
            </Text>
          </Pressable>
        </Link>
      </View>
    );
  }

  return <Text style={styles.subtitleText}>{children}</Text>;
}

const createStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    subtitleText: {
      color: colors.textSecondary,
      fontWeight: 500,
    },
    subtitlesContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    linkText: {
      color: colors.primary,
    },
  });
