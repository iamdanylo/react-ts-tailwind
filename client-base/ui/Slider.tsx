import React, { FC, PropsWithChildren } from 'react';
import Slider, { Settings } from 'react-slick';
import { twm } from 'src/client-base/utils/twm';
import SliderArrow from 'src/assets/images/svg/slider-arrow.svg?react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface ISlider extends Settings {
  className?: string;
}

export const CustomSlider: FC<PropsWithChildren<ISlider>> = (props) => {
  const settings: Settings = {
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    nextArrow: <CustomArrow direction="r" />,
    prevArrow: <CustomArrow direction="l" />,
    draggable: false,
    swipe: false,
    infinite: false,
    ...props,
  };

  return (
    <Slider className={twm('px-6', props.className)} {...settings}>
      {props.children}
    </Slider>
  );
};

type ArrowProps = {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  direction: 'r' | 'l';
};

const CustomArrow: FC<ArrowProps> = ({ className, style, onClick, direction }) => {
  return (
    <div
      className={twm(
        'flex justify-center items-center rounded-full w-6 h-6 border border-solid border-general-light/[.2] before:!content-none',
        className,
        direction === 'r' && '-right-[40px]',
        direction === 'l' && '-left-[40px]',
      )}
      style={{ ...style, display: 'flex' }}
      onClick={onClick}
    >
      <SliderArrow className={twm('', direction === 'r' && 'rotate-180')} />
    </div>
  );
};
