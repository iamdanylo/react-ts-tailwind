import React from 'react';
import { twm } from 'src/client-base/utils/twm';
import { CheckMark } from 'src/client-base/ui/icons/CheckMark';
import { Text } from 'src/client-base/ui';

interface Props {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  labelClassName?: string;
}

export const Checkbox: React.FC<Props> = ({ label, checked, onChange, labelClassName }) => {
  return (
    <label className="flex items-center space-x-2 cursor-pointer" onClick={() => onChange(!checked)}>
      <div
        className={twm(
          'w-4 h-4 rounded-sm flex items-center justify-center bg-form-input-secondary border border-general-light/[.1]',
          checked && 'bg-brand-primary border-brand-primary',
        )}
      >
        {checked && <CheckMark />}
      </div>
      {label && (
        <Text font="secondary" className={twm('text-xs ml-2.5', labelClassName)}>
          {label}
        </Text>
      )}
    </label>
  );
};
