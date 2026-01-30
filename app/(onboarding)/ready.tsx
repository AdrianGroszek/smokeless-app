import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ColorScheme, useTheme } from '@/hooks/useTheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import OnboardingProgressBar from '@/components/OnboardingProgressBar';
import Button from '@/components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingCard from '@/components/OnboardingCard';
import { UserProfile, useSmokingStore } from '@/stores/useSmokingStore';

export default function Ready() {
  const router = useRouter();
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const setProfile = useSmokingStore((state) => state.setProfile);
  const completeOnboarding = useSmokingStore(
    (state) => state.completeOnboarding,
  );

  const [data, setData] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [name, cigarettes, pack, price, currency, plan] =
          await Promise.all([
            AsyncStorage.getItem('@onboarding_name'),
            AsyncStorage.getItem('@onboarding_cigarettes_per_day'),
            AsyncStorage.getItem('@onboarding_cigarettes_per_pack'),
            AsyncStorage.getItem('@onboarding_cigarettes_price'),
            AsyncStorage.getItem('@onboarding_cigarettes_currency'),
            AsyncStorage.getItem('@onboarding_plan'),
          ]);

        setData({
          username: name || 'User',
          cigarettesPerDay: parseInt(cigarettes || '20', 10),
          cigarettesPerPack: parseInt(pack || '20', 10),
          packPrice: parseFloat(price || '15'),
          currency: currency || 'PLN',
          planDuration: parseInt(plan || '14', 10) as 14 | 21 | 30,
          startDate: new Date().toISOString(),
        });
      } catch (error) {
        console.error('Error loading onboarding data:', error);
        Alert.alert('Error', 'Failed to load onboarding data');
      }
    };

    fetchData();
  }, []);

  const handleNext = async () => {
    if (!data) {
      Alert.alert('Error', 'No data loaded');
      return;
    }

    try {
      setProfile(data);
      completeOnboarding();

      await AsyncStorage.multiRemove([
        '@onboarding_name',
        '@onboarding_cigarettes_per_day',
        '@onboarding_cigarettes_per_pack',
        '@onboarding_cigarettes_price',
        '@onboarding_cigarettes_currency',
        '@onboarding_plan',
      ]);

      router.replace('/(tabs)');
    } catch (error) {
      console.error('Error saving profile:', error);
      Alert.alert('Error', 'Failed to save your profile');
    }
  };

  const priceAndCurrency = data ? `${data.packPrice} ${data.currency}` : '';

  if (!data) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.subtitle}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.topContainer}>
          {/* Progress Bar */}
          <OnboardingProgressBar dashesNum={6} stepsText='' percentNum={100} />

          {/* Ikona checkmark */}
          <View style={styles.iconContainer}>
            <Ionicons name='checkmark-done' size={64} color='#fff' />
          </View>

          {/* Nagłówek */}
          <View>
            <Text style={styles.title}>You&apos;re all set!</Text>
            <Text style={styles.subtitle}>Let&apos;s get started</Text>
          </View>

          {/* Lista podsumowania */}
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.cardsContainer}>
              <OnboardingCard
                data={data.username}
                label='Your name'
                iconName='person-outline'
              />
              <OnboardingCard
                data={data.cigarettesPerDay.toString()}
                label='Cigarettes per day'
                iconName='calendar-outline'
              />
              <OnboardingCard
                data={data.cigarettesPerPack.toString()}
                label='Cigarettes per pack'
                iconName='cube-outline'
              />
              <OnboardingCard
                data={priceAndCurrency}
                label='Pack price'
                iconName='cash-outline'
              />
              <OnboardingCard
                data={`${data.planDuration} days`}
                label='Plan duration'
                iconName='clipboard-outline'
              />
            </View>
          </ScrollView>
        </View>

        {/* Przycisk na dole */}
        <Button onPress={handleNext}>Get Started!</Button>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 16,
    },
    mainContainer: {
      flex: 1,
      justifyContent: 'space-between',
    },
    topContainer: {
      alignItems: 'center',
      gap: 16,
      flex: 1,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    scrollView: {
      width: '100%',
    },
    cardsContainer: {
      paddingTop: 16,
      gap: 8,
      width: '100%',
    },
    title: {
      color: colors.textPrimary,
      fontSize: 28,
      fontWeight: '500',
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
