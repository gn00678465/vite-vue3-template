import { format } from 'date-fns';
import { zonedTimeToUtc, utcToZonedTime, formatInTimeZone } from 'date-fns-tz';
import { TST_TIME_ZONE, UTC_FORMAT, LOCAL_FORMAT } from '@/config/date';

export interface Options {
  timeZone: string;
}

export interface FormatOptions extends Options {
  formatStr: string;
}

/**
 * 將本地時間轉為 UTC 時間
 * @param date 本地時間
 * @param options { timeZone } 帶入時區
 * @returns Date Object
 */
export function toUTCDate(
  date: number | string | Date,
  options: Partial<Options> = {}
): Date {
  const { timeZone = TST_TIME_ZONE } = options;
  return zonedTimeToUtc(date, timeZone);
}

/**
 * 將本地時間轉為 UTC 時間(字串)
 * @param date
 * @param options { timeZone, formatStr } 帶入時區 & 格式化字串
 * @returns yyyy-MM-ddTHH:mm:ss+08:00
 */
export function toUTCString(
  date: number | string | Date,
  options: Partial<FormatOptions> = {}
): string {
  const { timeZone = TST_TIME_ZONE, formatStr = UTC_FORMAT } = options;
  return formatInTimeZone(date, timeZone, formatStr);
}

/**
 * 將 UTC 時間轉為本地時間
 * @param date UTC 時間
 * @param options { timeZone } 帶入時區
 * @returns Date Object
 */
export function toLocalDate(
  date: number | string | Date,
  options: Partial<Options> = {}
): Date {
  const { timeZone = TST_TIME_ZONE } = options;
  return utcToZonedTime(date, timeZone);
}

/**
 * 將 UTC 時間轉為本地時間(字串)
 * @param date UTC 時間
 * @param options { timeZone, formatStr } 帶入時區 & 格式化字串
 * @returns yyyy-MM-dd HH:mm:ss
 */
export function toLocalString(
  date: number | string | Date,
  options: Partial<FormatOptions> = {}
) {
  const { timeZone = TST_TIME_ZONE, formatStr = LOCAL_FORMAT } = options;
  return format(toLocalDate(date, { timeZone }), formatStr);
}
