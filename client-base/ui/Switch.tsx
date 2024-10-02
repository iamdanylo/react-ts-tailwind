import { FC, MouseEvent } from 'react';
import { twm } from 'src/client-base/utils/twm';
import { Text } from 'src/client-base/ui';

type SwitchProps = {
  height?: number;
  className?: string;
  switchClassName?: string;
  onChange?: (value: boolean, e: MouseEvent<HTMLDivElement>) => void;
  enabled: boolean;
  hasOnOffLabel?: boolean;
};

export const Switch: FC<SwitchProps> = ({
  height = 24,
  className,
  switchClassName,
  onChange,
  enabled,
  hasOnOffLabel,
}) => {
  const handleSwitchToggle = (e: MouseEvent<HTMLDivElement>) => {
    if (onChange) {
      onChange(!enabled, e);
    }
  };

  const thumbSize = (height * 20) / 24;
  const thumbTop = (height * 2) / 24;
  const thumbLeft = thumbTop;

  return (
    <div className={twm('flex items-center justify-center', className)}>
      {hasOnOffLabel && (
        <Text size="sm" className="text-general-light mr-4">
          Off
        </Text>
      )}
      <div
        onClick={handleSwitchToggle}
        style={{
          height,
          width: height * 2,
        }}
        className={twm(
          `relative rounded-full cursor-pointer`,
          enabled ? 'bg-brand-primary' : 'bg-background-disabled',
          switchClassName,
        )}
      >
        <div
          style={{
            top: thumbTop,
            left: thumbLeft,
            height: thumbSize,
            width: thumbSize,
            transform: `translateX(${enabled ? height : 0}px)`,
          }}
          className="absolute rounded-full transition-all duration-300 bg-background-primary"
        />
      </div>
      {hasOnOffLabel && (
        <Text size="sm" className="text-general-light ml-4">
          On
        </Text>
      )}
    </div>
  );
};
