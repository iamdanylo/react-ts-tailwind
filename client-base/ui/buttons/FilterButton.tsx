import { FC } from 'react';
import { twm } from 'src/client-base/utils/twm';
import { Text } from 'src/client-base/ui/Text';

type TableFilterButtonProps = {
  className?: string;
  onClick: () => void;
  title: string;
  isActive: boolean;
};

export const FilterButton: FC<TableFilterButtonProps> = ({ className, onClick, title, isActive }) => {
  return (
    <Text
      tag={'div'}
      size="xs"
      onClick={onClick}
      className={twm(
        'h-auto cursor-pointer px-3 pt-4 border-t border-t-table-divider text-general-light font-medium',
        isActive && 'text-brand-primary border-t-brand-primary',
        className,
      )}
    >
      {title}
    </Text>
  );
};
