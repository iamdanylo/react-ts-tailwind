import { useCallback } from 'react';
import { BaseModal } from 'src/client-base/ui/BaseModal';
import { FlatButton, Text } from 'src/client-base/ui';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  onConfirm: () => void;
  onReject?: () => void;
};

/**
 * To review visuals open component directly
 * */
export const ConfirmModal = ({ isOpen, onClose, onConfirm, onReject, title }: Props) => {
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <BaseModal wrapperClassName="z-50 max-w-80" isOpen={isOpen} onClose={handleClose} closeOnClickOutside={false}>
      <div className="flex flex-col items-center">
        <Text className="text-center text-brand-primary mt-5 mb-10">{title || 'Are you sure?'}</Text>
        <div className="flex gap-x-5 w-full">
          <FlatButton
            className="w-full border border-brand-primary"
            titleClassName="text-brand-primary"
            onClick={onConfirm}
            title="Confirm"
          />
          <FlatButton
            className="w-full border border-general-light/50"
            titleClassName="text-general-light/50"
            onClick={onReject}
            title="Cancel"
          />
        </div>
      </div>
    </BaseModal>
  );
};
