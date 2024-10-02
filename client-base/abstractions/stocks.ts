import { SelectProps } from './select';
import { Symbols } from 'src/shared/types/symbols';

export type StockSymbolProps = {
  symbol: Symbols;
};

export type StocksSelectProps = { selected: any } & SelectProps<Symbols>;
