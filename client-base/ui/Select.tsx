import { Option } from 'src/client-base/abstractions/select';
import { DropdownMenuItem, FlatButton, Text } from 'src/client-base/ui';
import { Dropdown, DropdownAlign } from 'src/client-base/ui/dropdown/Dropdown';
import { twm } from 'src/client-base/utils/twm';

interface Props<T> {
  options: Option<T>[];
  className?: string;
  chevronClassName?: string;
  menuAlign?: DropdownAlign;
  value: T;
  onChange?: (value: T) => void;
  placeholder?: string;
  error?: string;
  isFullWidthMenu?: boolean;
}

export const Select = <T extends string | number>({
  options,
  value,
  chevronClassName,
  className,
  menuAlign,
  onChange,
  placeholder,
  error,
  isFullWidthMenu,
}: Props<T>) => {
  const selectedOption = options.find((option) => option.value === value)!;

  return (
    <div className="relative">
      <div className="w-full absolute left-0 top-0 h-[2px] bg-input-border-r-gr z-10"></div>
      <Dropdown
        buttonWrapperClassName="bg-forms-input-secondary"
        chevronClassName={twm('right-2', chevronClassName)}
        menuAlign={menuAlign}
        isFullWidthMenu={isFullWidthMenu}
        button={
          <FlatButton
            className={twm('bg-form-input-secondary border border-general-light/[.1] pr-11', className)}
            titleClassName="font-secondary font-medium leading-[0.875rem]"
            title={selectedOption?.label || (placeholder ?? '')}
          />
        }
      >
        {options.map((option) => (
          <DropdownMenuItem key={option.value} title={option.label} onClick={() => onChange?.(option.value)} />
        ))}
      </Dropdown>
      {error && (
        <Text className="text-general-label text-sm mt-3" font="secondary">
          {error}
        </Text>
      )}
    </div>
  );
};
