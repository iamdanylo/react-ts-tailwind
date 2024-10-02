import React, { FC } from 'react';
import { twm } from 'src/client-base/utils/twm';
import { Text } from 'src/client-base/ui/Text';

interface FlatButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  title: string;
  className?: string;
  titleClassName?: string;
  disabled?: boolean;
}

export const FlatButton: FC<FlatButtonProps> = ({
  className,
  titleClassName,
  onClick,
  disabled = false,
  title,
  ...rest
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type="button"
      {...rest}
      className={twm(
        'group flex justify-center items-center w-auto transition-all duration-300 rounded-md px-4 py-2 disabled:border-general-light/30',
        className,
      )}
    >
      <Text size={'button'} className={twm(titleClassName, disabled && 'text-general-light/30')}>
        {title}
      </Text>
    </button>
  );
};
