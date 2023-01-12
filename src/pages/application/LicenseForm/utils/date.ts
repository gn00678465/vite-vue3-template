import { endOfDay } from 'date-fns';
import { format } from 'date-fns-tz';
import { toUTCDate } from '@/utils';

export function endOfUTCString(value: number): string {
  return format(endOfDay(toUTCDate(value)), "yyyy-MM-dd'T'HH:mm:ssXXX", {
    timeZone: 'Asia/Taipei'
  });
}

export function dateToUTCTime(date: string | null): number | null {
  if (!date) return null;
  return new Date(date).valueOf();
}
