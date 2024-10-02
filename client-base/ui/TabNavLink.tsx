import React from 'react';
import { Text } from 'src/client-base/ui';
import { twm } from 'src/client-base/utils/twm';
import { Link, useLocation } from 'react-router-dom';

type Props = {
  to: string;
  children: React.ReactNode;
  className?: string;
};

export const TabNavLink = ({ to, children, className }: Props) => {
  const { pathname } = useLocation();
  const isActive = pathname.includes(to);

  return (
    <Link
      to={to}
      className={twm(
        'rounded-xl rounded-br-none rounded-bl-none',
        isActive ? 'text-brand-primary bg-general-dark' : 'bg-general-light/5',
        className,
      )}
    >
      <Text className={twm('font-medium capitalize py-2 pb-2 flex px-6')} font="secondary" size="sm">
        {children}
      </Text>
    </Link>
  );
};
