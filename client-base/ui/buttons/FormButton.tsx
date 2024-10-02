import React, { PropsWithChildren } from 'react';
import { twm } from 'src/client-base/utils/twm';
import { Text } from 'src/client-base/ui/Text';

interface CommonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  onClick?: () => void;
  className?: string;
  titleClassName?: string;
  disabled?: boolean;
}

interface ButtonPropsWithChildren extends CommonProps, PropsWithChildren {
  title?: never;
}

interface ButtonPropsWithTitle extends CommonProps {
  title: string;
  children?: never;
}

export const FormButton = React.forwardRef<HTMLButtonElement, ButtonPropsWithTitle | ButtonPropsWithChildren>(
  ({ className, titleClassName, onClick, disabled = false, title, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        disabled={disabled}
        className={twm(
          'h-12 border-[3px] w-full border-brand-primary rounded-[6px] flex justify-center items-center',
          disabled && 'opacity-50',
          className,
        )}
        {...props}
      >
        {title ? (
          <Text size="sm" spacing="2" className={twm('text-brand-primary font-semibold', titleClassName)}>
            {title}
          </Text>
        ) : (
          children
        )}
      </button>
    );
  },
);
