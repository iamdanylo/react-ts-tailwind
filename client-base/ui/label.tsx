import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { twm } from 'src/client-base/utils/twm';
import { VariantProps, tv } from 'tailwind-variants';

const labelVariants = tv({});

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={twm(labelVariants(), className)} {...props} />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
