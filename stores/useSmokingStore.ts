import { ACHIEVEMENTS } from '@/constants/achievements';
import { getTodayKey, getYesterdayKey } from '@/utils/helpers';
import Ionicons from '@expo/vector-icons/Ionicons';
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

export type DailyData = {
  date: string;
  cigarettesSmoked: number;
  smokingTimes: string[];
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  iconName: keyof typeof Ionicons.glyphMap | any;
  unlocked: boolean;
  unlockedAt?: number;
};

type SmokingStore = {
  profile: UserProfile | null;
  dailyLogs: Record<string, DailyData>;
  onboardingCompleted: boolean;
  currentStreak: number;
  longestStreak: number;
  achievements: Record<string, Achievement>;

  completeOnboarding: () => void;
  setProfile: (profile: UserProfile) => void;
  ensureTodayExists: () => void;
  recalculateStreaks: () => void;
  unlockAchievement: (id: string) => void;
  checkAchievements: () => void;

  addCigarette: () => void;
  removeCigarette: () => void;
  resetApp: () => void;

  getLimitForDate: (date: string) => number;
  getCurrentDay: () => number;
  getTodayLimit: () => number;
  getCigarettesLeftToday: () => number;
  getTotalMoneySaved: () => number;
  getTotalCigarettesSaved: () => number;
  getTotalTimeSaved: () => number;
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
      achievements: Object.values(ACHIEVEMENTS).reduce(
        (acc, a) => {
          acc[a.id] = {
            ...a,
            unlocked: false,
          };
          return acc;
        },
        {} as Record<string, Achievement>,
      ),

      setProfile: (profile) => set({ profile }),

      completeOnboarding: () => {
        set({ onboardingCompleted: true });
        get().unlockAchievement('plan_started');
      },

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

        get().checkAchievements();
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

      unlockAchievement: (id) => {
        set((state) => {
          const achievement = state.achievements[id];
          if (!achievement || achievement.unlocked) return state;

          return {
            ...state,
            achievements: {
              ...state.achievements,
              [id]: {
                ...achievement,
                unlocked: true,
                unlockedAt: Date.now(),
              },
            },
          };
        });
      },

      checkAchievements: () => {
        const {
          currentStreak,
          unlockAchievement,
          profile,
          dailyLogs,
          getTotalMoneySaved,
        } = get();

        if (currentStreak >= 3) unlockAchievement('streak_3');
        if (currentStreak >= 7) unlockAchievement('streak_7');
        if (currentStreak >= 14) unlockAchievement('streak_14');
        if (currentStreak >= 30) unlockAchievement('streak_30');

        if (profile && profile.cigarettesPerDay <= 5) {
          unlockAchievement('under_control');
        }

        const yesterdayKey = getYesterdayKey();
        const yesterdayLog = dailyLogs[yesterdayKey];
        const totalMoneySaved = getTotalMoneySaved();

        if (yesterdayLog?.cigarettesSmoked === 0)
          unlockAchievement('perfect_day');

        if (yesterdayLog && yesterdayLog.cigarettesSmoked === 0) {
          unlockAchievement('just_in_time');
        }

        if (totalMoneySaved >= 10) unlockAchievement('savings_10');
        if (totalMoneySaved >= 100) unlockAchievement('savings_100');
        if (totalMoneySaved >= 500) unlockAchievement('savings_500');
        if (totalMoneySaved >= 1000) unlockAchievement('savings_1000');
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
        get().checkAchievements();
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
        get().checkAchievements();
      },

      resetApp: () => {
        set({
          profile: null,
          dailyLogs: {},
          onboardingCompleted: false,
          currentStreak: 0,
          longestStreak: 0,
          achievements: Object.values(ACHIEVEMENTS).reduce(
            (acc, a) => {
              acc[a.id] = {
                ...a,
                unlocked: false,
              };
              return acc;
            },
            {} as Record<string, Achievement>,
          ),
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

        const limit = Math.round(
          profile.cigarettesPerDay *
            (1 - (dayNumber - 1) / (profile.planDuration - 1)),
        );

        return Math.max(limit, 0);
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

      getTotalMoneySaved: () => {
        const profile = get().profile;
        if (!profile) return 0;

        const { packPrice, cigarettesPerPack, cigarettesPerDay } = profile;
        const pricePerCigarette = packPrice / cigarettesPerPack;
        const todayDate = getTodayKey();

        let totalSaved = 0;

        Object.entries(get().dailyLogs).forEach(([date, log]) => {
          if (date === todayDate) return;
          const saved = Math.max(cigarettesPerDay - log.cigarettesSmoked, 0);
          totalSaved += saved * pricePerCigarette;
        });

        return totalSaved;
      },

      getTotalCigarettesSaved: () => {
        const profile = get().profile;
        if (!profile) return 0;

        const { cigarettesPerDay } = profile;
        const todayDate = getTodayKey();

        let totalSaved = 0;

        Object.entries(get().dailyLogs).forEach(([date, log]) => {
          if (date === todayDate) return;
          totalSaved += Math.max(cigarettesPerDay - log.cigarettesSmoked, 0);
        });

        return totalSaved;
      },

      getTotalTimeSaved: () => {
        const totalCigarretesSaved = get().getTotalCigarettesSaved();
        const totalMinutesSaved = totalCigarretesSaved * 5;

        return totalMinutesSaved;
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
        achievements: state.achievements,
      }),
    },
  ),
);
