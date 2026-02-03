import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { ColorScheme, useTheme } from '@/hooks/useTheme';
import { SafeAreaView } from 'react-native-safe-area-context';

import Ionicons from '@expo/vector-icons/Ionicons';
import OnboardingProgressBar from '@/components/OnboardingProgressBar';
import Button from '@/components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Name() {
  const [name, setName] = useState('');
  const router = useRouter();
  const { colors } = useTheme();

  const styles = createStyles(colors);

  useEffect(() => {
    loadSavedName();
  }, []);

  const loadSavedName = async () => {
    try {
      const saved = await AsyncStorage.getItem('@onboarding_name');
      if (saved) setName(saved);
    } catch (error) {
      console.error('Error loading saved name: ', error);
    }
  };

  const handleNext = async () => {
    if (!name.trim()) {
      alert('Please enter your name');
      return;
    }

    try {
      await AsyncStorage.setItem('@onboarding_name', name.trim());
      router.push('/(onboarding)/cigarettesPerDay');
    } catch (error) {
      console.error('Error saving name: ', error);
      Alert.alert('Error', 'Failed to save your name. Please try again.', [
        { text: 'OK' },
      ]);
    }
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
                dashesNum={1}
                stepsText='Step 1 of 5'
                percentNum={0}
              />
              <View style={styles.iconContainer}>
                <Ionicons name='person-outline' size={64} color='#fff' />
              </View>
              <View>
                <Text style={styles.title}>What should we call you?</Text>
                <Text style={styles.subtitle}>
                  So we can personalize things
                </Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder='Enter your name'
                placeholderTextColor={colors.textMuted}
                value={name}
                onChangeText={setName}
                returnKeyType='next'
                onSubmitEditing={handleNext}
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
