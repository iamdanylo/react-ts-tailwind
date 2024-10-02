import { FC } from 'react';
import { twm } from 'src/client-base/utils/twm';
import IconChat from 'src/assets/images/svg/chat-icon.svg?react';

type ChatIconProps = {
  className?: string;
  hasBadge?: boolean;
};

export const ChatIcon: FC<ChatIconProps> = ({ className, hasBadge }) => {
  return (
    <div className={twm('relative flex h-5 w-5 items-center justify-center', className)}>
      {hasBadge && (
        <div className="w-2 h-2 border-[1.5px] border-general-dark rounded-full bg-notification-info absolute top-0 -right-0.5"></div>
      )}
      <IconChat />
    </div>
  );
};
