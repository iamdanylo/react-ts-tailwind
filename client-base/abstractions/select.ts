export type SelectProps<T> = {
  onSelect: (symbol: T) => void;
  onDeselect: (symbol: T) => void;
};

export type Option<T> = {
  label: string;
  value: T;
};
