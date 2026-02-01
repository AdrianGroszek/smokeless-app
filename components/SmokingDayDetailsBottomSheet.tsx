import { useMemo, forwardRef, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { ColorScheme, useTheme } from '@/hooks/useTheme';
import { useSmokingStore } from '@/stores/useSmokingStore';

type Props = {
  dateKey: string | null;
};

const SmokingDayDetailsBottomSheet = forwardRef<BottomSheet, Props>(
  ({ dateKey }, ref) => {
    const { colors } = useTheme();
    const styles = useMemo(() => createStyles(colors), [colors]);

    const dailyLogs = useSmokingStore((state) => state.dailyLogs);

    const snapPoints = useMemo(() => ['50%', '75%'], []);

    const smokingTimes = useMemo(() => {
      if (!dateKey) return [];
      const log = dailyLogs[dateKey];
      return log?.smokingTimes || [];
    }, [dateKey, dailyLogs]);

    const formatTime = (isoString: string) => {
      const date = new Date(isoString);
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
    };

    const formatDate = (dateKey: string) => {
      const date = new Date(dateKey);
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    };

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.5}
        />
      ),
      [],
    );

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: colors.surface }}
        handleIndicatorStyle={{ backgroundColor: colors.textSecondary }}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.title}>
            {dateKey ? formatDate(dateKey) : 'Smoking Times'}
          </Text>

          <BottomSheetScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            {smokingTimes.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No cigarettes smoked 🎉</Text>
              </View>
            ) : (
              smokingTimes.map((time, index) => (
                <View key={`${time}-${index}`} style={styles.timeItem}>
                  <View style={styles.timeCircle}>
                    <Text style={styles.timeCircleText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.timeText}>{formatTime(time)}</Text>
                </View>
              ))
            )}
          </BottomSheetScrollView>

          <View style={styles.summary}>
            <Text style={styles.summaryText}>
              Total: {smokingTimes.length} cigarette
              {smokingTimes.length !== 1 ? 's' : ''}
            </Text>
          </View>
        </View>
      </BottomSheet>
    );
  },
);

SmokingDayDetailsBottomSheet.displayName = 'SmokingDayDetailsBottomSheet';

export default SmokingDayDetailsBottomSheet;

const createStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    contentContainer: {
      flex: 1,
      paddingHorizontal: 16,
    },
    title: {
      fontSize: 20,
      fontWeight: '600',
      color: colors.textPrimary,
      marginBottom: 16,
      textAlign: 'center',
    },
    scrollContainer: {
      paddingBottom: 16,
    },
    listContainer: {
      paddingBottom: 16,
    },
    timeItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: colors.background,
      borderRadius: 8,
      marginBottom: 8,
    },
    timeCircle: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    timeCircleText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 14,
    },
    timeText: {
      fontSize: 16,
      color: colors.textPrimary,
      fontWeight: '500',
    },
    emptyState: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 40,
    },
    emptyText: {
      fontSize: 16,
      color: colors.textSecondary,
    },
    summary: {
      paddingVertical: 16,
      borderTopWidth: 1,
      borderTopColor: colors.surface,
      alignItems: 'center',
    },
    summaryText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.primary,
    },
  });
