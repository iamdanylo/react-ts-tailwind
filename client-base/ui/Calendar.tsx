import * as React from 'react';
import { DayPicker, DateRange } from 'react-day-picker';
import Chevron from 'src/assets/images/svg/chevron.svg?react';

import { twm } from '../utils/twm';

export type { DateRange };

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={twm('p-3 bg-black', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-1 flex items-center',
        nav_button: twm(
          'bg-background hover:bg-brand-deep hover:text-accent-foreground',
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell: 'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
        row: 'flex w-full mt-2',
        cell: twm(
          'h-9 w-9 text-center text-sm p-0 relative focus-within:relative focus-within:z-20',
          '[&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-brand-deep/50 [&:has([aria-selected])]:bg-brand-deep first:[&:has([aria-selected])]:rounded-lw-md last:[&:has([aria-selected])]:rounded-r-md',
        ),
        day: twm(
          'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          'hover:brand-deep hover:text-accent-foreground',
          'h-9 w-9 p-0 font-normal aria-selected:opacity-100',
        ),
        day_range_end: 'day-range-end',
        day_selected: 'bg-brand-primary hover:bg-brand-primary focus:bg-brand-primary',
        day_today: 'bg-brand-deep text-accent-foreground',
        day_outside:
          'day-outside text-muted-foreground opacity-50 aria-selected:bg-brand-deep/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle: 'aria-selected:bg-brand-deep aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: () => <Chevron className="h-4 w-4 -rotate-90" />,
        IconRight: () => <Chevron className="h-4 w-4 rotate-90" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
