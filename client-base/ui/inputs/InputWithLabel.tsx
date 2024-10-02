import React, { useState, forwardRef } from 'react';
import { Text } from 'src/client-base/ui';
import { twm } from 'src/client-base/utils/twm';
import ShowIcon from 'src/assets/images/svg/show-icon.svg?react';
import HideIcon from 'src/assets/images/svg/hide-icon.svg?react';

interface InputWithLabelProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  inputClassName?: string;
  labelClassName?: string;
  error?: string;
}

/**
 *Component inherits all basic input props + label, inputClassName, labelClassName, error props
 */
export const InputWithLabel = forwardRef<HTMLInputElement, InputWithLabelProps>(
  ({ className, error, label, type, id, inputClassName, labelClassName, ...props }, ref) => {
    const [inputType, setInputType] = useState(type);

    const togglePasswordVisibility = () => {
      setInputType((prevType) => (prevType === 'password' ? 'text' : 'password'));
    };

    return (
      <div className={twm(className)}>
        <label htmlFor={id} className={twm('text-sm text-brand-primary font-secondary leading-[14px]', labelClassName)}>
          {label}
        </label>
        <div className="flex items-center relative mt-2.5">
          <div className="w-full absolute left-0 top-0 h-[2px] bg-input-border-r-gr"></div>
          <input
            id={id}
            type={inputType}
            autoComplete="off"
            ref={ref}
            className={twm(
              'w-full h-10 rounded-[6px] bg-form-input-primary outline-none pl-5 pr-3.5 shadow-inputDrop border-0 ',
              inputClassName,
            )}
            {...props}
          />
          {type === 'password' && (
            <button type="button" onClick={togglePasswordVisibility} className="absolute w-4 h-4 right-3">
              {inputType === 'password' ? (
                <ShowIcon className="w-full h-full" color="hsla(var(--brand-primary), 0.4)" />
              ) : (
                <HideIcon className="w-full h-full" color="hsla(var(--brand-primary), 0.4)" />
              )}
            </button>
          )}
        </div>
        {error && (
          <Text className="text-general-label text-sm mt-3 whitespace-pre" font="secondary">
            {error}
          </Text>
        )}
      </div>
    );
  },
);
