import { PropsWithChildren } from 'react';
import { twm } from 'src/client-base/utils/twm';

type RoundedBoxProps = PropsWithChildren & { className?: string; withTopLine?: boolean };

export const RoundedBox = ({ children, className, withTopLine = true }: RoundedBoxProps) => (
  <div className={twm('relative p-[18px] rounded-lg-2 bg-general-dark shadow-table', className)}>
    {withTopLine && <div className="w-full absolute left-0 top-0 h-[2px] bg-input-border-r-gr"></div>}
    {children}
  </div>
);
