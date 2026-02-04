import {
  View,
  Text,
  Pressable,
  Alert,
  StyleSheet,
  ScrollView,
  Switch,
} from 'react-native';
import React, { useMemo, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSmokingStore } from '@/stores/useSmokingStore';
import { useRouter } from 'expo-router';
import { ColorScheme, useTheme } from '@/hooks/useTheme';
import { fakeAchievements, fakeDailyLogs, fakeProfile } from '@/utils/fakeData';
import Header from '@/components/Header';
import Subtitle from '@/UI/Subtitle';
import Ionicons from '@expo/vector-icons/Ionicons';
import SettingsItem from '@/components/SettingsItem';
import BottomSheet from '@gorhom/bottom-sheet';
import SettingsEditBottomSheet from '@/components/SettingsEditBottomSheet';
import { useScrollToTop } from '@react-navigation/native';

type EditableField =
  | 'username'
  | 'packPrice'
  | 'currency'
  | 'cigarettesPerPack';

export default function Settings() {
  const resetApp = useSmokingStore((state) => state.resetApp);
  const router = useRouter();
  const profileData = useSmokingStore((state) => state.profile);
  const { isDark, setMode, colors } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(isDark);

  const editBottomSheetRef = useRef<BottomSheet>(null);
  const [selectedField, setSelectedField] = useState<EditableField | null>(
    null,
  );

  const scrollRef = useRef<ScrollView>(null);
  useScrollToTop(scrollRef);

  const toggleDarkMode = () => {
    if (isDark) {
      setMode('light');
      setIsDarkMode(false);
    } else {
      setMode('dark');
      setIsDarkMode(true);
    }
  };

  const styles = useMemo(() => createStyles(colors), [colors]);

  const handleEditPress = (field: EditableField) => {
    setSelectedField(field);
    editBottomSheetRef.current?.snapToIndex(1);
  };

  const handleEditClose = () => {
    editBottomSheetRef.current?.close();
    setSelectedField(null);
  };

  const handleReset = () => {
    Alert.alert(
      'Reset App Data',
      'Are you sure you want to reset all app data? This action cannot be undone.',
      [
        {
          text: 'Cancel',
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
      ],
    );
  };

  const handleSetFakeData = () => {
    Alert.alert(
      'Fill with Sample Data',
      'Are you sure you want to fill the app with sample data? This will overwrite your current data.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Fill',
          onPress: () => {
            useSmokingStore.setState({
              profile: fakeProfile,
              dailyLogs: fakeDailyLogs,
              achievements: fakeAchievements,
              onboardingCompleted: true,
              currentStreak: 8,
              longestStreak: 8,
            });
            router.replace('/(onboarding)');
          },
          style: 'destructive',
        },
      ],
    );
  };

  return (
    <>
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <Header label='Settings' />
        <ScrollView
          contentContainerStyle={{ gap: 16, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          ref={scrollRef}
        >
          <View style={{ gap: 8 }}>
            <Subtitle>Profile</Subtitle>
            <View style={styles.groupWrapper}>
              <SettingsItem
                label='Username'
                value={profileData?.username}
                icon='create-outline'
                onPress={() => handleEditPress('username')}
              />
              <SettingsItem
                label='Pack price'
                value={profileData?.packPrice.toString()}
                icon='create-outline'
                onPress={() => handleEditPress('packPrice')}
              />
              <SettingsItem
                label='Currency'
                value={profileData?.currency}
                icon='create-outline'
                onPress={() => handleEditPress('currency')}
              />
              <SettingsItem
                label='Cigarettes per pack'
                value={profileData?.cigarettesPerPack.toString()}
                icon='create-outline'
                onPress={() => handleEditPress('cigarettesPerPack')}
              />
              <SettingsItem
                label='Cigarettes per day (start)'
                value={profileData?.cigarettesPerDay.toString()}
                icon='information-circle-outline'
                disabled={true}
              />
              <SettingsItem
                label='Plan'
                value={`${profileData?.planDuration} days`}
                icon='information-circle-outline'
                disabled={true}
              />
              <SettingsItem
                label='Start date'
                value={profileData?.startDate.split('T')[0]}
                icon='information-circle-outline'
                hideDivider={true}
                disabled={true}
              />
            </View>
          </View>
          <View style={{ gap: 8 }}>
            <Subtitle>Preferences</Subtitle>
            <View style={styles.groupWrapper}>
              <SettingsItem
                label='Dark mode'
                rightComponent={
                  <Switch
                    ios_backgroundColor={colors.border}
                    onValueChange={toggleDarkMode}
                    value={isDarkMode}
                  />
                }
              />
              <SettingsItem
                label='Notifications'
                rightComponent={
                  <Switch ios_backgroundColor={colors.border} disabled />
                }
                hideDivider={true}
                disabled={true}
              />
            </View>
          </View>
          <View style={{ gap: 8 }}>
            <Subtitle>Advanced</Subtitle>
            <View
              style={[
                styles.groupWrapper,
                {
                  borderColor: isDark ? colors.warning : '#f6aa1c',
                  backgroundColor: colors.warning10,
                },
              ]}
            >
              <Pressable
                style={({ pressed }) => [
                  styles.pressableItem,
                  pressed && { opacity: 0.65 },
                ]}
                onPress={handleReset}
              >
                <Text
                  style={{
                    color: isDark ? colors.warning : '#f6aa1c',
                    // color: colors.warning,
                    fontWeight: 500,
                    fontSize: 16,
                  }}
                >
                  Reset App Data
                </Text>
                <View style={styles.textWithIconWrapper}>
                  <Ionicons
                    name='refresh-outline'
                    color={isDark ? colors.warning : '#f6aa1c'}
                    // color={colors.warning}
                    size={18}
                  />
                </View>
              </Pressable>
            </View>
          </View>
          <View style={{ gap: 8 }}>
            <Subtitle>Development Only</Subtitle>
            <View
              style={[
                styles.groupWrapper,
                {
                  borderColor: isDark ? colors.warning : '#f6aa1c',
                  backgroundColor: colors.warning10,
                },
              ]}
            >
              <Pressable
                style={({ pressed }) => [
                  styles.pressableItem,
                  pressed && { opacity: 0.65 },
                ]}
                onPress={handleSetFakeData}
              >
                <Text
                  style={{
                    color: isDark ? colors.warning : '#f6aa1c',
                    // color: colors.warning,
                    fontWeight: 500,
                    fontSize: 16,
                  }}
                >
                  Fill with Sample Data
                </Text>
                <View style={styles.textWithIconWrapper}>
                  <Ionicons
                    name='layers-outline'
                    color={isDark ? colors.warning : '#f6aa1c'}
                    // color={colors.warning}
                    size={18}
                  />
                </View>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      <SettingsEditBottomSheet
        ref={editBottomSheetRef}
        field={selectedField}
        onClose={handleEditClose}
      />
    </>
  );
}

const createStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      gap: 16,
      paddingTop: 16,
      paddingHorizontal: 16,
    },
    cardsContainer: {
      gap: 8,
    },
    cardsRowContainer: {
      flexDirection: 'row',
    },
    groupWrapper: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      // paddingVertical: 8,
      paddingHorizontal: 14,
      borderWidth: 1,
      borderColor: colors.border,
    },
    pressableItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 2,
    },
    textWhite: {
      color: colors.textPrimary,
      fontWeight: 500,
      fontSize: 16,
    },
    textMuted: {
      color: colors.textSecondary,
      fontWeight: 500,
      fontSize: 16,
    },
    textWithIconWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
  });
