import { VariantProps, tv } from 'tailwind-variants';
import { twmConfig } from 'src/client-base/utils/twmConfig';
import { twm } from 'src/client-base/utils/twm';
import PriceArrowIcon from 'src/assets/images/svg/price-arrow.svg?react';

const IconClassNames = tv(
  {
    variants: {
      iconSize: {
        sm: 'w-2 h-2.5',
        lg: '',
      },
    },
    defaultVariants: {
      iconSize: 'sm',
    },
  },
  {
    twMergeConfig: twmConfig,
  },
);

const ArrowClassNames = tv(
  {
    variants: {
      size: {
        sm: 'p-1 rounded',
        lg: 'p-1.5 rounded-md',
      },
    },
    defaultVariants: {
      size: 'sm',
    },
  },
  {
    twMergeConfig: twmConfig,
  },
);

type ArrowVariants = VariantProps<typeof ArrowClassNames>;
type IconVariants = VariantProps<typeof IconClassNames>;

export type Props = {
  isPositiveDirection: boolean;
  className?: string;
  size?: ArrowVariants['size'];
  iconSize?: IconVariants['iconSize'];
};

export const PriceArrow = ({ className: classNameProps, size, isPositiveDirection, iconSize }: Props) => {
  const className = ArrowClassNames({ size, className: classNameProps });
  const iconClassName = IconClassNames({ iconSize });

  return (
    <div
      className={twm(
        'relative flex justify-center items-center bg-transparent',
        isPositiveDirection && 'bg-[#28D57826]',
        // TODO solve inconsistency in design (if this correct that this component in white theme with bg, and without in black)
        !isPositiveDirection && 'bg-[#D5472826]',
        className,
      )}
    >
      <PriceArrowIcon
        className={twm('transition-all duration-200', !isPositiveDirection && 'rotate-180', iconClassName)}
        color={isPositiveDirection ? '#28D578' : '#FF5000'}
      />
    </div>
  );
};
