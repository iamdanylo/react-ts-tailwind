import { ControllerRenderProps } from 'react-hook-form';
import { twm } from 'src/client-base/utils/twm';
import { InputWithLabel } from '../inputs';
import { FormControl, FormItem, useFormField } from './index';

type TextFieldProps = {
  field: ControllerRenderProps<any, any>;
  label: string;
  type?: 'input' | 'password' | 'file' | 'number';
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  classes?: Partial<{
    root: string;
    input: string;
  }>;
};

export function TextField({
  field,
  label,
  type = 'input',
  className,
  classes,
  placeholder,
  inputClassName,
}: TextFieldProps) {
  const { error } = useFormField();
  return (
    <FormItem className={classes?.root}>
      <FormControl>
        <InputWithLabel
          label={label}
          error={error?.message || ' '}
          placeholder={placeholder}
          inputClassName={inputClassName}
          className={twm(className, classes?.input)}
          type={type}
          {...field}
        />
      </FormControl>
    </FormItem>
  );
}
