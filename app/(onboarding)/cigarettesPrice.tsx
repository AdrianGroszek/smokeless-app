import {
  View,
  Text,
  Keyboard,
  Pressable,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

import { ColorScheme, useTheme } from '@/hooks/useTheme';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import OnboardingProgressBar from '@/components/OnboardingProgressBar';
import Ionicons from '@expo/vector-icons/Ionicons';
import Button from '@/components/Button';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatAmount } from '@/utils/helpers';

export default function CigarettesPrice() {
  const [price, setPrice] = useState('');
  const [currency, setCurrency] = useState('');
  const router = useRouter();
  const { colors } = useTheme();

  const styles = createStyles(colors);

  useEffect(() => {
    loadSavedPrice();
    loadSavedCurrency();
  }, []);

  const loadSavedPrice = async () => {
    try {
      const saved = await AsyncStorage.getItem('@onboarding_cigarettes_price');
      if (saved) setPrice(saved);
    } catch (error) {
      console.error('Error loading saved price: ', error);
    }
  };

  const loadSavedCurrency = async () => {
    try {
      const saved = await AsyncStorage.getItem(
        '@onboarding_cigarettes_currency',
      );
      if (saved) setCurrency(saved);
    } catch (error) {
      console.error('Error loading saved currency: ', error);
    }
  };

  const handleNext = async () => {
    const num = parseFloat(price.replace(',', '.'));
    if (isNaN(num) || num <= 0) {
      alert('Please enter a valid price');
      return;
    }
    if (!currency.trim()) {
      alert('Please enter currency');
      return;
    }

    try {
      await AsyncStorage.setItem(
        '@onboarding_cigarettes_price',
        formatAmount(price),
      );
      await AsyncStorage.setItem('@onboarding_cigarettes_currency', currency);
      router.push('/(onboarding)/plan');
    } catch (error) {
      console.error('Error saving price and currency: ', error);
      Alert.alert(
        'Error',
        'Failed to save your price and currency. Please try again.',
        [{ text: 'OK' }],
      );
    }
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
                dashesNum={4}
                stepsText='Step 4 of 5'
                percentNum={60}
              />
              <View style={styles.iconContainer}>
                <Ionicons name='cash-outline' size={64} color='#fff' />
              </View>
              <View>
                <Text style={styles.title}>Pack price?</Text>
                <Text style={styles.subtitle}>See your potential savings</Text>
              </View>
              <View style={styles.inputsContainer}>
                <TextInput
                  style={styles.input}
                  placeholder='Price'
                  placeholderTextColor={colors.textMuted}
                  keyboardType='decimal-pad'
                  value={price}
                  onChangeText={setPrice}
                />
                <TextInput
                  style={styles.input}
                  placeholder='Currency'
                  placeholderTextColor={colors.textMuted}
                  value={currency}
                  onChangeText={(value) => setCurrency(value.toUpperCase())}
                  maxLength={3}
                  autoCapitalize='characters'
                />
              </View>
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
    inputsContainer: {
      flexDirection: 'row',
      marginTop: 16,
      gap: 16,
    },
    input: {
      flex: 1,
      borderRadius: 50,
      paddingHorizontal: 24,
      paddingVertical: 16,
      borderWidth: 1,
      borderColor: colors.textMuted,
      color: colors.textPrimary,
      textAlign: 'center',
      fontSize: 18,
    },
  });
