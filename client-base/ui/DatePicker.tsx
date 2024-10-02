import { format, endOfDay } from 'date-fns';
import { useCallback } from 'react';
import CalendarIcon from 'src/assets/images/svg/calendar-icon.svg?react';

import { Calendar, CalendarProps, DateRange } from './Calendar';
import { Popover, PopoverContent, PopoverTrigger } from './Popover';
import { twm } from '../utils/twm';
import { Text } from './Text';

export type { DateRange };

type BaseProps = {
  useStyleOutline?: boolean;
  className?: string;
};

type Props = BaseProps &
  (
    | {
        type: 'single';
        value: Date | undefined;
        onChange: (value: Date | undefined) => void;
      }
    | {
        type: 'range';
        value: DateRange | undefined;
        onChange: (value: DateRange | undefined) => void;
      }
  );

export function DatePicker({ value, onChange, useStyleOutline, className, type }: Props) {
  const renderButtonContent = () => {
    switch (type) {
      case 'single': {
        return value ? format(value, 'PPP') : 'Pick a date';
      }

      case 'range': {
        const f = (v: Date | undefined) => (v ? format(v, 'LLL dd, y') : undefined);
        return value && value.from && value.to ? `${f(value.from)} - ${f(value.to)}` : 'Pick a date range';
      }

      default: {
        return 'Pick a value';
      }
    }
  };

  const _onChange = useCallback(
    (v: Date | DateRange | undefined) => {
      if (type === 'single') {
        onChange(v as Date);
      } else {
        const vv = v as DateRange | undefined;
        if (vv?.to) {
          vv.to = endOfDay(vv.to);
        }
        onChange(vv);
      }
    },
    [type, onChange],
  );

  const calendarProps = (
    type === 'single'
      ? {
          mode: 'single',
          selected: value,
          onSelect: _onChange,
          initialFocus: true,
        }
      : {
          mode: 'range',
          selected: value,
          onSelect: _onChange,
          initialFocus: true,
          defaultMonth: value?.from || undefined,
          numberOfMonths: 2,
        }
  ) satisfies CalendarProps;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={twm(
            'min-w-[200px] flex flex-row items-center text-left bg-form-button-bg rounded-md',
            useStyleOutline && 'outline outline-1 outline-graph-border-primary',
            !value && 'text-muted-foreground',
            className,
          )}
        >
          <div className="grow flex justify-center items-center">
            <Text font="secondary" size="xs" className="font-medium leading-3 py-2 px-3">
              {renderButtonContent()}
            </Text>
          </div>
          <div
            className={twm(
              'ml-auto p-2 bg-form-input-secondary rounded-r-md z-10',
              useStyleOutline && 'outline outline-1 outline-white/20',
            )}
          >
            <CalendarIcon className="h-4 w-4" />
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent isFullWidth={false} className="w-auto p-0">
        <Calendar {...calendarProps} />
      </PopoverContent>
    </Popover>
  );
}
