import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useColorScheme } from 'react-native';

export type ColorScheme = {
  background: string;
  surface: string;

  textPrimary: string;
  textSecondary: string;
  textMuted: string;

  border: string;

  primary: string;
  primaryMuted: string;
  primary10: string;

  gold: string;
  warning: string;
  warning10: string;

  statusBarStyle: 'light-content' | 'dark-content';
};

export const lightColors: ColorScheme = {
  background: '#F8FAFC',
  surface: '#FFFFFF',

  textPrimary: '#0F172A',
  textSecondary: '#475569',
  textMuted: '#94A3B8',

  border: '#E2E8F0',

  primary: '#2EC4B6',
  primaryMuted: '#1AA79A',
  primary10: 'rgba(46, 196, 181, 0.1)',

  gold: '#ffd60a',
  warning: '#FFC72C',
  warning10: 'rgba(255, 199, 44, 0.1)',

  statusBarStyle: 'light-content' as const,
};

export const darkColors: ColorScheme = {
  background: '#0F172A',
  surface: '#1E293B',

  textPrimary: '#F8FAFC',
  textSecondary: '#CBD5E1',
  textMuted: '#94A3B8',

  border: '#334155',

  primary: '#2EC4B6',
  primaryMuted: '#1AA79A',
  primary10: 'rgba(46, 196, 181, 0.1)',
  gold: '#ffd60a',
  warning: '#FFC72C',
  warning10: 'rgba(255, 199, 44, 0.1)',

  statusBarStyle: 'dark-content' as const,
};

export type ThemeMode = 'light' | 'dark' | 'system';

type ThemeContextType = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  colors: ColorScheme;
  isDark: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = '@app_theme_mode';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>('system');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedMode = await AsyncStorage.getItem(THEME_STORAGE_KEY);

      if (savedMode && ['light', 'dark', 'system'].includes(savedMode)) {
        setModeState(savedMode as ThemeMode);
      }
    } catch (error) {
      console.log('Theme loading error', error);
    } finally {
      setIsReady(true);
    }
  };

  const setMode = async (newMode: ThemeMode) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newMode);
      setModeState(newMode);
    } catch (error) {
      console.log('Theme saving error', error);
    }
  };

  // Ustal aktualny motyw
  const activeTheme = mode === 'system' ? systemColorScheme || 'light' : mode;
  const isDark = activeTheme === 'dark';
  const colors = isDark ? darkColors : lightColors;

  if (!isReady) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ mode, setMode, colors, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme musi być użyty wewnątrz ThemeProvider');
  }
  return context;
};
