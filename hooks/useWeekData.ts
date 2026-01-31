import { useSmokingStore } from '@/stores/useSmokingStore';
import { useMemo } from 'react';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;

export type WeekDayData = {
  key: string;
  day: string;
  date: number;
  smoked: number;
  limit: number;
  isToday: boolean;
  isDisabled: boolean;
};

function getMonday(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function formatLocalDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function useWeekData(): WeekDayData[] {
  const dailyLogs = useSmokingStore((state) => state.dailyLogs);
  const getLimitForDate = useSmokingStore((state) => state.getLimitForDate);
  const profile = useSmokingStore((state) => state.profile);

  return useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayKey = formatLocalDate(today);

    const startDate = profile?.startDate ? new Date(profile.startDate) : null;
    if (startDate) {
      startDate.setHours(0, 0, 0, 0);
    }

    const monday = getMonday(today);

    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      d.setHours(0, 0, 0, 0);

      const key = formatLocalDate(d);
      const log = dailyLogs[key];

      const isBeforeStart = startDate ? d < startDate : false;
      const isAfterToday = d > today;
      const isDisabled = isBeforeStart || isAfterToday;

      return {
        key,
        day: WEEKDAYS[i],
        date: d.getDate(),
        smoked: log?.cigarettesSmoked ?? 0,
        limit: getLimitForDate(key),
        isToday: key === todayKey,
        isDisabled,
      };
    });
  }, [dailyLogs, getLimitForDate, profile?.startDate]);
}
