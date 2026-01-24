import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ColorScheme, useTheme } from '@/hooks/useTheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import Button from '@/components/Button';

export default function Welcome() {
  const { colors } = useTheme();
  const router = useRouter();

  const styles = createStyles(colors);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        style={colors.statusBarStyle === 'light-content' ? 'dark' : 'light'}
      />
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <Image
          source={require('@/assets/images/life_style_working.jpg')}
          contentFit='cover'
          style={{ width: '100%', height: '50%' }}
        />
        <View style={styles.bottomContainer}>
          <Text style={styles.title}>Ready to Quit?</Text>
          <Text style={styles.subtitle}>
            Lets create your personalized plan to help you quit smoking
          </Text>
          <Button onPress={() => router.push('/(onboarding)/name')}>
            Get started
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      gap: 16,
      padding: 16,
    },
    bottomContainer: {
      gap: 8,
    },
    title: {
      color: colors.textPrimary,
      fontSize: 32,
      fontWeight: 500,
      textAlign: 'center',
    },
    subtitle: {
      color: colors.textSecondary,
      fontSize: 16,
      textAlign: 'center',
    },
  });
