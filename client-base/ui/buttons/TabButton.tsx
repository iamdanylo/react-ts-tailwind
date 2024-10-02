import { twm } from 'src/client-base/utils/twm';
import { Text } from 'src/client-base/ui/Text';

type TabButtonProps = {
  className?: string;
  onClick?: () => void;
  title: string;
  icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  isActive: boolean;
};

export const TabButton = ({ className, onClick, title, isActive, icon: Icon }: TabButtonProps) => {
  return (
    <Text
      tag={'div'}
      size="sm"
      spacing="1"
      onClick={onClick}
      className={twm(
        'h-auto cursor-pointer p-3.5 border-b-[3px] border-b-transparent text-general-light font-medium',
        isActive && 'text-general-light border-b-brand-primary',
        !!Icon && 'flex',
        className,
      )}
    >
      {!!Icon && (
        <div className="flex items-center justify-center w-5 h-5 mr-2.5">
          <Icon />
        </div>
      )}
      {title}
    </Text>
  );
};
