import { FC, PropsWithChildren } from 'react';
import { twm } from 'src/client-base/utils/twm';

export const Page: FC<PropsWithChildren & { className?: string }> = ({ children, className }) => (
  <div className={twm('pt-[46px] pb-[42px] h-full', className)}>{children}</div>
);
