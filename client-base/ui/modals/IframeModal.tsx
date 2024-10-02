import { useCallback, useEffect, useRef } from 'react';
import { Text } from 'src/client-base/ui';
import { BaseModal } from 'src/client-base/ui/BaseModal';
import { twm } from 'src/client-base/utils/twm';
import { useTheme, Theme } from 'src/client-base/theme/Theme';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  html: string;
  className?: string;
  closeOnClickOutside?: boolean;
};

export const IframeModal = ({ isOpen, onClose, className, html, title, closeOnClickOutside = true }: Props) => {
  const { theme } = useTheme();
  const isDarkTheme = theme === Theme.DARK;
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const styleContent = `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');
      body, p, ul, li, span, td {
        color: ${isDarkTheme ? 'white' : 'black'} !important;
        font-family: 'Inter', sans-serif !important;
        font-size: 14px;
      }
      a {
        color: #6CAFF5;
      }
      ::-webkit-scrollbar {
        width: 7px;
      }
      ::-webkit-scrollbar-thumb {
        background-color: ${isDarkTheme ? '#3c3c3c' : '#efeae4'};
        border-radius: 6px;
      }
      ::-webkit-scrollbar-track {
        background: transparent;
      }
    </style>
  `;

  const combinedHtml = `
    ${html}
    ${styleContent}
  `;

  useEffect(() => {
    const iframe = iframeRef.current;
    const iframeDoc = iframe?.contentDocument || iframe?.contentWindow?.document;

    if (iframeDoc) {
      let sanitizedHtml = combinedHtml;
      // removing <title /> or <title/>
      sanitizedHtml = sanitizedHtml.replace(/<title\s*\/?>/g, '');

      iframeDoc.open();
      iframeDoc.write(sanitizedHtml);
      iframeDoc.close();
    }
  }, [combinedHtml]);

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
        {title && (
          <Text size="2sm" spacing="4" font="secondary" className="text-general-label mb-4 font-medium">
            {title}
          </Text>
        )}
        <iframe
          ref={iframeRef}
          title="HTML Content"
          className="custom-scrollbar"
          style={{
            width: '100%',
            height: '500px',
          }}
        ></iframe>
      </div>
    </BaseModal>
  );
};
