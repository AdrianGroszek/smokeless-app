import { Achievement, DailyData, UserProfile } from '@/stores/useSmokingStore';

export const fakeProfile: UserProfile = {
  username: 'John',
  cigarettesPerDay: 15,
  cigarettesPerPack: 20,
  packPrice: 26.89,
  currency: 'PLN',
  planDuration: 14,
  startDate: '2026-01-20',
};

export const fakeDailyLogs: Record<string, DailyData> = {
  '2026-01-19': {
    date: '2026-01-29',
    cigarettesSmoked: 12,
    smokingTimes: [
      '2026-01-20T07:30:00.000Z',
      '2026-01-20T08:10:00.000Z',
      '2026-01-20T08:55:00.000Z',
      '2026-01-20T09:40:00.000Z',
      '2026-01-20T10:30:00.000Z',
      '2026-01-20T11:15:00.000Z',
      '2026-01-20T12:00:00.000Z',
      '2026-01-20T13:00:00.000Z',
      '2026-01-20T14:10:00.000Z',
      '2026-01-20T15:00:00.000Z',
      '2026-01-20T16:10:00.000Z',
      '2026-01-20T17:20:00.000Z',
    ],
  },
  '2026-01-20': {
    date: '2026-01-20',
    cigarettesSmoked: 15,
    smokingTimes: [
      '2026-01-20T07:30:00.000Z',
      '2026-01-20T08:10:00.000Z',
      '2026-01-20T08:55:00.000Z',
      '2026-01-20T09:40:00.000Z',
      '2026-01-20T10:30:00.000Z',
      '2026-01-20T11:15:00.000Z',
      '2026-01-20T12:00:00.000Z',
      '2026-01-20T13:00:00.000Z',
      '2026-01-20T14:10:00.000Z',
      '2026-01-20T15:00:00.000Z',
      '2026-01-20T16:10:00.000Z',
      '2026-01-20T17:20:00.000Z',
      '2026-01-20T18:30:00.000Z',
      '2026-01-20T19:40:00.000Z',
      '2026-01-20T21:00:00.000Z',
    ],
  },

  '2026-01-21': {
    date: '2026-01-21',
    cigarettesSmoked: 14,
    smokingTimes: [
      '2026-01-20T07:30:00.000Z',
      '2026-01-20T08:10:00.000Z',
      '2026-01-20T08:55:00.000Z',
      '2026-01-20T09:40:00.000Z',
      '2026-01-20T10:30:00.000Z',
      '2026-01-20T11:15:00.000Z',
      '2026-01-20T12:00:00.000Z',
      '2026-01-20T13:00:00.000Z',
      '2026-01-20T15:00:00.000Z',
      '2026-01-20T16:10:00.000Z',
      '2026-01-20T17:20:00.000Z',
      '2026-01-20T18:30:00.000Z',
      '2026-01-20T19:40:00.000Z',
      '2026-01-20T21:00:00.000Z',
    ],
  },

  '2026-01-22': {
    date: '2026-01-22',
    cigarettesSmoked: 12,
    smokingTimes: [
      '2026-01-20T07:30:00.000Z',
      '2026-01-20T08:10:00.000Z',
      '2026-01-20T09:40:00.000Z',
      '2026-01-20T10:30:00.000Z',
      '2026-01-20T12:00:00.000Z',
      '2026-01-20T13:00:00.000Z',
      '2026-01-20T14:10:00.000Z',
      '2026-01-20T15:00:00.000Z',
      '2026-01-20T17:20:00.000Z',
      '2026-01-20T18:30:00.000Z',
      '2026-01-20T19:40:00.000Z',
      '2026-01-20T21:00:00.000Z',
    ],
  },

  '2026-01-23': {
    date: '2026-01-23',
    cigarettesSmoked: 10,
    smokingTimes: [
      '2026-01-20T07:30:00.000Z',
      '2026-01-20T08:10:00.000Z',
      '2026-01-20T09:40:00.000Z',
      '2026-01-20T10:30:00.000Z',
      '2026-01-20T13:00:00.000Z',
      '2026-01-20T14:10:00.000Z',
      '2026-01-20T16:10:00.000Z',
      '2026-01-20T17:20:00.000Z',
      '2026-01-20T18:30:00.000Z',
      '2026-01-20T21:00:00.000Z',
    ],
  },

  '2026-01-24': {
    date: '2026-01-24',
    cigarettesSmoked: 3,
    smokingTimes: [
      '2026-01-20T14:10:00.000Z',
      '2026-01-20T16:10:00.000Z',
      '2026-01-20T17:20:00.000Z',
    ],
  },

  '2026-01-25': {
    date: '2026-01-25',
    cigarettesSmoked: 9,
    smokingTimes: [
      '2026-01-20T07:30:00.000Z',
      '2026-01-20T08:10:00.000Z',
      '2026-01-20T09:40:00.000Z',
      '2026-01-20T12:00:00.000Z',
      '2026-01-20T13:00:00.000Z',
      '2026-01-20T15:00:00.000Z',
      '2026-01-20T18:30:00.000Z',
      '2026-01-20T19:40:00.000Z',
      '2026-01-20T21:00:00.000Z',
    ],
  },

  '2026-01-26': {
    date: '2026-01-26',
    cigarettesSmoked: 12,
    smokingTimes: [
      '2026-01-20T07:30:00.000Z',
      '2026-01-20T08:10:00.000Z',
      '2026-01-20T09:40:00.000Z',
      '2026-01-20T12:00:00.000Z',
      '2026-01-20T15:00:00.000Z',
      '2026-01-20T18:30:00.000Z',
      '2026-01-20T19:40:00.000Z',
      '2026-01-20T21:00:00.000Z',
      '2026-01-20T21:20:00.000Z',
      '2026-01-20T21:25:00.000Z',
      '2026-01-20T22:05:00.000Z',
      '2026-01-20T22:30:00.000Z',
    ],
  },

  '2026-01-27': {
    date: '2026-01-27',
    cigarettesSmoked: 7,
    smokingTimes: [
      '2026-01-20T07:30:00.000Z',
      '2026-01-20T08:10:00.000Z',
      '2026-01-20T09:40:00.000Z',
      '2026-01-20T12:00:00.000Z',
      '2026-01-20T18:30:00.000Z',
      '2026-01-20T19:40:00.000Z',
      '2026-01-20T21:00:00.000Z',
    ],
  },

  '2026-01-28': {
    date: '2026-01-28',
    cigarettesSmoked: 6,
    smokingTimes: [
      '2026-01-20T07:30:00.000Z',
      '2026-01-20T08:10:00.000Z',
      '2026-01-20T09:40:00.000Z',
      '2026-01-20T12:00:00.000Z',
      '2026-01-20T15:00:00.000Z',
      '2026-01-20T21:00:00.000Z',
    ],
  },

  '2026-01-29': {
    date: '2026-01-29',
    cigarettesSmoked: 3,
    smokingTimes: [
      '2026-01-20T07:30:00.000Z',
      '2026-01-20T09:40:00.000Z',
      '2026-01-20T21:00:00.000Z',
    ],
  },

  '2026-01-30': {
    date: '2026-01-30',
    cigarettesSmoked: 4,
    smokingTimes: [
      '2026-01-20T07:30:00.000Z',
      '2026-01-20T08:10:00.000Z',
      '2026-01-20T13:32:00.000Z',
      '2026-01-20T15:00:00.000Z',
    ],
  },

  '2026-01-31': {
    date: '2026-01-31',
    cigarettesSmoked: 3,
    smokingTimes: [
      '2026-01-20T08:10:00.000Z',
      '2026-01-20T09:40:00.000Z',
      '2026-01-20T15:00:00.000Z',
    ],
  },

  '2026-02-01': {
    date: '2026-02-01',
    cigarettesSmoked: 2,
    smokingTimes: ['2026-01-20T09:40:00.000Z', '2026-01-20T15:00:00.000Z'],
  },
  '2026-02-02': {
    date: '2026-02-02',
    cigarettesSmoked: 1,
    smokingTimes: ['2026-01-20T19:45:00.000Z', '2026-01-20T20:32:00.000Z'],
  },
};

export const fakeAchievements: Record<string, Achievement> = {
  plan_started: {
    id: 'plan_started',
    title: 'Plan Started',
    description: 'Completed onboarding',
    iconName: 'rocket-outline',
    unlocked: true,
    unlockedAt: Date.now() - 12 * 86400000,
  },

  streak_3: {
    id: 'streak_3',
    title: 'On a Roll',
    description: '3 days in a row within limit',
    iconName: 'flame-outline',
    unlocked: true,
    unlockedAt: Date.now() - 7 * 86400000,
  },

  streak_7: {
    id: 'streak_7',
    title: 'One Week Strong',
    description: '7 days streak',
    iconName: 'calendar-outline',
    unlocked: true,
    unlockedAt: Date.now() - 2 * 86400000,
  },

  streak_14: {
    id: 'streak_14',
    title: 'Two Weeks',
    description: '14 days streak',
    iconName: 'bonfire-outline',
    unlocked: false,
  },

  streak_30: {
    id: 'streak_30',
    title: 'Unbreakable',
    description: '30 days streak',
    iconName: 'shield-checkmark-outline',
    unlocked: false,
  },

  perfect_day: {
    id: 'perfect_day',
    title: 'Perfect Day',
    description: '0 cigarettes in one day',
    iconName: 'leaf-outline',
    unlocked: true,
    unlockedAt: Date.now() - 1 * 86400000,
  },

  just_in_time: {
    id: 'just_in_time',
    title: 'Just in Time',
    description: 'Exactly at the limit',
    iconName: 'stopwatch-outline',
    unlocked: false,
  },

  clean_week: {
    id: 'clean_week',
    title: 'Clean Week',
    description: '7 days within limit',
    iconName: 'calendar-outline',
    unlocked: false,
  },

  consistency: {
    id: 'consistency',
    title: 'Consistency',
    description: '4 weeks without exceeding',
    iconName: 'repeat-outline',
    unlocked: false,
  },

  cut_in_half: {
    id: 'cut_in_half',
    title: 'Cut in Half',
    description: '50% fewer cigarettes than start',
    iconName: 'trending-down-outline',
    unlocked: true,
    unlockedAt: Date.now() - 3 * 86400000,
  },

  under_control: {
    id: 'under_control',
    title: 'Under Control',
    description: 'Daily limit ≤ 5',
    iconName: 'speedometer-outline',
    unlocked: false,
  },

  savings_10: {
    id: 'savings_10',
    title: 'First Savings',
    description: 'Saved 10 zł',
    iconName: 'cash-outline',
    unlocked: true,
    unlockedAt: Date.now() - 4 * 86400000,
  },

  savings_100: {
    id: 'savings_100',
    title: 'Dinner for Two',
    description: 'Saved 100 zł',
    iconName: 'restaurant-outline',
    unlocked: false,
  },

  savings_500: {
    id: 'savings_500',
    title: 'Weekend Trip',
    description: 'Saved 500 zł',
    iconName: 'airplane-outline',
    unlocked: false,
  },

  savings_1000: {
    id: 'savings_1000',
    title: 'Big Win',
    description: 'Saved 1000 zł',
    iconName: 'trophy-outline',
    unlocked: false,
  },
};
