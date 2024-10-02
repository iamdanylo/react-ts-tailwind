import { FC, PropsWithChildren } from 'react';
import { twm } from 'src/client-base/utils/twm';

type Props = {
  className?: string;
};

export const Container: FC<PropsWithChildren<Props>> = ({ children, className }) => (
  <div className={twm('flex flex-col px-7', className)}>{children}</div>
);
