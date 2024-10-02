import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { twm } from 'src/client-base/utils/twm';

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & {
    isFullWidth?: boolean;
  }
>(({ className, align = 'start', sideOffset = 4, isFullWidth = true, asChild = true, ...props }, ref) => (
  <PopoverPrimitive.Content
    style={isFullWidth ? { width: 'var(--radix-popper-anchor-width)' } : undefined} // https://github.com/radix-ui/primitives/discussions/2102
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={twm(
      'z-50 w-full p-4 text-general-light bg-form-button-bg rounded-sm overflow-hidden',
      'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
      'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
      'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className,
    )}
    {...props}
  />
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };
