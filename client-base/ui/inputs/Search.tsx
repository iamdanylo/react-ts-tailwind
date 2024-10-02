import { TextInput } from 'src/client-base/ui/inputs/TextInput';
import SearchIcon from 'src/assets/images/svg/search-icon.svg?react';
import { twm } from 'src/client-base/utils/twm';

type Props = {
  className?: string;
  value: string;
  onChange: (value: string) => void;
};

export const SearchInput = ({ className, value, onChange }: Props) => {
  return (
    <TextInput
      Icon={SearchIconWrap}
      value={value}
      onChangeHandler={onChange}
      placeholder="Search"
      className={twm('px-2 w-60 py-[7px] bg-form-input-secondary rounded-md', className)}
      inputClassName="placeholder:font-secondary text-xs"
    />
  );
};

const SearchIconWrap = () => {
  return <SearchIcon />;
};
