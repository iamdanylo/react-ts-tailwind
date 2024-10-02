import { useCallback, useState } from 'react';
import { ErrorText, Text } from 'src/client-base/ui';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from 'src/client-base/ui/Command';
import { Popover, PopoverContent, PopoverTrigger } from 'src/client-base/ui/Popover';
import { twm } from 'src/client-base/utils/twm';
import SearchIcon from 'src/assets/images/svg/search-icon.svg?react';

type Props<T> = {
  onInputChange: (value: string) => void;
  inputValue: string;
  selected: T | T[];
  options: T[];
  onSelect: (value: T) => void;
  getOptionLabel: (option: T) => string;
  getOptionValue: (option: T) => string;
  getDropdownOptionLabel?: (option: T) => string;
  isMultiple: boolean;
  onDeselect?: (value: T) => void;
  className?: string;
  isFullWidthMenu?: boolean;
  error?: string;
  placeholder?: string;
  selectionLimit?: number;
  listTitle?: string;
};

export function AutocompleteSelect<T>({
  className,
  onSelect,
  onDeselect,
  error,
  selected,
  options,
  placeholder,
  onInputChange,
  inputValue,
  isFullWidthMenu = true,
  getOptionLabel,
  getOptionValue,
  isMultiple = false,
  selectionLimit,
  getDropdownOptionLabel,
  listTitle,
}: Props<T>) {
  const [open, setOpen] = useState(false);

  const onSelectHandler = useCallback(
    (currentValue: T) => {
      if (isMultiple) {
        const selectedArray = selected as T[];
        const isSelected = selectedArray.some((item) => getOptionValue(item) === getOptionValue(currentValue));

        if (isSelected) {
          onDeselect?.(currentValue);
        } else {
          if (selectionLimit && selectedArray?.length >= selectionLimit) {
            return;
          }
          onSelect(currentValue);
        }
      } else {
        const isSelected = getOptionValue(selected as T) === getOptionValue(currentValue);

        if (isSelected) {
          onDeselect?.(currentValue);
        } else {
          onSelect(currentValue);
        }
        setOpen(false);
      }
    },
    [selected, onDeselect, onSelect, getOptionValue, isMultiple, selectionLimit],
  );

  return (
    <div className={twm('relative w-full', className)}>
      <Popover modal={false} open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="w-full">
          <div
            role="combobox"
            aria-expanded={open}
            className="flex items-center px-3 w-full h-10 justify-start bg-form-input-primary rounded-md"
          >
            <SearchIcon className="mr-3" />
            <div className="flex overflow-x-auto space-x-2 h-full items-center custom-scrollbar">
              {isMultiple ? (
                <div className="flex items-center space-x-2 h-full">
                  {(selected as T[])?.length > 0 ? (
                    (selected as T[]).map((item) => (
                      <div
                        key={getOptionValue(item)}
                        className="flex items-center px-2 py-0.5 rounded-[4px] border border-general-light/50"
                      >
                        <Text size="xs" className="text-general-light/80">
                          {getOptionLabel(item)}
                        </Text>
                        <div
                          className="text-xs ml-2 text-general-light cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeselect?.(item);
                          }}
                        >
                          ✕
                        </div>
                      </div>
                    ))
                  ) : (
                    <Text size="xs" className="text-general-light/80">
                      {placeholder || 'Select items...'}
                    </Text>
                  )}
                </div>
              ) : (
                <Text size="xs" font="secondary">
                  {selected ? getOptionLabel(selected as T) : placeholder || 'Select items...'}
                </Text>
              )}
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent isFullWidth={isFullWidthMenu} className="w-full p-0">
          <Command shouldFilter={false}>
            <CommandInput value={inputValue} onValueChange={onInputChange} placeholder="Search ..." className="h-9" />
            {listTitle && (
              <Text className="text-general-light/60 font-normal ml-2" size="xxs" font="secondary">
                {listTitle}
              </Text>
            )}
            <CommandGroup>
              {options?.length > 0 ? (
                options.map((opt) => (
                  <CommandItem
                    key={getOptionValue(opt)}
                    value={getOptionLabel(opt)}
                    onSelect={() => onSelectHandler(opt)}
                  >
                    {getOptionLabel(opt)}{' '}
                    {getDropdownOptionLabel && (
                      <Text className="text-general-light/60 font-normal ml-2" size="xxs" font="secondary">
                        {getDropdownOptionLabel(opt)}
                      </Text>
                    )}
                  </CommandItem>
                ))
              ) : (
                <CommandEmpty>No items found.</CommandEmpty>
              )}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      {error && <ErrorText className="mb-0">{error}</ErrorText>}
    </div>
  );
}
