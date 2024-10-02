import React from 'react';
import { VariantProps, tv } from 'tailwind-variants';
import { twmConfig } from 'src/client-base/utils/twmConfig';

const TextClassNames = tv(
  {
    variants: {
      size: {
        // all available texts
        xxs: 'text-xxs tracking-1', // 10px
        xs: 'text-xs', // 12px
        '2xs': 'text-2xs', // 13px
        sm: 'text-sm', // 14px
        '2sm': 'text-2sm', // 15px
        base: 'text-base', // 16px
        '2base': 'text-3sm', // 17px
        lg: 'text-lg', // 18px
        xl: 'text-xl', // 20px
        '2xl': 'text-2xl', // 26px
        '3xl': 'text-3xl', // 30px
        '4xl': 'text-4xl', // 33px

        // can be extended for specific elements, ex:
        button: 'text-xs font-medium',
        nav: 'text-sm font-blod',
      },
      spacing: {
        '-2': '-tracking-[0.02em]',
        '0': 'tracking-normal',
        '1': 'tracking-[0.01em]',
        '2': 'tracking-[0.02em]',
        '4': 'tracking-[0.04em]',
        '10': 'tracking-[0.1em]',
      },
      font: {
        primary: 'font-primary',
        secondary: 'font-secondary',
      },
    },
    defaultVariants: {
      size: 'base',
      font: 'primary',
      spacing: '0',
    },
  },
  {
    twMergeConfig: twmConfig,
  },
);

export type TextVariants = VariantProps<typeof TextClassNames>;

export type Props = React.HTMLAttributes<HTMLHeadingElement> & {
  tag?: React.ElementType;
  size?: TextVariants['size'];
  font?: TextVariants['font'];
  spacing?: TextVariants['spacing'];
};

export const Text = ({
  children,
  className: classNameProps,
  size,
  font,
  spacing,
  tag: Tag = 'span',
  ...rest
}: Props) => {
  const className = TextClassNames({
    size,
    font,
    spacing,
    className: classNameProps,
  });
  return (
    <Tag className={className} {...rest}>
      {children}
    </Tag>
  );
};
