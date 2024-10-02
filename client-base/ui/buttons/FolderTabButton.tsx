import { FC } from 'react';
import { twm } from 'src/client-base/utils/twm';
import { Text } from 'src/client-base/ui/Text';

type FolderTabButtonProps = {
  className?: string;
  onClick: () => void;
  title: string;
  isActive: boolean;
};

export const FolderTabButton: FC<FolderTabButtonProps> = ({ className, onClick, title, isActive }) => {
  return (
    <div
      onClick={onClick}
      className={twm(
        'block cursor-pointer bg-general-light/[0.05] border rounded-t-[10px] border-transparent py-2 px-6',
        className,
        isActive && 'bg-general-dark border-general-dark',
      )}
    >
      <div className="flex flex-col items-center">
        <Text size="sm" font="secondary" className={twm('font-medium', isActive && 'text-brand-primary')}>
          {title}
        </Text>
      </div>
    </div>
  );
};
