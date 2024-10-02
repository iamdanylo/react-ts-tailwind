import React, { useMemo } from 'react';
import SearchIcon from 'src/assets/images/svg/search-icon.svg?react';
import { twm } from 'src/client-base/utils/twm';
import { TextInput } from 'src/client-base/ui/inputs';
import { Checkbox } from 'src/client-base/ui/Checkbox';
import { Option, SelectProps } from 'src/client-base/abstractions/select';
import { differenceWith, isEqual } from 'lodash';

type SearchInputSelectProps<T> = SelectProps<T> & {
  options: Option<T>[];
  selected: Option<T>[];
  className?: string;
  inputValue: string;
  onInputChage: (value: string) => void;
  inputPlaceholder?: string;
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
};

export const SearchInputSelect = <T,>({
  className,
  selected = [],
  onDeselect,
  onSelect,
  options = [],
  onInputChage,
  inputValue,
  inputPlaceholder,
  Icon,
}: SearchInputSelectProps<T>) => {
  const others = useMemo(() => {
    if (!options) return [];
    return differenceWith(options, selected, isEqual);
  }, [options, selected]);

  const all = useMemo<ListItemProps[]>(() => {
    return [
      ...selected.map((s) => ({
        symbol: s.label,
        isSelected: true,
        toggle: () => onDeselect(s.value),
      })),
      ...others.map((s) => ({
        symbol: s.label,
        isSelected: false,
        toggle: () => onSelect(s.value),
      })),
    ];
  }, [selected, others, onDeselect, onSelect]);

  const IconWrap = () => {
    const Comp = Icon || SearchIcon;
    return <Comp color="hsla(var(--brand-primary))" />;
  };

  return (
    <div className={twm('w-full h-full rounded border border-graph-border-primary flex flex-col', className)}>
      <TextInput
        Icon={IconWrap}
        value={inputValue}
        onChangeHandler={onInputChage}
        placeholder={inputPlaceholder || 'Search and add symbol'}
        className="bg-transparent border-b border-b-graph-border-primary rounded-none"
        inputClassName="placeholder:text-brand-primary font-secondary text-xs"
      />
      <div className="grow overflow-y-auto">
        {all.map((item, index) => (
          <ListItem key={`${item.symbol}-${index}`} {...item} isLast={index === all.length - 1} />
        ))}
      </div>
    </div>
  );
};

type ListItemProps = {
  symbol: string;
  isSelected: boolean;
  toggle: () => void;
  isLast?: boolean;
};

const ListItem = ({ symbol, isLast, isSelected, toggle }: ListItemProps) => {
  return (
    <div
      className={twm(
        'px-3 py-2.5 flex flex-row items-center gap-2 cursor-pointer',
        !isLast && 'border-b border-graph-border-primary',
      )}
    >
      <Checkbox
        labelClassName="text-sm text-brand-primary font-primary font-medium"
        label={symbol}
        checked={isSelected}
        onChange={toggle}
      />
    </div>
  );
};
