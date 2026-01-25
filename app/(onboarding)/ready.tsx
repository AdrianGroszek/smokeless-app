import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ColorScheme, useTheme } from '@/hooks/useTheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import OnboardingProgressBar from '@/components/OnboardingProgressBar';
import Button from '@/components/Button';
import { PlansDataType } from './plan';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Octicons from '@expo/vector-icons/Octicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import OnboardingCard from '@/components/OnboardingCard';

type OnboardingDataType = {
  username: string;
  cigarettesPerDay: string;
  cigarettesPerPack: string;
  price: string;
  currency: string;
  plan: PlansDataType | null;
};

export default function Ready() {
  const [onboardingData, setOnboardingData] = useState<OnboardingDataType>({
    username: '',
    cigarettesPerDay: '',
    cigarettesPerPack: '',
    price: '',
    currency: '',
    plan: null,
  });

  const router = useRouter();
  const { colors } = useTheme();

  const styles = createStyles(colors);

  useLayoutEffect(() => {
    loadOnboardingData();
  }, []);

  const loadOnboardingData = async () => {
    const [
      username,
      cigarettesPerDay,
      cigarettesPerPack,
      price,
      currency,
      plan,
    ] = await Promise.all([
      AsyncStorage.getItem('@onboarding_name'),
      AsyncStorage.getItem('@onboarding_cigarettes_per_day'),
      AsyncStorage.getItem('@onboarding_cigarettes_per_pack'),
      AsyncStorage.getItem('@onboarding_cigarettes_price'),
      AsyncStorage.getItem('@onboarding_cigarettes_currency'),
      AsyncStorage.getItem('@onboarding_plan'),
    ]);

    setOnboardingData({
      username: username ?? '',
      cigarettesPerDay: cigarettesPerDay ?? '',
      cigarettesPerPack: cigarettesPerPack ?? '',
      price: price ?? '',
      currency: currency ?? '',
      plan: plan ? JSON.parse(plan) : null,
    });
  };

  const handleNext = async () => {
    if (!isOnboardingComplete) {
      router.replace('/(onboarding)');
    } else {
      await AsyncStorage.setItem(
        '@user_config',
        JSON.stringify(onboardingData),
      );
      router.replace('/(tabs)');
    }
  };

  const isOnboardingComplete = Object.values(onboardingData).every(
    (value) => value !== '' && value !== null,
  );

  const priceAndCurrency = `${onboardingData.price} ${onboardingData.currency}`;

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <View style={styles.topContainer}>
          <OnboardingProgressBar dashesNum={6} stepsText='' percentNum={100} />
          <View style={styles.iconContainer}>
            <Ionicons name='checkmark-done' size={64} color='#fff' />
          </View>
          <View>
            <Text style={styles.title}>You&apos;re all set!</Text>
            <Text style={styles.subtitle}>Let&apos;s get started</Text>
          </View>

          <ScrollView style={{ width: '100%' }}>
            <View style={styles.buttonsContainer}>
              <OnboardingCard
                data={onboardingData.username}
                label='Your name'
                iconName='person-outline'
              />
              <OnboardingCard
                data={onboardingData.cigarettesPerDay}
                label='Cigarettes per day'
                iconName='calendar-outline'
              />
              <OnboardingCard
                data={onboardingData.cigarettesPerPack}
                label='Cigarettes per pack'
                iconName='cube-outline'
              />
              <OnboardingCard
                data={priceAndCurrency.trim()}
                label='Pack price'
                iconName='cash-outline'
              />
              <OnboardingCard
                data={onboardingData.plan?.planLength.toString()}
                label='Your plan'
                iconName='clipboard-outline'
              />
            </View>
          </ScrollView>
        </View>

        {isOnboardingComplete ? (
          <Button onPress={handleNext}>Get Started!</Button>
        ) : (
          <Button onPress={handleNext}>Back to the beginning</Button>
        )}
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
      paddingTop: 16,
      gap: 8,
      width: '100%',
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
