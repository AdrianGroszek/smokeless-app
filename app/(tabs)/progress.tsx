import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Progress() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Text>Progress</Text>
      </View>
    </SafeAreaView>
  );
}
