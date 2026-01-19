import Header from '@/components/Header';
import { useTheme } from '@/hooks/useTheme';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function Index() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        style={colors.statusBarStyle === 'light-content' ? 'light' : 'dark'}
      />
      <Header />
      <View>
        <Text>Edit app/index.tsx to edit this screen.</Text>
      </View>
    </SafeAreaView>
  );
}
