import React from 'react';
import { twm } from 'src/client-base/utils/twm';
import { Text } from 'src/client-base/ui/Text';
import BackArrow from 'src/assets/images/svg/back-arrow.svg?react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  title?: string;
  className?: string;
  titleClassName?: string;
  disabled?: boolean;
}

export const BackButton = ({ className, titleClassName, onClick, disabled = false, title, ...rest }: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type="button"
      {...rest}
      className={twm(
        'group flex justify-center items-center w-auto rounded-md px-2 py-2 disabled:border-general-light/30',
        className,
      )}
    >
      <BackArrow className="mr-2" />
      <Text size="sm" className={twm('text-general-light', titleClassName)} font="secondary">
        {title || 'Back'}
      </Text>
    </button>
  );
};
