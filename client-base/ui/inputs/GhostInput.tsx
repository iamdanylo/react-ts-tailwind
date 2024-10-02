import React, { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';
import { Text } from 'src/client-base/ui';
import { twm } from 'src/client-base/utils/twm';

interface GhostInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError;
}

/**
 *Component inherits all basic input props + error prop. To test visuals open variants directly
 */
export const GhostInput = forwardRef<HTMLInputElement, GhostInputProps>(
  ({ className, error, type, id, ...props }, ref) => (
    <div className={twm(className)}>
      <div className="flex relative">
        <input
          id={id}
          type={type}
          ref={ref}
          className={twm(
            'w-full h-10 bg-transparent outline-none pl-5 pr-3.5 border-b text-brand-primary font-secondary text-sm',
            error ? 'border-b-red-500' : 'border-b-general-light/20',
          )}
          {...props}
        />
      </div>
      {error && (
        <Text className="text-general-label text-sm mt-3" font="secondary">
          {error.message}
        </Text>
      )}
    </div>
  ),
);
