import React, { FC, PropsWithChildren, useEffect, useRef } from 'react';
import { twm } from 'src/client-base/utils/twm';
import CrossIcon from 'src/assets/images/svg/cross-icon.svg?react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
  closeOnClickOutside?: boolean;
}

export const BaseModal: FC<PropsWithChildren<ModalProps>> = ({
  isOpen,
  onClose,
  children,
  className,
  wrapperClassName,
  closeOnClickOutside,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  // There can be a issue with outside click when you're using this modal with select inside because dropdown menu is out of modal elements three
  const handleOverlayClick = (event: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={closeOnClickOutside ? handleOverlayClick : undefined}
      className={twm('fixed inset-0 bg-general-dark/[.8] flex items-center justify-center z-50', className)}
    >
      <div
        ref={modalRef}
        className={twm(
          'flex flex-col rounded-2.5xl bg-background-secondary px-5 pb-4 w-full max-w-96',
          wrapperClassName,
        )}
      >
        <div className="flex w-full justify-end py-2">
          <div onClick={onClose} className="flex cursor-pointer w-6 h-6 justify-center items-center">
            {/* TODO what color to use for white theme? */}
            <CrossIcon className="h-3 w-3 [&>path]:fill-neutral" />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};
