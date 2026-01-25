import { View, Text, Pressable, Keyboard, StyleSheet } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { ColorScheme, useTheme } from '@/hooks/useTheme';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import OnboardingProgressBar from '@/components/OnboardingProgressBar';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '@/components/Button';

export type PlansDataType = {
  id: number;
  planLength: number;
  planDescription: string;
};

const plansData: PlansDataType[] = [
  {
    id: 1,
    planLength: 14,
    planDescription: 'Quick reset, fast, focuse, intense',
  },
  {
    id: 2,
    planLength: 21,
    planDescription: 'Balanced change, build habits',
  },
  {
    id: 3,
    planLength: 30,
    planDescription: 'Deep transformation, long-term results',
  },
];

export default function Plan() {
  const [selectedPlan, setSelectedPlan] = useState<PlansDataType>(plansData[2]);
  const router = useRouter();
  const { colors } = useTheme();

  const styles = createStyles(colors);

  useLayoutEffect(() => {
    loadSavedPlan();
  }, []);

  const loadSavedPlan = async () => {
    const saved = await AsyncStorage.getItem('@onboarding_plan');
    if (saved) {
      const parsed: PlansDataType = JSON.parse(saved);
      setSelectedPlan(parsed);
    }
  };

  const handleNext = async () => {
    if (!selectedPlan) {
      alert('Choose your plan');
      return;
    }

    await AsyncStorage.setItem(
      '@onboarding_plan',
      JSON.stringify(selectedPlan),
    );

    router.push('/(onboarding)/ready');
  };

  return (
    <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <View style={styles.topContainer}>
            <OnboardingProgressBar
              dashesNum={5}
              stepsText='Step 5 of 5'
              percentNum={80}
            />
            <View style={styles.iconContainer}>
              <Ionicons name='clipboard-outline' size={64} color='#fff' />
            </View>
            <View>
              <Text style={styles.title}>Choose your plan</Text>
              <Text style={styles.subtitle}>Pick your quitting pace</Text>
            </View>

            <View style={styles.buttonsContainer}>
              {plansData.map((item) => (
                <Pressable
                  key={item.id}
                  style={[
                    styles.selectButton,
                    selectedPlan.id === item.id && styles.selected,
                  ]}
                  onPress={() => setSelectedPlan(item)}
                >
                  <View style={styles.selectButtonRow}>
                    <Ionicons
                      name='calendar-outline'
                      size={32}
                      color={colors.primary}
                    />
                    <View>
                      <Text style={styles.selectButtonTitle}>
                        {item.planLength} days
                      </Text>
                      <Text style={styles.selectButtonSubtitle}>
                        {item.planDescription}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>
          </View>
          <Button onPress={handleNext}>Continue</Button>
        </View>
      </SafeAreaView>
    </Pressable>
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
    iconContainer: {
      backgroundColor: colors.primary,
      borderRadius: 14,
      padding: 16,
      marginVertical: 16,
    },
    buttonsContainer: {
      gap: 8,
      width: '100%',
    },
    selectButton: {
      width: '100%',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.border,
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
    selected: {
      borderColor: colors.primary,
      backgroundColor: colors.primary10,
    },
  });
