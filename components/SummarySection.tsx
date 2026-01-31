import { useSmokingStore } from '@/stores/useSmokingStore';
import Card from '@/UI/Card';
import Subtitle from '@/UI/Subtitle';

import { View, StyleSheet } from 'react-native';

export default function SummarySection() {
  const profileData = useSmokingStore((state) => state.profile);
  const getTotalMoneySaved = useSmokingStore(
    (state) => state.getTotalMoneySaved,
  );
  const getTotalCigarettesSaved = useSmokingStore(
    (state) => state.getTotalCigarettesSaved,
  );

  const totalMoneySaved = getTotalMoneySaved();
  const totalCigarettesSaved = getTotalCigarettesSaved();

  return (
    <View style={styles.container}>
      <Subtitle navigateTo='/progress'>Summary</Subtitle>
      <View style={styles.summaryWrapper}>
        <Card
          title={`${totalCigarettesSaved < 0 ? 0 : totalCigarettesSaved}`}
          subtitle='Less cigarettes'
          iconName='leaf-outline'
        />
        <Card
          title={`${totalMoneySaved.toFixed(2)} ${profileData?.currency}`}
          subtitle='Money saved'
          iconName='cash-outline'
        />
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
