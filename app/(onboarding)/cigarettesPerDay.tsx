import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { ColorScheme, useTheme } from '@/hooks/useTheme';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import OnboardingProgressBar from '@/components/OnboardingProgressBar';
import Octicons from '@expo/vector-icons/Octicons';
import Button from '@/components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CigarettesPerDay() {
  const [cigarettesPerDay, setCigarettesPerDay] = useState('');
  const router = useRouter();
  const { colors } = useTheme();

  const styles = createStyles(colors);

  useLayoutEffect(() => {
    loadSavedCigarettesPerDay();
  }, []);

  const loadSavedCigarettesPerDay = async () => {
    const saved = await AsyncStorage.getItem('@onboarding_cigarettes_per_day');
    if (saved) setCigarettesPerDay(saved);
  };

  const handleNext = async () => {
    const num = parseInt(cigarettesPerDay);
    if (isNaN(num) || num <= 0) {
      alert('Please enter a valid number');
      return;
    }

    await AsyncStorage.setItem(
      '@onboarding_cigarettes_per_day',
      cigarettesPerDay,
    );

    router.push('/(onboarding)/cigarettesPerPack');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <View style={styles.topContainer}>
              <OnboardingProgressBar
                dashesNum={2}
                stepsText='Step 2 of 5'
                percentNum={40}
              />
              <View style={styles.iconContainer}>
                <Octicons name='number' size={64} color='#fff' />
              </View>
              <View>
                <Text style={styles.title}>Cigarettes per day?</Text>
                <Text style={styles.subtitle}>Helps tailor your plan</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder='Cigarettes per day'
                placeholderTextColor={colors.textMuted}
                keyboardType='number-pad'
                maxLength={3}
                value={cigarettesPerDay}
                onChangeText={setCigarettesPerDay}
              />
            </View>
            <Button onPress={handleNext}>Continue</Button>
          </View>
        </SafeAreaView>
      </Pressable>
    </KeyboardAvoidingView>
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
    topContainer: {
      alignItems: 'center',
      gap: 16,
    },
    title: {
      color: colors.textPrimary,
      fontSize: 28,
      fontWeight: 500,
      textAlign: 'center',
    },
    subtitle: {
      color: colors.textSecondary,
      fontSize: 16,
      textAlign: 'center',
    },
    iconContainer: {
      backgroundColor: colors.primary,
      borderRadius: 14,
      padding: 16,
      marginVertical: 16,
    },
    input: {
      width: '100%',
      borderRadius: 50,
      paddingHorizontal: 24,
      paddingVertical: 16,
      marginTop: 16,
      borderWidth: 1,
      borderColor: colors.textMuted,
      color: colors.textPrimary,
      fontSize: 18,
    },
  });
