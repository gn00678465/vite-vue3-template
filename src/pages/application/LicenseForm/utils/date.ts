import { endOfDay } from 'date-fns';
import { zonedTimeToUtc, format } from 'date-fns-tz';

export function dateToUtcString(value: number): string {
  return format(
    endOfDay(zonedTimeToUtc(new Date(value), 'Asia/Taipei')),
    "yyyy-MM-dd'T'HH:mm:ssXXX",
    { timeZone: 'Asia/Taipei' }
  );
}

export function dateToUTCTime(date: string | null): number | null {
  if (!date) return null;
  return new Date(date).valueOf();
}
