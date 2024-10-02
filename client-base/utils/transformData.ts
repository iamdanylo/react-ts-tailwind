import { format } from 'date-fns';

export const transformData = (date: string | Date | undefined, formatString: string = 'dd/MM/yyyy') => {
  if (!date) return date;
  return format(date, formatString);
};
