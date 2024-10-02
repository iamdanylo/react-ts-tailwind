import { twm } from 'src/client-base/utils/twm';
import { Text } from 'src/client-base/ui/Text';

type TagProps = {
  title: string;
  className?: string;
};

export const Tag = ({ className, title }: TagProps) => (
  <div className={twm('relative flex py-1 px-2 rounded bg-tag-bg', className)}>
    <Text className="font-medium text-general-label uppercase" size="xxs">
      {title}
    </Text>
  </div>
);
