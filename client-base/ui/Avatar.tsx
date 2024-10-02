import { FC } from 'react';
import { twm } from 'src/client-base/utils/twm';

type AvatarProps = {
  className?: string;
  imgUri?: string;
};

export const Avatar: FC<AvatarProps> = ({ className, imgUri }) => {
  return (
    <div className={twm('flex h-9 w-9 rounded-lg-2 overflow-hidden bg-placeholder-bg', className)}>
      {imgUri && <img className="w-full h-auto object-cover" src={imgUri} alt="avatar" />}
    </div>
  );
};
