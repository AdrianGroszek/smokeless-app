import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { ColorScheme, useTheme } from '@/hooks/useTheme';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import OnboardingProgressBar from '@/components/OnboardingProgressBar';
import Button from '@/components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Haptics from 'expo-haptics';

export default function CigarettesPerDay() {
  const [cigarettesPerDay, setCigarettesPerDay] = useState('');
  const router = useRouter();
  const { colors } = useTheme();

  const styles = createStyles(colors);

  useEffect(() => {
    loadSavedCigarettesPerDay();
  }, []);

  const loadSavedCigarettesPerDay = async () => {
    try {
      const saved = await AsyncStorage.getItem(
        '@onboarding_cigarettes_per_day',
      );
      if (saved) setCigarettesPerDay(saved);
    } catch (error) {
      console.error('Error loading saved cigarettesPerDay: ', error);
    }
  };

  const handleNext = async () => {
    const num = parseInt(cigarettesPerDay);
    if (isNaN(num) || num <= 0) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      alert('Please enter a valid number');
      return;
    }

    try {
      await AsyncStorage.setItem(
        '@onboarding_cigarettes_per_day',
        cigarettesPerDay,
      );
      router.push('/(onboarding)/cigarettesPerPack');
    } catch (error) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      console.error('Error saving cigarettesPerDay: ', error);
      Alert.alert(
        'Error',
        'Failed to save your count of daily cigarettes. Please try again.',
        [{ text: 'OK' }],
      );
    }

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Keyboard.dismiss();
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
                percentNum={20}
              />
              <View style={styles.iconContainer}>
                <Ionicons name='calendar-outline' size={64} color='#fff' />
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
