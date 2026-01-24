import { View, Text, Pressable, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ColorScheme, useTheme } from '@/hooks/useTheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import OnboardingProgressBar from '@/components/OnboardingProgressBar';
import Button from '@/components/Button';
import { plansDataType } from './plan';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Ready() {
  const [username, setUsername] = useState('');
  const [cigarettesPerDay, setCigarettesPerDay] = useState('');
  const [cigarettesPerPack, setCigarettesPerPack] = useState('');
  const [price, setPrice] = useState('');
  const [currency, setCurrency] = useState('');
  const [plan, setPlan] = useState<plansDataType | null>(null);

  const router = useRouter();
  const { colors } = useTheme();

  const styles = createStyles(colors);

  const loadOnboardingData = async () => {
    const savedUsername = await AsyncStorage.getItem('@onboarding_name');
    const savedCigarettesPerDay = await AsyncStorage.getItem(
      '@onboarding_cigarettes_per_day',
    );
    const savedCigarettesPerPack = await AsyncStorage.getItem(
      '@onboarding_cigarettes_per_pack',
    );
    const savedPrice = await AsyncStorage.getItem(
      '@onboarding_cigarettes_price',
    );
    const savedCurrency = await AsyncStorage.getItem(
      '@onboarding_cigarettes_currency',
    );
    const savedPlan = await AsyncStorage.getItem('@onboarding_plan');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <View style={styles.topContainer}>
          <OnboardingProgressBar dashesNum={5} stepsText='' percentNum={100} />
          <View style={styles.iconContainer}>
            <Ionicons name='checkmark-done' size={64} color='#fff' />
          </View>
          <View>
            <Text style={styles.title}>You're all set!</Text>
            <Text style={styles.subtitle}>Let's get started</Text>
          </View>

          <View style={styles.buttonsContainer}>
            <View style={styles.selectButton}>
              <View style={styles.selectButtonRow}>
                <Ionicons name='calendar' size={32} color={colors.primary} />
                <View>
                  <Text style={styles.selectButtonTitle}>days</Text>
                  <Text style={styles.selectButtonSubtitle}>sss</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <Button onPress={() => {}}>Get Started!</Button>
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
    topContainer: {
      alignItems: 'center',
      gap: 16,
    },
    buttonsContainer: {
      marginTop: 16,
      gap: 8,
      width: '100%',
    },
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
  });
