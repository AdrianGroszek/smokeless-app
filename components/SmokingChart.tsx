import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  Pressable,
} from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { useTheme } from '@/hooks/useTheme';
import { useSmokingStore } from '@/stores/useSmokingStore';
import Subtitle from '@/UI/Subtitle';

const SmokingChart = () => {
  const { colors } = useTheme();
  const [period, setPeriod] = useState('7days'); // '7days' or 'all'

  const dailyLogs = useSmokingStore((state) => state.dailyLogs);

  // Get chart data based on selected period
  const getChartData = () => {
    const today = new Date();

    if (period === '7days') {
      const data = [];

      // Loop through last 7 days
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateKey = date.toISOString().split('T')[0];

        const log = dailyLogs[dateKey];
        const count = log?.smokingTimes?.length || 0;

        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

        data.push({
          value: count,
          label: dayName,
          frontColor: colors.primary,
        });
      }

      return data;
    } else {
      // Get all days from dailyLogs
      const allDates = Object.keys(dailyLogs).sort();
      const data = allDates.map((dateKey) => {
        const log = dailyLogs[dateKey];
        const count = log?.smokingTimes?.length || 0;
        const date = new Date(dateKey);
        const label = date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        });

        return {
          value: count,
          label: label,
          frontColor: colors.primary,
        };
      });

      return data;
    }
  };

  const chartData = getChartData();

  // Calculate statistics
  const totalCigarettes = chartData.reduce((sum, day) => sum + day.value, 0);
  const averagePerDay =
    chartData.length > 0
      ? (totalCigarettes / chartData.length).toFixed(1)
      : '0';

  const maxValue = Math.max(...chartData.map((d) => d.value), 0) + 2;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          shadowColor: '#000',
          shadowOffset: {
            width: 1,
            height: 1,
          },
          shadowOpacity: 0.1,
          shadowRadius: 2.62,
          elevation: 2,
        },
      ]}
    >
      <Subtitle>Cigarettes Smoked Daily</Subtitle>
      {/* Period Toggle */}
      <View
        style={[styles.toggleContainer, { backgroundColor: colors.background }]}
      >
        <Pressable
          style={({ pressed }) => [
            styles.toggleButton,
            pressed && { opacity: 0.7 },
            period === '7days' && { backgroundColor: colors.primary },
          ]}
          onPress={() => setPeriod('7days')}
        >
          <Text
            style={[
              styles.toggleText,
              { color: period === '7days' ? '#FFFFFF' : colors.textSecondary },
            ]}
          >
            Last 7 Days
          </Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.toggleButton,
            pressed && { opacity: 0.7 },
            period === 'all' && { backgroundColor: colors.primary },
          ]}
          onPress={() => setPeriod('all')}
        >
          <Text
            style={[
              styles.toggleText,
              { color: period === 'all' ? '#FFFFFF' : colors.textSecondary },
            ]}
          >
            All
          </Text>
        </Pressable>
      </View>

      {/* Statistics */}
      <View
        style={[styles.statsContainer, { backgroundColor: colors.background }]}
      >
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: colors.primary }]}>
            {totalCigarettes}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            Total
          </Text>
        </View>

        <View
          style={[styles.statDivider, { backgroundColor: colors.border }]}
        />

        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: colors.primary }]}>
            {averagePerDay}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            Avg
          </Text>
        </View>
      </View>

      {/* Chart */}
      {chartData.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            No data available
          </Text>
        </View>
      ) : period === '7days' ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <BarChart
            key={`7days-chart`}
            data={chartData}
            width={320}
            height={140}
            barWidth={30}
            spacing={8}
            barBorderTopLeftRadius={6}
            barBorderTopRightRadius={6}
            hideRules
            xAxisThickness={1}
            yAxisThickness={1}
            xAxisColor={colors.border}
            yAxisColor={colors.border}
            yAxisTextStyle={{ color: colors.textSecondary, fontSize: 11 }}
            xAxisLabelTextStyle={{ color: colors.textSecondary, fontSize: 11 }}
            noOfSections={4}
            maxValue={maxValue}
            isAnimated
            animationDuration={600}
            showGradient
            gradientColor={colors.primary + '80'}
          />
        </ScrollView>
      ) : (
        // All Days - Horizontal scroll
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <BarChart
            key={`all-chart`}
            data={chartData}
            width={Platform.OS === 'ios' ? 320 : chartData.length * 40}
            height={140}
            barWidth={30}
            spacing={8}
            barBorderTopLeftRadius={6}
            barBorderTopRightRadius={6}
            hideRules
            xAxisThickness={1}
            yAxisThickness={1}
            xAxisColor={colors.border}
            yAxisColor={colors.border}
            yAxisTextStyle={{ color: colors.textSecondary, fontSize: 11 }}
            xAxisLabelTextStyle={{ color: colors.textSecondary, fontSize: 10 }}
            noOfSections={4}
            maxValue={maxValue}
            isAnimated
            animationDuration={600}
            showGradient
            gradientColor={colors.primary + '80'}
          />
        </ScrollView>
      )}
    </View>
  );
};

export default SmokingChart;

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 4,
  },
  toggleContainer: {
    flexDirection: 'row',
    borderRadius: 8,
    padding: 5,
    marginVertical: 8,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleText: {
    fontSize: 13,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statDivider: {
    width: 1,
    height: 30,
    marginHorizontal: 8,
  },
  chartContainer: {
    alignItems: 'center',
    paddingTop: 4,
  },
  scrollContent: {
    paddingHorizontal: 10,
    paddingTop: 4,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 14,
  },
});
