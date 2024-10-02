import { ComponentProps, useCallback } from 'react';
import { DayPicker, SelectSingleEventHandler } from 'react-day-picker';
import Chevron from 'src/assets/images/svg/chevron.svg?react';
import { twm } from 'src/client-base/utils/twm';
import { Text } from 'src/client-base/ui';

export type CalendarProps = ComponentProps<typeof DayPicker> & {
  onChange: (d: Date) => void;
  selected: Date;
  indicatedDates?: Date[];
};

export function SingleDayPicker({
  onChange,
  selected,
  indicatedDates,
  className,
  classNames,
  showOutsideDays = true,
  mode = 'single',
  ...props
}: CalendarProps) {
  const _onChange: SelectSingleEventHandler = useCallback(
    (day) => {
      if (day) {
        onChange(day);
      }
    },
    [onChange],
  );

  return (
    <DayPicker
      mode={mode}
      selected={selected}
      // @ts-ignore
      onSelect={_onChange}
      showOutsideDays={showOutsideDays}
      className={twm('bg-background-primary', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-between pt-1 relative items-center text-general-light',
        caption_label: 'text-sm font-medium flex justify-center items-center',
        nav: 'flex items-center',
        nav_button: twm('bg-transparent hover:bg-general-light/5 rounded', 'h-7 w-7 p-0 opacity-70 hover:opacity-100'),
        nav_button_previous: 'flex items-center justify-center',
        nav_button_next: 'flex items-center justify-center',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell: 'w-full font-normal text-xxs uppercase text-general-light/60 mb-2',
        row: 'flex w-full',
        cell: twm('text-center p-2 text-xxs relative focus-within:relative focus-within:z-20 mr-[9px]'),
        day: twm(
          'inline-flex items-center justify-center whitespace-nowrap rounded-full text-xxs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          'hover:bg-general-light/20 hover:text-general-light',
          'h-7 w-7 p-0 font-normal aria-selected:bg-brand-primary',
        ),
        day_today: 'text-general-label',
        day_outside:
          'day-outside text-general-light opacity-50 aria-selected:bg-general-light/20 aria-selected:text-muted-foreground aria-selected:opacity-30',
        day_disabled: 'text-general-light opacity-50',
        day_hidden: 'invisible',
        ...classNames,
      }}
      formatters={{
        formatCaption: (date) => (
          <div className="flex items-baseline">
            <Text size="3xl" font="secondary" className="font-medium text-general-light mr-1">
              {date.toLocaleDateString('en-US', { month: 'short' })}
            </Text>
            <Text size="3xl" font="secondary" className="font-light text-brand-primary">
              {date.getFullYear()}
            </Text>
          </div>
        ),
      }}
      modifiers={{ hasIndicator: indicatedDates || [] }}
      components={{
        IconLeft: () => <Chevron className="h-7 w-7 -rotate-90 text-general-light" />,
        IconRight: () => <Chevron className="h-7 w-7 rotate-90 text-general-light" />,
        DayContent: ({ date, activeModifiers }) => (
          <div className="relative">
            <span>{date.getDate()}</span>
            {activeModifiers.hasIndicator && (
              <div className="flex items-center justify-center absolute -bottom-2 left-1/2 transform -translate-x-1/2 border-[2px] border-general-dark rounded-full">
                <div className="w-1 h-1 bg-general-label rounded-full"></div>
              </div>
            )}
          </div>
        ),
      }}
      {...props}
    />
  );
}
