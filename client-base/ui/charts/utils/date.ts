import { Time, TickMarkType } from 'lightweight-charts';

export function formatDateToTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

export function formatDateToTimeWithSeconds(date: Date): string {
  const time = formatDateToTime(date);
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${time}:${seconds}`;
}

export function formatDateToDayOfMonth(date: Date): string {
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: '2-digit' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

export function formatDateToMonth(date: Date): string {
  const options: Intl.DateTimeFormatOptions = { month: 'short' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

export function formatDateToYear(date: Date): string {
  return `${date.getFullYear()}`;
}

export function tickMarkTypeTransformer(time: Time, tickMarkType: TickMarkType) {
  const date = new Date((time as number) * 1000);
  // TODO: need to update all date format variants. Requires design
  switch (tickMarkType) {
    case TickMarkType.Time:
      return formatDateToTime(date);
    case TickMarkType.TimeWithSeconds:
      return formatDateToTimeWithSeconds(date);
    case TickMarkType.DayOfMonth:
      return formatDateToDayOfMonth(date);
    case TickMarkType.Month:
      return formatDateToMonth(date);
    case TickMarkType.Year:
      return formatDateToYear(date);
    default:
      return null;
  }
}
