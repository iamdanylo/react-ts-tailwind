import { Text } from 'src/client-base/ui';
import { twm } from 'src/client-base/utils/twm';

type Props = {
  symbol: string;
  className?: string;
};

export const SymbolBadge = ({ symbol, className }: Props) => (
  <div className={twm('flex items-center justify-center border border-general-light/50 p-1 rounded-lg', className)}>
    <div className="flex py-[7px] px-4.5 rounded-md bg-badge-bg-gr">
      <Text size="lg" font="secondary" spacing="4" className="text-general-light font-medium leading-5 uppercase">
        {symbol}
      </Text>
    </div>
  </div>
);
