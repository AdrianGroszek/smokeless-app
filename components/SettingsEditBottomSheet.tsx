import {
  useMemo,
  forwardRef,
  useCallback,
  useState,
  useEffect,
  useRef,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Keyboard,
} from 'react-native';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { ColorScheme, useTheme } from '@/hooks/useTheme';
import { useSmokingStore } from '@/stores/useSmokingStore';
import { formatAmount } from '@/utils/helpers';
import * as Haptics from 'expo-haptics';

type EditableField =
  | 'username'
  | 'packPrice'
  | 'currency'
  | 'cigarettesPerPack';

type Props = {
  field: EditableField | null;
  onClose: () => void;
};

const FIELD_CONFIG = {
  username: {
    label: 'Username',
    keyboardType: 'default' as const,
    placeholder: 'Enter username',
  },
  packPrice: {
    label: 'Pack Price',
    keyboardType: 'decimal-pad' as const,
    placeholder: 'Enter pack price',
  },
  currency: {
    label: 'Currency',
    keyboardType: 'default' as const,
    placeholder: 'e.g. PLN, USD',
  },
  cigarettesPerPack: {
    label: 'Cigarettes Per Pack',
    keyboardType: 'number-pad' as const,
    placeholder: 'Enter number',
  },
};

const SettingsEditBottomSheet = forwardRef<BottomSheet, Props>(
  ({ field, onClose }, ref) => {
    const { colors } = useTheme();
    const styles = useMemo(() => createStyles(colors), [colors]);
    const profile = useSmokingStore((state) => state.profile);
    const inputRef = useRef<TextInput>(null);

    const snapPoints = useMemo(() => ['60%'], []);

    const [value, setValue] = useState('');

    // Update value when field changes
    useEffect(() => {
      if (!field || !profile) return;
      setValue(profile[field]?.toString() || '');
    }, [field, profile]);

    // Focus input only when field changes and is not null
    useEffect(() => {
      if (field) {
        inputRef.current?.focus();
      }
    }, [field]);

    const config = field ? FIELD_CONFIG[field] : null;

    const closeWithKeyboardDismiss = useCallback(() => {
      Keyboard.dismiss();
      onClose();
    }, [onClose]);

    const handleSave = () => {
      if (!field || !profile) return;

      let newValue: string | number = value;

      // Convert to number for numeric fields
      if (field === 'packPrice') {
        // newValue = parseFloat(value);
        newValue = parseFloat(formatAmount(value));
        if (isNaN(newValue)) return;
      }
      if (field === 'cigarettesPerPack') {
        newValue = parseInt(value, 10);
        if (isNaN(newValue)) return;
      }

      useSmokingStore.setState({
        profile: {
          ...profile,
          [field]: newValue,
        },
      });

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      closeWithKeyboardDismiss();
    };

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.5}
          pressMeToClose
          onPress={closeWithKeyboardDismiss}
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
        onClose={closeWithKeyboardDismiss}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: colors.surface }}
        handleIndicatorStyle={{ backgroundColor: colors.textSecondary }}
        enableContentPanningGesture={false}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Text style={styles.title}>{config?.label ?? 'Edit'}</Text>

          <TextInput
            ref={inputRef}
            style={styles.input}
            value={field === 'currency' ? value.toUpperCase() : value}
            onChangeText={setValue}
            placeholder={config?.placeholder}
            placeholderTextColor={colors.textSecondary}
            keyboardType={config?.keyboardType}
            autoFocus={false}
            clearButtonMode='while-editing'
            autoCapitalize={field === 'currency' ? 'characters' : 'words'}
            maxLength={field === 'currency' ? 3 : 99}
          />

          <View style={styles.buttonsContainer}>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                styles.buttonCancel,
                pressed && { opacity: 0.6 },
              ]}
              onPress={closeWithKeyboardDismiss}
            >
              <Text style={styles.buttonCancelText}>Cancel</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.button,
                styles.buttonSave,
                { backgroundColor: colors.primary },
                pressed && { opacity: 0.6 },
              ]}
              onPress={handleSave}
            >
              <Text style={styles.buttonSaveText}>Save</Text>
            </Pressable>
          </View>
        </BottomSheetView>
      </BottomSheet>
    );
  },
);

SettingsEditBottomSheet.displayName = 'SettingsEditBottomSheet';

export default SettingsEditBottomSheet;

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
      marginBottom: 20,
      textAlign: 'center',
    },
    input: {
      backgroundColor: colors.background,
      borderRadius: 10,
      paddingVertical: 14,
      paddingHorizontal: 12,
      fontSize: 16,
      color: colors.textPrimary,
      borderWidth: 1,
      borderColor: colors.border,
    },
    buttonsContainer: {
      flexDirection: 'row',
      gap: 10,
      marginTop: 20,
    },
    button: {
      flex: 1,
      paddingVertical: 14,
      borderRadius: 10,
      alignItems: 'center',
    },
    buttonCancel: {
      backgroundColor: colors.background,
      borderWidth: 1,
      borderColor: colors.border,
    },
    buttonCancelText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.textSecondary,
    },
    buttonSave: {},
    buttonSaveText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#FFFFFF',
    },
  });
