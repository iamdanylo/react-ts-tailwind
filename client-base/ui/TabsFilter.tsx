import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { FilterButton } from 'src/client-base/ui/buttons';

interface TabsFilterProps<T> {
  filters: T[];
  onChange?: (filter: T) => void;
  keyExtractor?: (filter: T) => string;
  titleExtractor?: (filter: T) => string;
  filterBtnClassName?: string;
}

function defaultKeyExtractor(v: unknown) {
  return v as string;
}
function defaultTitleExtractor(v: unknown) {
  return v as string;
}

// TODO defaultKeyExtractor and defaultTitleExtractor required when T is not a string
export function TabsFilter<T>({
  filters,
  onChange,
  keyExtractor = defaultKeyExtractor,
  titleExtractor = defaultTitleExtractor,
  filterBtnClassName,
}: PropsWithChildren<TabsFilterProps<T>>) {
  const [selected, setSelected] = useState(filters?.[0]);

  if (filters?.length && !filters.includes(selected)) {
    setSelected(filters[0]);
  }

  const onFilterClick = useCallback((v: T) => {
    setSelected(v);
  }, []);

  useEffect(() => {
    onChange?.(selected);
  }, [onChange, selected]);

  return (
    <div className="flex gap-1.5">
      {filters.map((filter) => {
        const isActive = filter === selected;

        return (
          <FilterButton
            className={filterBtnClassName}
            key={keyExtractor(filter)}
            title={titleExtractor(filter)}
            isActive={isActive}
            onClick={() => onFilterClick(filter)}
          />
        );
      })}
    </div>
  );
}
