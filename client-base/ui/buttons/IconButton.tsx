import React, { FC } from 'react';
import { twm } from 'src/client-base/utils/twm';
import { Text } from 'src/client-base/ui/Text';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  title: string;
  className?: string;
  titleClassName?: string;
  disabled?: boolean;
  Icon?: FC;
  hasTopBorder?: boolean;
}

export const IconButton: FC<IconButtonProps> = (
  { className, titleClassName, onClick, disabled = false, title, Icon, hasTopBorder },
  props,
) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type="button"
      className={twm(
        'group relative flex justify-center items-center w-auto transition-all duration-300 rounded-md px-[13px] py-3 bg-general-dark',
        className,
      )}
      {...props}
    >
      {hasTopBorder && <div className="w-full absolute left-0 top-0 h-[2px] bg-input-border-r-gr z-10"></div>}
      {!!Icon && (
        <div className="flex items-center justify-center w-5 h-5 mr-2.5">
          <Icon />
        </div>
      )}
      <Text size="2xs" className={twm(titleClassName)}>
        {title}
      </Text>
    </button>
  );
};
