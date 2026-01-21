import { View, StyleSheet } from 'react-native';
import React from 'react';
import Subtitle from '@/UI/Subtitle';
import Card from '@/UI/Card';

export default function LastAchievements() {
  return (
    <View style={styles.container}>
      <Subtitle navigateTo='/progress'>Latest achievements</Subtitle>

      <Card
        title='First Week'
        subtitle='Less cigarettes'
        iconName='trending-down-outline'
      />
      <Card
        title='First Week'
        subtitle='Less cigarettes'
        iconName='trending-down-outline'
      />
      <Card
        title='First Week'
        subtitle='Less cigarettes'
        iconName='trending-down-outline'
      />
      <Card
        title='First Week'
        subtitle='Less cigarettes'
        iconName='trending-down-outline'
      />
      <Card
        title='First Week'
        subtitle='Less cigarettes'
        iconName='trending-down-outline'
      />
      <Card
        title='First Week'
        subtitle='Less cigarettes'
        iconName='trending-down-outline'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
});
