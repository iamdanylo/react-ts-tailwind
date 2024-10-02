import React, { forwardRef, useCallback } from 'react';
import { twm } from 'src/client-base/utils/twm';

export interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputClassName?: string;
  onChangeHandler?: (value: string) => void;
  onEnterPress?: () => void;
  value?: string;
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  hasTopGradient?: boolean;
}

export const TextInput = forwardRef<HTMLInputElement, IInputProps>(function TextInputComponent(
  { onChangeHandler, onEnterPress, Icon, className, value, inputClassName, hasTopGradient = true, ...props },
  ref,
) {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeHandler?.(e.target.value);
  };

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        onEnterPress?.();
      }
    },
    [onEnterPress],
  );

  return (
    <div className={twm('relative w-full flex items-center rounded-lg bg-general-dark py-3.5 px-3.5', className)}>
      {hasTopGradient && <div className="w-full absolute left-0 top-0 h-[2px] bg-input-border-r-gr"></div>}
      {!!Icon && (
        <div className="flex items-center justify-center w-[15px] h-[15px] mr-3 self-center">
          <Icon className="w-full h-auto [&>path]:stroke-general-light" />
        </div>
      )}
      <input
        ref={ref}
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={value}
        type="text"
        placeholder={props.placeholder || 'Enter Symbol or Command'}
        className={twm(
          'flex flex-1 bg-transparent border-none font-primary text-xs text-general-light focus:outline-none focus:border-none',
          inputClassName,
        )}
        {...props}
      />
    </div>
  );
});
