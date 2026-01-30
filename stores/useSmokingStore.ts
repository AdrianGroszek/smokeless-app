import { getTodayKey } from '@/utils/helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type UserProfile = {
  username: string;
  cigarettesPerDay: number;
  cigarettesPerPack: number;
  packPrice: number;
  currency: string;
  planDuration: 14 | 21 | 30;
  startDate: string;
};

type DailyData = {
  date: string;
  cigarettesSmoked: number;
  smokingTimes: string[];
};

type SmokingStore = {
  profile: UserProfile | null;
  dailyLogs: Record<string, DailyData>;
  onboardingCompleted: boolean;
  currentStreak: number;
  longestStreak: number;

  completeOnboarding: () => void;
  setProfile: (profile: UserProfile) => void;
  ensureTodayExists: () => void;
  recalculateStreaks: () => void;

  addCigarette: () => void;
  removeCigarette: () => void;
  resetApp: () => void;

  getLimitForDate: (date: string) => number;
  getCurrentDay: () => number;
  getTodayLimit: () => number;
  getCigarettesLeftToday: () => number;
};

const DAY_MS = 86400000;

const getDayKey = (date: Date) => date.toISOString().split('T')[0];

// ===== STORE =====
export const useSmokingStore = create<SmokingStore>()(
  persist(
    (set, get) => ({
      // Początkowy stan
      profile: null,
      dailyLogs: {},
      onboardingCompleted: false,
      currentStreak: 0,
      longestStreak: 0,

      setProfile: (profile) => set({ profile }),

      completeOnboarding: () => set({ onboardingCompleted: true }),

      ensureTodayExists: () => {
        const todayKey = getTodayKey();
        const logs = get().dailyLogs;

        if (logs[todayKey]) return;

        set({
          dailyLogs: {
            ...logs,
            [todayKey]: {
              date: todayKey,
              cigarettesSmoked: 0,
              smokingTimes: [],
            },
          },
        });
      },

      recalculateStreaks: () => {
        const { dailyLogs, profile } = get();
        if (!profile) return;

        let streak = 0;
        let cursor = new Date();

        while (true) {
          const key = getDayKey(cursor);
          const log = dailyLogs[key];
          if (!log) break;

          const limit = get().getLimitForDate(key);
          if (log.cigarettesSmoked > limit) break;

          streak++;
          cursor = new Date(cursor.getTime() - DAY_MS);
        }

        set((state) => ({
          currentStreak: streak,
          longestStreak: Math.max(state.longestStreak, streak),
        }));
      },

      addCigarette: () => {
        const today = new Date().toISOString().split('T')[0];
        const now = new Date().toISOString();

        set((state) => {
          const log = state.dailyLogs[today] ?? {
            date: today,
            cigarettesSmoked: 0,
            smokingTimes: [],
          };

          return {
            dailyLogs: {
              ...state.dailyLogs,
              [today]: {
                ...log,
                cigarettesSmoked: log.cigarettesSmoked + 1,
                smokingTimes: [...log.smokingTimes, now],
              },
            },
          };
        });

        get().recalculateStreaks();
      },

      removeCigarette: () => {
        const today = new Date().toISOString().split('T')[0];

        set((state) => {
          const log = state.dailyLogs[today];
          if (!log || log.smokingTimes.length === 0) return {};

          const updatedTimes = log.smokingTimes.slice(0, -1);

          return {
            dailyLogs: {
              ...state.dailyLogs,
              [today]: {
                ...log,
                cigarettesSmoked: updatedTimes.length,
                smokingTimes: updatedTimes,
              },
            },
          };
        });

        get().recalculateStreaks();
      },

      resetApp: () => {
        set({
          profile: null,
          dailyLogs: {},
          onboardingCompleted: false,
        });
      },

      getCurrentDay: () => {
        const profile = get().profile;
        if (!profile) return 0;

        const start = new Date(profile.startDate);
        const today = new Date();

        return Math.min(
          Math.floor((today.getTime() - start.getTime()) / 86400000) + 1,
          profile.planDuration,
        );
      },

      getLimitForDate: (date) => {
        const profile = get().profile;
        if (!profile) return 0;

        const start = new Date(profile.startDate);
        const current = new Date(date);

        const dayNumber =
          Math.floor((current.getTime() - start.getTime()) / 86400000) + 1;

        const reduction = Math.floor(
          profile.cigarettesPerDay / profile.planDuration,
        );

        return Math.max(
          profile.cigarettesPerDay - reduction * (dayNumber - 1),
          0,
        );
      },

      getTodayLimit: () => {
        const today = new Date().toISOString().split('T')[0];
        return get().getLimitForDate(today);
      },

      getCigarettesLeftToday: () => {
        const today = new Date().toISOString().split('T')[0];
        const smoked = get().dailyLogs[today]?.cigarettesSmoked ?? 0;

        return Math.max(get().getTodayLimit() - smoked, 0);
      },
    }),
    {
      name: '@smoking_full_data',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        profile: state.profile,
        onboardingCompleted: state.onboardingCompleted,
        dailyLogs: state.dailyLogs,
        currentStreak: state.currentStreak,
        longestStreak: state.longestStreak,
      }),
    },
  ),
);
