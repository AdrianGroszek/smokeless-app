import { useMemo, forwardRef, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { ColorScheme, useTheme } from '@/hooks/useTheme';
import { useSmokingStore } from '@/stores/useSmokingStore';
import { formatDate } from '@/utils/helpers';

type Props = {
  onDayPress: (dateKey: string) => void;
};

const SmokingDaysBottomSheet = forwardRef<BottomSheet, Props>(
  ({ onDayPress }, ref) => {
    const { colors } = useTheme();
    const styles = useMemo(() => createStyles(colors), [colors]);
    const dailyLogs = useSmokingStore((state) => state.dailyLogs);

    const snapPoints = useMemo(() => ['50%', '75%'], []);

    const allDays = useMemo(() => {
      return Object.entries(dailyLogs).sort(
        ([a], [b]) => b.localeCompare(a), // Sort newest first
      );
    }, [dailyLogs]);

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
          <Text style={styles.title}>All Days</Text>

          <BottomSheetScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            {allDays.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No data yet 📝</Text>
              </View>
            ) : (
              allDays.map(([dateKey, log], index) => {
                const isLast = index === allDays.length - 1;
                return (
                  <Pressable
                    key={dateKey}
                    style={({ pressed }) => [
                      styles.dayItem,
                      {
                        borderBottomColor:
                          isLast && index !== 0 ? 'transparent' : colors.border,
                      },
                      pressed && { opacity: 0.6 },
                    ]}
                    onPress={() => onDayPress(dateKey)}
                  >
                    <View>
                      <Text style={styles.dateText}>{formatDate(dateKey)}</Text>
                      <Text style={styles.cigarettesText}>
                        {log.cigarettesSmoked} cigarette
                        {log.cigarettesSmoked !== 1 ? 's' : ''}
                      </Text>
                    </View>
                    <Text style={styles.arrowText}>›</Text>
                  </Pressable>
                );
              })
            )}
          </BottomSheetScrollView>
        </View>
      </BottomSheet>
    );
  },
);

SmokingDaysBottomSheet.displayName = 'SmokingDaysBottomSheet';

export default SmokingDaysBottomSheet;

const createStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    contentContainer: {
      // flex: 1,
      paddingHorizontal: 16,
      paddingBottom: 24,
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
    dayItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 14,
      paddingHorizontal: 8,
      borderBottomWidth: 1,
    },
    dateText: {
      fontSize: 16,
      fontWeight: '500',
      color: colors.textPrimary,
      marginBottom: 2,
    },
    cigarettesText: {
      fontSize: 13,
      color: colors.textSecondary,
    },
    arrowText: {
      fontSize: 22,
      color: colors.textSecondary,
    },
    emptyState: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 40,
    },
    emptyText: {
      fontSize: 16,
      color: colors.textSecondary,
    },
  });
