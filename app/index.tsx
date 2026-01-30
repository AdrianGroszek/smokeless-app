import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSmokingStore } from '@/stores/useSmokingStore';

export default function Index() {
  const router = useRouter();

  const onboardingCompleted = useSmokingStore(
    (state) => state.onboardingCompleted,
  );
  const recalculateStreaks = useSmokingStore(
    (state) => state.recalculateStreaks,
  );

  useEffect(() => {
    useSmokingStore.getState().ensureTodayExists();

    router.replace(onboardingCompleted ? '/(tabs)' : '/(onboarding)');
  }, [onboardingCompleted, router]);

  useEffect(() => {
    recalculateStreaks();
  }, [recalculateStreaks]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size='large' />
    </View>
  );
}
