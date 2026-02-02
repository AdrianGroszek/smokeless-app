import { useMemo, forwardRef, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { ColorScheme, useTheme } from '@/hooks/useTheme';
import { useSmokingStore } from '@/stores/useSmokingStore';
import { getDayPeriod } from '@/utils/helpers';
import Ionicons from '@expo/vector-icons/Ionicons';

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
        enableDynamicSizing={false}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: colors.surface }}
        handleIndicatorStyle={{ backgroundColor: colors.textSecondary }}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.title}>
            {dateKey ? formatDate(dateKey) : 'Smoking Times'}
          </Text>
          <View style={styles.summary}>
            <Text style={styles.summaryText}>
              Total: {smokingTimes.length} cigarette
              {smokingTimes.length !== 1 ? 's' : ''}
            </Text>
          </View>

          <BottomSheetScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            {smokingTimes.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No cigarettes smoked 🎉</Text>
              </View>
            ) : (
              smokingTimes.map((time, index) => {
                const dayPeriod = getDayPeriod(time);
                const isLast = index === smokingTimes.length - 1;
                return (
                  <View
                    key={`${time}-${index}`}
                    style={[
                      styles.timeItem,
                      {
                        borderBottomColor: isLast
                          ? 'transparent'
                          : colors.border,
                      },
                    ]}
                  >
                    <View style={{ flexDirection: 'row', gap: 8 }}>
                      <Text
                        style={styles.timeTextMuted}
                      >{`${index + 1}.`}</Text>
                      <Text style={styles.timeText}>{formatTime(time)}</Text>
                    </View>
                    <Ionicons
                      name={dayPeriod.icon}
                      color={colors.textPrimary}
                      size={20}
                    />
                  </View>
                );
              })
            )}
          </BottomSheetScrollView>
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
      justifyContent: 'space-between',
      gap: 8,
      paddingVertical: 12,
      paddingHorizontal: 8,
      borderBottomWidth: 1,
      borderRadius: 8,
    },
    timeText: {
      fontSize: 16,
      color: colors.textPrimary,
      fontWeight: '500',
    },
    timeTextMuted: {
      fontSize: 16,
      color: colors.textMuted,
      fontWeight: '500',
      minWidth: 24,
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
    },
    summaryText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.primary,
    },
  });
