import React, { forwardRef } from 'react';
import { twm } from 'src/client-base/utils/twm';

export interface IInputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  onChangeHandler: (value: string) => void;
  value: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, IInputProps>(function TextAreaComponent(
  { onChangeHandler, className, value, ...props },
  ref,
) {
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChangeHandler(e.target.value);
  };

  return (
    <div className={twm('w-full flex rounded-lg', className)}>
      <textarea
        ref={ref}
        className={twm(
          'w-full rounded-[6px] bg-form-input-primary outline-none py-4 pl-5 pr-3.5 shadow-inputDrop border-0 border-t [border-image-source:radial-gradient(47.17%_54.98%_at_50%_0%,rgba(255,255,255,0.3)_0%,rgba(255,255,255,0)_100%)] min-h-[88px] resize-none',
        )}
        onChange={onChange}
        value={value}
        placeholder={props.placeholder || ''}
        {...props}
      />
    </div>
  );
});
