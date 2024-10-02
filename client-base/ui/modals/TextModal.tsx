import { useCallback } from 'react';
import { BaseModal } from 'src/client-base/ui/BaseModal';
import { Text } from 'src/client-base/ui';
import { twm } from 'src/client-base/utils/twm';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  text: string;
  className?: string;
  closeOnClickOutside?: boolean;
};

/**
 *   BASIC USAGE:
 *
 *   const [isModalOpen, setIsModalOpen] = useState(false);
 *
 *   const handleModalClose = () => {
 *     setIsModalOpen(false);
 *   }
 *
 *   const handleModalOpen = () => {
 *     setIsModalOpen(true);
 *   }
 *
 * */
export const TextModal = ({ isOpen, onClose, title, text, className, closeOnClickOutside = true }: Props) => {
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <BaseModal
      wrapperClassName={twm('max-w-[558px] z-50', className)}
      isOpen={isOpen}
      onClose={handleClose}
      closeOnClickOutside={closeOnClickOutside}
    >
      <div className="flex flex-col max-w-[95%]">
        <Text size="2sm" spacing="4" font="secondary" className="text-general-label mb-4 uppercase font-medium">
          {title}
        </Text>
        <Text size="2sm" spacing="4" font="secondary" className="text-general-light font-normal">
          {text}
        </Text>
      </div>
    </BaseModal>
  );
};
