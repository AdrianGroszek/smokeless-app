import Card from '@/UI/Card';
import Subtitle from '@/UI/Subtitle';

import { View, StyleSheet } from 'react-native';

export default function SummarySection() {
  return (
    <View style={styles.container}>
      <Subtitle navigateTo='/progress'>Summary</Subtitle>
      <View style={styles.summaryWrapper}>
        <Card title='-42%' subtitle='Less cigarettes' iconName='leaf-outline' />
        <Card title='320 PLN' subtitle='Money saved' iconName='cash-outline' />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  summaryWrapper: {
    flexDirection: 'row',
  },
});
