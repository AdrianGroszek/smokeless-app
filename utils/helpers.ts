export const formatAmount = (value: string): string => {
  if (!value) return '';

  const normalized = value.replace(',', '.');

  const number = parseFloat(normalized);

  if (isNaN(number)) return '';

  return number.toFixed(2);
};
