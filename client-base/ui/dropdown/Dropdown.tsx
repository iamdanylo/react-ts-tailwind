import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from 'src/client-base/ui';
import { twm } from 'src/client-base/utils/twm';
import Chevron from 'src/assets/images/svg/chevron.svg?react';
import { PropsWithChildren, useState } from 'react';

export type DropdownAlign = 'center' | 'end' | 'start';

interface Props extends PropsWithChildren {
  /**
   *Component that is displayed inside of trigger div alongside arrow icon
   */
  button: JSX.Element;
  /**
   *Classname for button prop and chevron icon wrapper
   */
  buttonWrapperClassName?: string;
  /**
   *Classname chevron icon(arrow icon)
   */
  chevronClassName?: string;
  /**
   *Classname for dropdown elements wrapper
   */
  contentClassName?: string;
  menuAlign?: DropdownAlign;
  isFullWidthMenu?: boolean;
}

/**
 *Basic dropdown menu. When using storybook to test visual appearance, open component directly instead of using docs page
 */
export function Dropdown({
  button,
  children,
  buttonWrapperClassName,
  chevronClassName,
  contentClassName,
  menuAlign,
  isFullWidthMenu,
}: Props) {
  const [opened, setOpened] = useState(false);

  return (
    <DropdownMenu modal={false} onOpenChange={setOpened}>
      <DropdownMenuTrigger asChild>
        <div className={twm('relative cursor-pointer', buttonWrapperClassName)}>
          {button}
          <Chevron
            className={twm(
              'absolute top-1/2 transform -translate-y-1/2 right-0 transition-all duration-150 rotate-180 [&>path]:stroke-general-light',
              opened && 'rotate-0',
              chevronClassName,
            )}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent isFullWidth={isFullWidthMenu} className={contentClassName} align={menuAlign || 'end'}>
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
