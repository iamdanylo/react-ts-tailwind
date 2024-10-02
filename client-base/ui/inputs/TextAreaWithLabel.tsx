import React, { forwardRef } from 'react';
import { Text } from 'src/client-base/ui';
import { twm } from 'src/client-base/utils/twm';

interface TextAreaWithLabelProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  textAreaClassName?: string;
  labelClassName?: string;
  error?: string;
}

export const TextAreaWithLabel = forwardRef<HTMLTextAreaElement, TextAreaWithLabelProps>(
  ({ className, error, label, id, textAreaClassName, labelClassName, ...props }, ref) => (
    <div className={twm(className)}>
      <label className={twm('text-sm text-brand-primary font-secondary leading-[14px]', labelClassName)}>{label}</label>
      <div className="flex relative mt-2.5">
        <div className="w-full absolute left-0 top-0 h-[2px] bg-input-border-r-gr"></div>
        <textarea
          id={id}
          ref={ref}
          className={twm(
            'w-full rounded-[6px] bg-form-input-primary outline-none py-4 pl-5 pr-3.5 shadow-inputDrop min-h-[88px] resize-none',
            error ? 'border-red-500' : 'border-gray-300',
            textAreaClassName,
          )}
          {...props}
        />
      </div>
      {error && (
        <Text className="text-general-label text-sm mt-3" font="secondary">
          {error}
        </Text>
      )}
    </div>
  ),
);
