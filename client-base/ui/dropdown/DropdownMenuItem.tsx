import { PropsWithChildren, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { Text } from 'src/client-base/ui';
import { DropdownMenuItem as DropdownMenuItemBase } from './DropdownBase';
import { twm } from 'src/client-base/utils/twm';

interface Props extends PropsWithChildren {
  title: string;
  className?: string;
  textClassName?: string;
  url?: string;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
}

const DropdownMenuComponent = ({ title, children, className, textClassName, onClick }: Omit<Props, 'url'>) => {
  return (
    <DropdownMenuItemBase onClick={onClick} className={twm('justify-between mb-[3px]', className)}>
      <Text size="xs" font="secondary" className={twm('text-general-light', textClassName)}>
        {title}
      </Text>
      {children}
    </DropdownMenuItemBase>
  );
};

export const DropdownMenuItem = ({ title, url, children, className, textClassName, onClick }: Props) =>
  url ? (
    <Link to={url}>
      <DropdownMenuComponent
        title={title}
        className={className}
        textClassName={textClassName}
        children={children}
        onClick={onClick}
      />
    </Link>
  ) : (
    <DropdownMenuComponent
      title={title}
      className={className}
      textClassName={textClassName}
      children={children}
      onClick={onClick}
    />
  );
