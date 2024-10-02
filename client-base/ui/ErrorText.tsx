import { PropsWithChildren } from 'react';
import { Text } from 'src/client-base/ui';
import { twm } from 'src/client-base/utils/twm';

interface Props extends PropsWithChildren {
  className?: string;
}

export function ErrorText({ children, className }: Props) {
  return (
    <Text className={twm('text-general-label text-sm inline-block mb-3', className)} font="secondary">
      {children}
    </Text>
  );
}
