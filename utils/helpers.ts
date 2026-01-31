import { MOTIVATION_TEXTS } from '@/constants/motivationTexts';

type FormattedTime = {
  days: number;
  hours: number;
  minutes: number;
};

export const formatAmount = (value: string): string => {
  if (!value) return '';

  const normalized = value.replace(',', '.');

  const number = parseFloat(normalized);

  if (isNaN(number)) return '';

  return number.toFixed(2);
};

export const getTodayKey = () => {
  return new Date().toISOString().split('T')[0];
};

export const getYesterdayKey = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

export const formatMinutesToTime = (totalMinutes: number): FormattedTime => {
  const days = Math.floor(totalMinutes / (24 * 60));
  const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
  const minutes = totalMinutes % 60;

  return { days, hours, minutes };
};

export const getDailyMotivationText = (): string => {
  const dayOfMonth = new Date().getDate();
  const index = dayOfMonth % MOTIVATION_TEXTS.length;

  return MOTIVATION_TEXTS[index];
};

export function formatLocalDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatDateFromTimestamp(timestamp: number): string {
  return formatLocalDate(new Date(timestamp));
}
