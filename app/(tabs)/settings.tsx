import { View, Text, Pressable, Alert } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSmokingStore } from '@/stores/useSmokingStore';
import { useRouter } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';

export default function Settings() {
  const resetApp = useSmokingStore((state) => state.resetApp);
  const router = useRouter();
  const { isDark, setMode } = useTheme();

  const handleReset = () => {
    Alert.alert('Reset Aplikacji', 'Czy zresetować wszyste dane użytkownika?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Reset',
        onPress: () => {
          resetApp();
          router.replace('/(onboarding)');
        },
        style: 'destructive',
      },
    ]);
  };

  const handleToggleTheme = () => {
    return isDark ? setMode('light') : setMode('dark');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Pressable
          onPress={handleReset}
          style={{
            backgroundColor: 'orange',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 12,
            marginTop: 100,
            marginHorizontal: 20,
            borderRadius: 50,
          }}
        >
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 600 }}>
            Reset APP
          </Text>
        </Pressable>
        <Pressable
          onPress={handleToggleTheme}
          style={{
            backgroundColor: '#8a8a8a',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 12,
            marginTop: 100,
            marginHorizontal: 20,
            borderRadius: 50,
          }}
        >
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 600 }}>
            Toggle Theme
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
